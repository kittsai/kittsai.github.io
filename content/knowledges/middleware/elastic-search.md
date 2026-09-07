---
title: ElasticSearch
category: 中间件
description: ES 核心概念、倒排索引、数据写入与检索流程、深分页解决方案。
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 5
---



## ES介绍

ES是一个建立在Apache Lucene之上的分布式、Restful风格的搜索和数据分析引擎。

## 基本概念

**集群（Cluster）**：由多台服务器组成，共同存储全部数据，对外提供统一入口。

**节点（Node）**：集群中的一台服务器就是一个Node，一个Node对应一个ES实例。
- 主节点（Master）：管理集群范围的操作，如创建、删除索引、分配分片。只做轻量级元数据管理。
- 数据节点（Data）：存储数据，执行数据相关的CRUD、搜索、聚合。
- 协调节点（Coordinating）：转发请求，合并结果。每个节点默认都是协调节点，但可专门分离出来。
- 预处理节点（Ingest）：在写入前对文档做简单处理，如重命名字段、删除字段等。

**索引（Index）**：一类文档的集合，类似关系型数据库里的数据库。

**文档（Document）**：一条记录，用JSON表示，是最基本的信息单元。

**字段（Field）**：记录里的key，比如：name、title。

**分片（Shard）**：一个索引可以水平分割为多个分片，分布在不同的节点上。分片又分为主分片和从分片。

**副本（Replica）**：每个分片可以有一个或多个副本，用于容灾和提高查询性能。

## 倒排索引

基本思想：从文档找词 转变为 从词找文档。倒排索引建立的是 词项 到 文档ID 的映射。
- 逻辑层面：ES发起搜索请求时，面对的是一个倒排索引。
- 物理层面：每个倒排索引实际存储在多个Segment中，每个Segment都是一个独立的、自包含的小型倒排索引，拥有自己的词典、文档列表和评分数据。

示例：
```text
正排索引：
Doc1 → [ "elasticserch", "is", "fast" ]
Doc2 → [ "fast", "search", "with", "elasticserch" ]

倒排索引：
"elasticserch" → { Doc1, Doc2 }
"fast"         → { Doc1, Doc2 }
"search"       → { Doc2 }
"is"           → { Doc1 }
"with"         → { Doc2 }
```

假设要搜索"fast"这个词项，倒排索引必须回答两个问题：
1. "fast"这个词是否存在？
2. 如果存在，它在哪些文档的那些位置？

这恰好对应Lucene倒排索引的三个组成：
- Term Index：词项索引
- Term Dictionary：词项词典
- Posting List：倒排列表

| 组件                  | 存储位置 | 数据结构         | 核心作用             | 特点             |
| ------------------- | ---- | ------------ | ---------------- | -------------- |
| **Term Index**      | 堆内存  | FST          | 快速定位到词典中的词项位置    | 极度压缩，支持前缀/模糊查询 |
| **Term Dictionary** | 磁盘   | 排序词项列表 + FST | 全量词项的唯一集合，指向倒排列表 | 所有词项永久存储       |
| **Posting List**    | 磁盘   | 差值压缩+位图      | 存储词项出现的文档、频率、位置  | 支持快速合并与评分计算    |

查询路径：从Term Index快速定位到Term Dictionary中的词项，再通过指针拿到Posting List。

### Term Dictionary

Term Dictionary，词项词典，是全量词项的有序集合。它将索引中的所有文档的所有词项，经排序后形成唯一词项列表。

每个词项条目包含：
- 词项文本
- 指向该词项Posting List的文件偏移指针
- 文档频率

### Term Index

Term Index，词项索引，是词典的目录与内存核心。词典存储在磁盘上，直接二分查找会产生大量随机IO。所以需要一种极小内存占用的结构，快速定位词典中某个前缀的位置。

实现方式：FST（Finite State Transducer），本质是共享前缀+共享后缀的有向无环图，可将所有词项压缩成极小的内存结构。

![ES-FST结构图](/images/ES-FST结构图.png)

Term Index常驻堆内存，是整个倒排索引查询速度的基石。它让Lucene在万亿级别词项规模下仍能极速定位。

### Posting List

Posting List，倒排列表，是词到文档的映射，并承载评分信息。

每个词项的Posting List包含：
- 文档ID列表：有序，用差值编码，例如：`[102, 105, 109, 150]` → `[102, 3, 4, 41]`
- 词频TF：每个文档中该词出现的次数
- 位置信息Positions：词在文档内的位置
- 偏移量Offsets：词的起止字符位置
- Payloads：用户自定义的负载信息

### 倒排索引检索流程

以搜索 "elasticsearch fast" 为例（分析后为两个词项）：
1. **Term Index 查找**
    对每个词项，用 FST 在内存中查找，迅速返回其在 Term Dictionary 中的位置。
2. **Term Dictionary 定位**
    根据 FST 返回的偏移，从磁盘的词典文件中读取词项条目，获取 Posting List 的文件指针。
3. **读取 Posting List**
    从磁盘读取相应压缩块到内存，解码出文档 ID 列表、词频、位置等。
4. **多词合并与评分**
    根据查询逻辑（AND/OR），对两个词项的文档列表求交集或并集，利用词频、文档长度等计算 BM25 得分。
5. **返回结果**
    按得分排序，取 Top-N 文档 ID，再通过 Fetch Phase 加载完整文档返回。

详细流程：

| 步骤                | 位置              | 操作                 | 用到 Posting List 的哪些信息       |
| ----------------- | --------------- | ------------------ | --------------------------- |
| 1. 词项定位           | 内存 FST → 磁盘词典   | 找到词项的 Posting List | 文档频率（DF）用于 IDF              |
| 2. 读取文档列表         | 磁盘 Posting List | 解码出文档 ID 列表（差值编码）  | 有序文档 ID 列表、词频 TF            |
| 3. 计算评分           | 分片本地            | 对每个文档计算 BM25       | TF、文档长度（dl）、平均长度（avgdl）、IDF |
| 4. 排序取 Top-N      | 分片本地            | 选出本地前 N 个文档 ID+分数  | 仅需 ID 和分数                   |
| 5. Query Phase 合并 | 协调节点            | 合并各分片结果，全局 Top-N   |                             |
| 6. Fetch Phase    | 协调 → 数据节点       | 根据 ID 列表获取完整文档     | 不再需要 Posting List           |

## 数据写入流程

1. 客户端向某个节点发送POST请求。
2. 接收到请求的节点自动成为**协调节点**，根据路由公式计算目标分片：`shard = hash(_routing) % num_primary_shards`（`_routing`为文档id）。找到该分片的主分片所在节点，将请求转发过去。
3. 主分片所在节点收到写请求后，执行以下步骤：
	- 写入Translog预写日志，保证即使宕机也能重放恢复。
	- 写入内存缓冲区（此时文档还不能搜索）。
	- 主分片并发的转发给副本分片，确保多数副本分片写入成功。
	- 协调节点返回客户端（此时文档还不能搜索）。
4. Refresh，默认每秒执行一次：
	- 将内存缓冲区中的文档生成一个新的Segment（一个不可变、自包含的小型倒排索引）
	- 打开Segment，此时文档可以被搜索。
5. Flush，数据持久化（触发条件为Translog超过512MB或每30分钟一次）：
	- 将当前所有在文件系统缓存中的Segment强制fsync到磁盘。
	- 创建一个提交点Commit Point，记录当前所有已持久化的Segment列表。
	- 清空旧Translog，并开始记录新Translog。
6. 删除/更新与段合并：
	- 删除：不修改Segment，只在`.del`文件中标记文档ID为已删除，查询时会跳过。
	- 更新：先标记旧文档删除，再写入新文档，产生新的Segment。
	- 段合并：后台任务会自动将多个小Segment合并为大Segment，并物理清理已删除文档，释放空间。

![ES-数据写入流程](/images/ES-数据写入流程.png)

## 数据检索流程

1. 客户端发起请求：向某个节点发起GET请求。
2. **Query Phase，查询阶段**：
	- 协调节点接收请求：解析查询DSL，确定目标索引和分片。
	- 广播查询：将查询请求发送给目标索引的所有主分片或副本分片。
	- 分片本地执行，每个分片独立查询。
	- 返回中间结果：每个分片将Top-N的`_id` + `_score` 列表返回给协调节点。
3. **协调节点合并排序**：在内存中对所有分片的Top-N合并后进行重新排序，去除全局的Top-N文档ID。
4. **Fetch Phase，获取阶段**：
	- 协调节点根据最终选出的文档ID列表，向对应分片发起Multi-Get请求，拉取这些文档的完整信息。
5. 协调节点组装最终结果，返回客户端。

![ES-数据搜索流程](/images/ES-数据搜索流程.png)



## 深分页问题

为什么深分页慢？
- 网络开销大：每个分片都要传输10000条数据，分片越多，传输量成倍增长。
- 内存压力大：协调节点需要暂存，并对海量中间结果排序，查询的页越深，需要的内存越大。
- 重复计算：每次翻页都要从头查一遍，无法利用之前的计算结果。
- 硬性限制：ES默认`max_result_window=10000`，from+size 超过这个值直接报错。

#### 方案一：Search After（推荐使用）
- 适用场景：无限翻页、瀑布流、实时数据。
- 核心思想：根据上一页最后一条的排序值作为游标起点，进行后续数据查询。search after支持查询多个字段。
- 局限性：
	- 需要一个唯一的排序字段。
	- 只能向后翻页，不能跳页。
```bash
// 第一页
GET /products/_search
{
  "size": 10,
  "sort": [
    { "price": "desc" },
    { "_id": "asc" }      // 必须包含唯一字段作为 tiebreaker
  ]
}

// 返回结果中最后一条的 sort 值：
// "sort": [999, "abc123"]

// 下一页：用 search_after 传入上一页最后一条的 sort 值
GET /products/_search
{
  "size": 10,
  "sort": [
    { "price": "desc" },
    { "_id": "asc" }
  ],
  "search_after": [999, "abc123"]
}
```

#### 方案二：Scroll API（不推荐使用）
- 适用场景：一次性导出海量数据、批量处理。
- 核心思想：生成一个数据快照，然后像游标一样分批遍历。
- 局限性：
	- 不实时：拿到的数据是快照数据。
	- 官方不推荐。

#### 方案三：Point In Time(PIT) + Search After （官方推荐）
- 适用场景：一致性视图+无限翻页
- 核心思想：PIT创建一个轻量级时间点视图，配合Search After实现一致性游标翻页。
```bash
// 1. 创建 PIT
POST /products/_pit?keep_alive=1m
// 返回 { "id": "pit_id_xxx" }

// 2. 用 PIT + search_after 查询
GET /_search
{
  "size": 10,
  "pit": {
    "id": "pit_id_xxx",
    "keep_alive": "1m"
  },
  "sort": [
    { "@timestamp": "desc" },
    { "_shard_doc": "asc" }   // PIT 下用 _shard_doc 做 tiebreaker
  ],
  "search_after": [1620000000000, 12345]
}

// 3. 用完释放 PIT
DELETE /_pit
{
  "id": "pit_id_xxx"
}
```

#### 方案四：限制深度分页（业务折衷）
- 适用场景：B端后台管理、搜索引擎前端。
