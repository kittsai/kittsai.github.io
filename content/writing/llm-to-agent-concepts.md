---
title: 从大模型到 Agent：核心概念名词全梳理
description: 从 LLM 基础、RAG 与知识增强、推理与提示技术，到 Agent 核心、协议标准、框架工具、评估可观测性与新兴概念——系统梳理大模型到 Agent 演进脉络中的核心名词。
summary: 从 LLM 基础、RAG 与知识增强、推理与提示技术，到 Agent 核心、协议标准、框架工具、评估可观测性与新兴概念——系统梳理大模型到 Agent 演进脉络中的核心名词。
publishedAt: 2026-08-19
tags: [AI, LLM, Agent]
category: AI
draft: false
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 5
---
## 概述

从 2022 年 ChatGPT 的横空出世，到 2024-2025 年 AI Agent 的全面爆发，大语言模型（LLM）领域经历了从"对话工具"到"智能体平台"的深刻演进。本文系统梳理这一发展脉络中的核心概念和名词，按 LLM 基础、RAG 与知识增强、推理与提示技术、Agent 核心、Agent 协议与标准、Agent 框架与工具、Agent 评估与可观测性、新兴概念八大维度，力求全面覆盖、简明解释，并附上可查证的参考链接。

---

## 一、LLM 基础概念

**Token**（令牌）

- 解释：模型处理文本的最小单位，一个 Token 可以是一个词、一个子词或一个字符，取决于分词策略。模型以 Token 序列为输入和输出。
- 相关文档：[OpenAI: What are tokens?](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them) | [Hugging Face Tokenizers](https://huggingface.co/docs/tokenizers/)

**Tokenization**（分词）

- 解释：将原始文本切分为 Token 序列的过程，常见算法包括 BPE（Byte-Pair Encoding）、WordPiece、SentencePiece 等。分词直接影响模型的词表大小和编解码效率。
- 相关文档：[Hugging Face: Tokenizers Summary](https://huggingface.co/learn/nlp-course/chapter6/)

**Prompt**（提示词）

- 解释：用户输入给模型的文本指令或上下文，引导模型生成期望的输出。Prompt 的设计质量直接影响模型响应的准确性和实用性。
- 相关文档：[OpenAI: Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)

**Prompt Engineering**（提示工程）

- 解释：系统性地设计和优化 Prompt 以获得更好的模型输出的方法论与实践。包括角色设定、示例设计、思维链引导等技巧。
- 相关文档：[Prompt Engineering Guide (DAIR.AI)](https://www.promptingguide.ai/)

**System Prompt**（系统提示词）

- 解释：在对话开始时设定模型角色、行为边界和输出格式的隐藏指令，对用户不可见但影响模型的所有后续响应。
- 相关文档：[OpenAI: System Messages](https://platform.openai.com/docs/guides/text-generation)

**Few-shot Learning**（少样本学习）

- 解释：在 Prompt 中提供少量（通常 1-5 个）输入-输出示例，让模型从示例中推断任务模式。介于 Zero-shot 和 Fine-tuning 之间。
- 相关文档：[Brown et al., "Language Models are Few-Shot Learners" (GPT-3)](https://arxiv.org/abs/2005.14165)

**Zero-shot Learning**（零样本学习）

- 解释：不给任何示例，仅靠任务描述指令让模型直接完成新任务。依赖模型在预训练中获得的能力泛化。
- 相关文档：[GPT-3 Paper](https://arxiv.org/abs/2005.14165)

**In-context Learning**（上下文学习，ICL）

- 解释：模型无需更新参数，仅通过在 Prompt 中提供示例和上下文就能临时学习新任务的能力。这是 LLM 涌现出的核心能力之一。
- 相关文档：[Dong et al., "A Survey on In-context Learning"](https://arxiv.org/abs/2301.00234)

**Context Window**（上下文窗口）

- 解释：模型在单次推理中能处理的输入 + 输出 Token 总长度的上限。窗口越大，模型能"看到"的信息越多。典型值从 4K 到 1M+ 不等。
- 相关文档：[Google: Gemini 1.5 Pro (1M context)](https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/) | [Anthropic: Claude (200K context)](https://www.anthropic.com/news/claude-2-1)

**Temperature**（温度）

- 解释：控制模型输出随机性的参数。值越高输出越多样随机，值越低越确定保守。0 表示近乎确定性输出。
- 相关文档：[OpenAI: API Reference](https://platform.openai.com/docs/api-reference/chat)

**Top-p Sampling**（核采样，Nucleus Sampling）

- 解释：从概率累积达到 p 的最小 Token 集合中进行采样的解码策略，平衡多样性和质量。常与 Temperature 配合使用。
- 相关文档：[Holtzman et al., "The Curious Case of Neural Text Degeneration"](https://arxiv.org/abs/1904.09751)

**Top-k Sampling**

- 解释：只从概率最高的 k 个 Token 中进行采样的解码策略，截断长尾低概率选项，提升输出质量。
- 相关文档：[Fan et al., "Hierarchical Neural Story Generation"](https://arxiv.org/abs/1805.04833)

**Hallucination**（幻觉）

- 解释：模型生成看似合理但实际不正确或虚构的内容。是 LLM 的核心挑战之一，根源在于统计生成模型的不确定性。
- 相关文档：[Ji et al., "Survey of Hallucination in NLG"](https://arxiv.org/abs/2202.03629)

**Embedding**（嵌入 / 向量表示）

- 解释：将文本、图片等离散数据映射为高维连续向量，使语义相近的内容在向量空间中距离更近。是语义检索和 RAG 的基础。
- 相关文档：[OpenAI: Embeddings Guide](https://platform.openai.com/docs/guides/embeddings) | [Sentence-BERT](https://www.sbert.net/)

**Fine-tuning**（微调）

- 解释：在预训练模型基础上，使用特定领域数据进一步训练，使模型适配下游任务。包括全量微调和参数高效微调。
- 相关文档：[Hugging Face: Fine-tuning Guide](https://huggingface.co/docs/transformers/training)

**SFT**（Supervised Fine-Tuning，监督微调）

- 解释：使用人工标注的输入-输出对进行有监督训练，让模型学会按特定格式和风格响应。是后训练阶段的第一步。
- 相关文档：[Ouyang et al., "InstructGPT"](https://arxiv.org/abs/2203.02155)

**RLHF**（Reinforcement Learning from Human Feedback，基于人类反馈的强化学习）

- 解释：通过人类对模型输出的偏好标注训练奖励模型，再用 PPO 等强化学习算法优化模型策略。是 ChatGPT 成功的关键技术。
- 相关文档：[Christiano et al., "Deep RL from Human Preferences"](https://arxiv.org/abs/1706.03741) | [OpenAI: ChatGPT](https://openai.com/blog/chatgpt)

**DPO**（Direct Preference Optimization，直接偏好优化）

- 解释：不需要显式训练奖励模型，直接用偏好数据对模型进行优化的方法。比 RLHF 更简单稳定。
- 相关文档：[Rafailov et al., "Direct Preference Optimization"](https://arxiv.org/abs/2305.18290)

**LoRA**（Low-Rank Adaptation，低秩适配）

- 解释：冻结预训练模型权重，在旁边训练低秩矩阵来适配新任务的参数高效微调方法。大幅降低显存和计算需求。
- 相关文档：[Hu et al., "LoRA"](https://arxiv.org/abs/2106.09685)

**QLoRA**（Quantized LoRA，量化低秩适配）

- 解释：将基座模型量化到 4-bit，再使用 LoRA 进行微调的方法。可在单张 GPU 上微调大模型。
- 相关文档：[Dettmers et al., "QLoRA"](https://arxiv.org/abs/2305.14314)

**Quantization**（量化）

- 解释：将模型参数从高精度（如 FP16）压缩到低精度（如 INT8、INT4），减少显存占用和推理成本，同时尽量保持模型性能。
- 相关文档：[GPTQ Paper](https://arxiv.org/abs/2210.17323) | [bitsandbytes](https://github.com/bitsandbytes-foundation/bitsandbytes)

**MoE**（Mixture of Experts，混合专家模型）

- 解释：模型包含多个"专家"子网络，每次推理时通过门控机制动态选择少量专家参与计算。在增大参数量的同时控制推理成本。代表模型有 Mixtral、DeepSeek-MoE。
- 相关文档：[Shazeer et al., "Sparsely-Gated MoE"](https://arxiv.org/abs/1701.06538) | [Mixtral 8x7B](https://mistral.ai/news/mixtral-of-experts/)

**Multimodal**（多模态）

- 解释：模型能够同时处理文本、图像、音频、视频等多种模态输入和输出。是 LLM 向通用 AI 发展的重要方向。
- 相关文档：[OpenAI: GPT-4V](https://openai.com/research/gpt-4v-system-card) | [Google: Gemini](https://deepmind.google/technologies/gemini/)

**VLM**（Vision-Language Model，视觉语言模型）

- 解释：能够理解和推理图像与文本关系的模型，支持图像描述、视觉问答、图文匹配等任务。
- 相关文档：[Liu et al., "LLaVA"](https://arxiv.org/abs/2304.08485) | [Qwen-VL](https://github.com/QwenLM/Qwen-VL)

**Pre-training**（预训练）

- 解释：在海量无标注文本上进行自监督学习，学习语言的通用表示和世界知识。是 LLM "出厂"时的能力来源。
- 相关文档：[Kaplan et al., "Scaling Laws for Neural Language Models"](https://arxiv.org/abs/2001.08361)

**Post-training**（后训练 / 对齐训练）

- 解释：在预训练之后，通过 SFT、RLHF 等方法使模型输出符合人类偏好和任务需求的过程。决定了模型的"可用性"。
- 相关文档：[OpenAI: GPT-4 Technical Report](https://arxiv.org/abs/2303.08774)

**Constitutional AI**（宪法 AI）

- 解释：Anthropic 提出的 AI 对齐方法，通过一组"宪法"原则让模型自我评估和修正输出，减少对人类标注的依赖。
- 相关文档：[Bai et al., "Constitutional AI"](https://arxiv.org/abs/2212.08073)

**Guardrails**（护栏）

- 解释：为模型输入输出设置安全过滤和约束机制，防止生成有害、越狱或超出范围的回复。
- 相关文档：[NVIDIA NeMo Guardrails](https://github.com/NVIDIA/NeMo-Guardrails)

**Structured Output**（结构化输出 / JSON Mode）

- 解释：约束模型输出为特定格式（如 JSON Schema），确保输出可被程序解析。是实现 Tool Use 的基础。
- 相关文档：[OpenAI: Structured Outputs](https://openai.com/blog/introducing-structured-outputs-in-the-api/) | [Anthropic: Tool Use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)

## 二、RAG 与知识增强

**RAG**（Retrieval-Augmented Generation，检索增强生成）

- 解释：在生成回答前，先从外部知识库检索相关文档，将检索结果作为上下文提供给模型。有效缓解幻觉、提供最新知识。
- 相关文档：[Lewis et al., "RAG for Knowledge-Intensive NLP Tasks"](https://arxiv.org/abs/2005.11401)

**Vector Database / Vector Store**（向量数据库 / 向量存储）

- 解释：专门存储和检索高维向量的数据库，支持近似最近邻（ANN）搜索。常见方案有 FAISS、Milvus、Pinecone、Chroma 等。
- 相关文档：[Milvus](https://milvus.io/) | [Pinecone](https://www.pinecone.io/) | [Chroma](https://www.trychroma.com/)

**Chunking**（分块 / 文本分块）

- 解释：将长文档切分为较小片段的过程，以便进行向量化和检索。分块策略直接影响检索质量和 RAG 效果。
- 相关文档：[LangChain: Text Splitters](https://python.langchain.com/docs/how_to/#text-splitters)

**Chunking Strategy**（分块策略）

- 解释：决定如何分块的方法论，包括固定大小分块、按语义分块（Semantic Chunking）、按段落分块等。好的策略平衡上下文完整性和检索精度。
- 相关文档：[LlamaIndex: Chunking](https://docs.llamaindex.ai/en/stable/optimizing/production_rag/)

**Semantic Search**（语义搜索）

- 解释：基于向量相似度进行搜索，而非关键词精确匹配。能理解查询的语义含义，找到概念相关但字面不同的结果。
- 相关文档：[Pinecone: Semantic Search](https://www.pinecone.io/learn/semantic-search/)

**Hybrid Search**（混合搜索）

- 解释：结合向量语义搜索和传统关键词（BM25）搜索的方法，兼顾语义理解和精确匹配，提升召回率。
- 相关文档：[Weaviate: Hybrid Search](https://weaviate.io/blog/hybrid-search-explained)

**Reranking**（重排序）

- 解释：对初步检索结果使用更精细的模型（如 Cross-Encoder）重新打分排序，提升最终呈现给模型的 Top-K 结果的相关性。
- 相关文档：[Cohere: Rerank](https://cohere.com/blog/rerank) | [SBERT Cross-Encoders](https://www.sbert.net/examples/training/cross_encoder/)

**Grounding**（事实锚定 / 接地）

- 解释：将模型生成的内容锚定到可验证的外部知识源，确保回答有据可查，是 RAG 的核心目标之一。
- 相关文档：[Google Cloud: Grounding with Gemini](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview)

**Knowledge Graph (in LLM context)**（知识图谱）

- 解释：在 LLM 场景中，知识图谱用于存储实体间的结构化关系，可以作为 RAG 的补充，提供更精确的事实推理能力。GraphRAG 是典型应用。
- 相关文档：[Microsoft: GraphRAG](https://microsoft.github.io/graphrag/) | [Neo4j + LLM](https://neo4j.com/labs/genai-ml/)

---

## 三、推理与提示技术

**Chain-of-Thought**（思维链，CoT）

- 解释：在 Prompt 中引导模型"一步步思考"，展示推理过程后再给出答案。显著提升数学、逻辑等复杂任务的准确率。
- 相关文档：[Wei et al., "Chain-of-Thought Prompting"](https://arxiv.org/abs/2201.11903)

**ReAct**（Reasoning + Acting，推理与行动）

- 解释：让模型交替进行推理和行动（如调用工具），将思考过程和工具调用结果结合来解决问题。是 Agent 的基础范式之一。
- 相关文档：[Yao et al., "ReAct"](https://arxiv.org/abs/2210.03629)

**Tree of Thoughts**（思维树，ToT）

- 解释：将推理过程组织为树形结构，允许探索多条推理路径并通过评估回溯选择最优路径。适合搜索和规划类问题。
- 相关文档：[Yao et al., "Tree of Thoughts"](https://arxiv.org/abs/2305.10601)

**Graph of Thoughts**（思维图，GoT）

- 解释：在 ToT 基础上进一步泛化，允许推理节点形成任意有向图结构，支持路径合并和循环，增强复杂推理能力。
- 相关文档：[Besta et al., "Graph of Thoughts"](https://arxiv.org/abs/2308.09687)

**Self-Consistency**（自洽性 / 自我一致性）

- 解释：对同一问题多次采样不同的推理路径，通过多数投票选择最一致的答案。提升 CoT 的鲁棒性。
- 相关文档：[Wang et al., "Self-Consistency Improves CoT"](https://arxiv.org/abs/2203.11171)

**Reflection / Self-Reflection**（反思 / 自我反思）

- 解释：让模型在生成答案后回顾和评估自己的输出，发现错误并修正。是 Agent 自我改进的重要机制。
- 相关文档：[Shinn et al., "Reflexion"](https://arxiv.org/abs/2303.11366) | [Madaan et al., "Self-Refine"](https://arxiv.org/abs/2303.17651)

**Test-time Compute**（测试时计算 / 推理时计算扩展）

- 解释：在推理阶段增加计算量来提升输出质量，如多次采样、迭代修正等。这是推理模型（如 o1）的核心范式。
- 相关文档：[OpenAI: Learning to Reason with LLMs](https://openai.com/index/learning-to-reason-with-llms/) | [Snell et al., "Scaling LLM Test-Time Compute"](https://arxiv.org/abs/2408.03314)

**Reasoning Models**（推理模型）

- 解释：通过强化学习训练模型在回答前进行长链推理，显著提升数学、编程等复杂任务能力。代表模型有 OpenAI o1/o3、DeepSeek-R1。
- 相关文档：[OpenAI o1 System Card](https://openai.com/index/openai-o1-system-card/) | [DeepSeek-R1](https://arxiv.org/abs/2501.12948)

**Scratchpad**（草稿本）

- 解释：允许模型在输出中使用隐藏的中间步骤进行推理，最终只输出结论。类似人类打草稿的过程。
- 相关文档：[Nye et al., "Show Your Work: Scratchpads"](https://arxiv.org/abs/2112.00114)

## 四、Agent 核心概念

**AI Agent**（AI 智能体）

- 解释：能够感知环境、自主规划、调用工具并执行行动以完成目标的 AI 系统。LLM 作为"大脑"，工具作为"手脚"，形成完整的代理能力。
- 相关文档：[Lilian Weng: "LLM Powered Autonomous Agents"](https://lilianweng.github.io/published_papers/llm-agents.pdf) | [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)

**Agentic Workflow**（智能体工作流）

- 解释：由多个 LLM 调用步骤组成的自动化流程，每个步骤可能涉及推理、工具调用或决策。是 Agent 落地的主要形态。
- 相关文档：[Andrew Ng: "Agentic Design Patterns"](https://www.deeplearning.ai/the-batch/how-agents-can-improve-llm-performance/)

**Tool Use / Tool Calling / Function Calling**（工具使用 / 工具调用 / 函数调用）

- 解释：模型根据用户意图，选择并调用外部工具（如搜索、计算器、API），将工具返回结果融入回答。是 Agent 与外部世界交互的核心能力。
- 相关文档：[OpenAI: Function Calling](https://platform.openai.com/docs/guides/function-calling) | [Anthropic: Tool Use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)

**Planning**（规划）

- 解释：Agent 将复杂目标分解为可执行的子任务序列的能力。包括任务分解、步骤排序、依赖管理等。
- 相关文档：[Lilian Weng: "LLM Powered Autonomous Agents" (Planning section)](https://lilianweng.github.io/published_papers/llm-agents.pdf)

**Memory (Short-term / Long-term / Working Memory)**（记忆：短期 / 长期 / 工作记忆）

- 解释：Agent 存储和检索信息的能力。短期记忆对应上下文窗口，长期记忆通常使用向量数据库，工作记忆是当前任务的中间状态。
- 相关文档：[LangChain: Memory](https://python.langchain.com/docs/modules/memory/) | [MemGPT](https://arxiv.org/abs/2310.08560)

**Observation**（观察）

- 解释：Agent 从环境（如工具返回值、用户反馈、系统状态）中获取信息的过程，是 Agent Loop 的感知环节。
- 相关文档：[Yao et al., "ReAct" (Observation in the loop)](https://arxiv.org/abs/2210.03629)

**Action Space**（行动空间）

- 解释：Agent 可以执行的所有可能动作的集合，包括可调用的工具、可发送的消息等。行动空间的设计决定了 Agent 的能力边界。
- 相关文档：[OpenAI: Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)

**Reward / Feedback Loop**（奖励 / 反馈循环）

- 解释：Agent 根据行动结果获得正向或负向信号，据此调整后续行为。可以来自人类、环境或模型自评。
- 相关文档：[Sutton & Barto, "Reinforcement Learning: An Introduction"](http://incompleteideas.net/book/RLbook2020.pdf)

**Autonomy Levels**（自治等级）

- 解释：衡量 Agent 自主决策程度的指标，从完全人工操作到完全自主。不同任务需要不同的自治等级。
- 相关文档：[Microsoft: Autonomous AI Agent Levels](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/agents)

**Human-in-the-Loop**（HITL，人在回路）

- 解释：在 Agent 执行过程中引入人类审核和干预，确保关键决策的安全性和准确性。常用于高风险场景。
- 相关文档：[LangGraph: Human-in-the-loop](https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/) | [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)

**Agent Loop**（智能体循环：感知 → 规划 → 行动 → 观察）

- 解释：Agent 的核心运行周期：感知环境状态 → 规划下一步行动 → 执行行动 → 观察结果，循环直至完成目标。
- 相关文档：[ReAct Paper](https://arxiv.org/abs/2210.03629) | [Anthropic: Agent Loop](https://docs.anthropic.com/en/docs/build-with-claude/agentic-tool-use)

**Multi-Agent System**（多智能体系统）

- 解释：多个 Agent 协作完成复杂任务的系统架构，每个 Agent 扮演不同角色，通过通信和协调达成目标。
- 相关文档：[AutoGen: Multi-Agent Framework](https://microsoft.github.io/autogen/) | [CAMEL: Communicative Agents](https://arxiv.org/abs/2303.17760)

**Role-playing**（角色扮演）

- 解释：在多 Agent 系统中，为每个 Agent 分配特定角色（如 coder、reviewer、manager），通过角色间的交互协作完成任务。
- 相关文档：[CAMEL: Role-Playing Language Agents](https://arxiv.org/abs/2303.17760)

**Handoff**（交接 / 转交）

- 解释：Agent 将当前任务或子任务转交给另一个 Agent 或人类处理的机制，实现专业化分工。
- 相关文档：[OpenAI: Agents SDK (Handoffs)](https://openai.github.io/openai-agents-python/handoffs/)

**SOP**（Standard Operating Procedure，标准操作流程）

- 解释：为 Agent 预定义的标准化操作流程，将复杂任务拆解为可复用的步骤模板，提升一致性和可靠性。
- 相关文档：[MetaGPT: SOPs for Agents](https://arxiv.org/abs/2308.00352)

**Durable Execution**（持久化执行）

- 解释：Agent 的执行状态可以被持久化保存，即使进程中断也能恢复继续执行。对长时间运行的任务至关重要。
- 相关文档：[Temporal: Durable Execution](https://temporal.io/) | [Restate: Durable Agents](https://restate.dev/)

**Sandboxing / Code Interpreter**（沙箱 / 代码解释器）

- 解释：为 Agent 提供隔离的代码执行环境（如容器、Jupyter），让 Agent 能运行代码、处理数据，同时确保安全性。
- 相关文档：[OpenAI: Code Interpreter](https://openai.com/blog/chatgpt-plugins#code-interpreter) | [E2B: Code Interpreter SDK](https://e2b.dev/)

**Computer Use**（计算机使用）

- 解释：Agent 能够像人类一样操作计算机界面（点击、输入、滚动），直接与桌面应用和操作系统交互。
- 相关文档：[Anthropic: Claude Computer Use](https://www.anthropic.com/news/claude-3-5-sonnet-computer-use)

**Browser Automation**（浏览器自动化）

- 解释：Agent 通过程序化方式控制浏览器，实现网页浏览、表单填写、数据抓取等操作。是 Web Agent 的基础能力。
- 相关文档：[Playwright](https://playwright.dev/) | [Browser Frameworks: Browser Use](https://github.com/browser-use/browser-use)

## 五、Agent 协议与标准

**MCP**（Model Context Protocol，模型上下文协议）

- 解释：Anthropic 提出的开放协议，标准化了 LLM 应用与外部数据源、工具之间的连接方式。类似 AI 领域的 USB-C 接口。
- 相关文档：[Model Context Protocol 官网](https://modelcontextprotocol.io/) | [Anthropic: MCP blog](https://www.anthropic.com/news/model-context-protocol)

**ACP**（Agent Communication Protocol，Agent 通信协议）

- 解释：标准化 Agent 之间通信和协作的协议，定义消息格式、角色协调和信息共享规则。
- 相关文档：[Agent Communication Protocol (Google ACP spec)](https://github.com/agntcy/acp-spec)

**A2A**（Agent2Agent Protocol，Agent 间协议）

- 解释：Google 提出的开放协议，允许不同框架构建的 Agent 互相发现、通信和协作，打破 Agent 生态孤岛。
- 相关文档：[Google: A2A Protocol](https://a2a-protocol.org/) | [Google Blog: A2A](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)

**OpenAPI (in Agent context)**（OpenAPI 规范）

- 解释：Agent 通过 OpenAPI（原 Swagger）规范描述的 API 定义来理解和调用外部服务，实现工具的自动发现和集成。
- 相关文档：[OpenAPI Initiative](https://www.openapis.org/) | [OpenAI: Function Calling with OpenAPI](https://platform.openai.com/docs/guides/function-calling)

**Function Calling Schema**（函数调用 Schema）

- 解释：定义 Agent 可调用函数的名称、参数、返回值等规范，使模型能正确生成函数调用请求。通常以 JSON Schema 表达。
- 相关文档：[OpenAI: Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)

**Agent Client Protocol**（Agent 客户端协议）

- 解释：定义 Agent 与其客户端（前端界面、调用方）之间的交互协议，包括消息格式、流式输出、状态同步等。
- 相关文档：[AGNTCY: Agent Client Protocol](https://github.com/agntcy)

---

## 六、Agent 框架与工具

**LangChain**（LangChain 框架）

- 解释：最流行的 LLM 应用开发框架，提供 Prompt 管理、链式调用、工具集成、Agent 编排等完整能力。
- 相关文档：[LangChain 官网](https://python.langchain.com/) | [GitHub](https://github.com/langchain-ai/langchain)

**LangGraph**（LangGraph）

- 解释：LangChain 团队推出的 Agent 编排框架，基于图（Graph）结构定义 Agent 工作流，支持循环、分支、人工干预等复杂流程。
- 相关文档：[LangGraph 文档](https://langchain-ai.github.io/langgraph/) | [GitHub](https://github.com/langchain-ai/langgraph)

**LangSmith**（LangSmith）

- 解释：LangChain 的可观测性平台，提供 LLM 应用的 Tracing、调试、评估和监控能力。
- 相关文档：[LangSmith 官网](https://smith.langchain.com/)

**AutoGen**（AutoGen 框架）

- 解释：微软推出的多 Agent 对话框架，通过 Agent 间的多轮对话协作解决复杂任务，支持人类参与和代码执行。
- 相关文档：[AutoGen GitHub](https://github.com/microsoft/autogen) | [AutoGen Paper](https://arxiv.org/abs/2308.08155)

**CrewAI**（CrewAI 框架）

- 解释：基于角色的多 Agent 协作框架，定义 Crew（团队）、Agent（成员）、Task（任务）等概念，简单直观地编排 Agent 团队。
- 相关文档：[CrewAI 官网](https://docs.crewai.com/) | [GitHub](https://github.com/crewAIInc/crewAI)

**LlamaIndex**（LlamaIndex 框架）

- 解释：专注数据连接和 RAG 的 LLM 应用框架，提供数据摄入、索引、检索和生成的完整工具链。
- 相关文档：[LlamaIndex 官网](https://docs.llamaindex.ai/) | [GitHub](https://github.com/run-llama/llama_index)

**Semantic Kernel**（Semantic Kernel）

- 解释：微软推出的 LLM 编排 SDK，支持 C#、Python、Java，以"技能（Skills/Plugins）"为核心抽象，面向企业级应用。
- 相关文档：[Semantic Kernel 文档](https://learn.microsoft.com/en-us/semantic-kernel/) | [GitHub](https://github.com/microsoft/semantic-kernel)

**AutoGPT**（AutoGPT）

- 解释：早期著名 autonomous agent 项目，让 GPT-4 自主设定子目标、执行任务、自我反思。开创了 AI Agent 的先河。
- 相关文档：[AutoGPT GitHub](https://github.com/Significant-Gravitas/AutoGPT)

**MetaGPT**（MetaGPT）

- 解释：模拟软件开发团队的 Multi-Agent 框架，为不同 Agent 分配产品经理、架构师、工程师等角色，按 SOP 协作完成软件开发。
- 相关文档：[MetaGPT GitHub](https://github.com/geekan/MetaGPT) | [MetaGPT Paper](https://arxiv.org/abs/2308.00352)

## 七、Agent 评估与可观测性

**Benchmark**（基准测试）

- 解释：用于标准化评估 LLM 和 Agent 能力的测试集和排名体系，通过统一任务和指标对比不同模型/系统的表现。
- 相关文档：[Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard)

**Harness**（测试工具 / 评估框架）

- 解释：运行 Benchmark 的软件框架，管理模型推理、评分计算和结果输出。lm-evaluation-harness 是最广泛使用的实现。
- 相关文档：[lm-evaluation-harness (EleutherAI)](https://github.com/EleutherAI/lm-evaluation-harness)

**SWE-bench**（软件工程基准测试）

- 解释：评估 Agent 在真实软件工程任务中表现的基准测试，要求 Agent 修复 GitHub 上的真实 issue。
- 相关文档：[SWE-bench 官网](https://www.swebench.com/) | [论文](https://arxiv.org/abs/2310.06770)

**AgentBench**（Agent 基准测试）

- 解释：全面评估 LLM 作为 Agent 在多种环境（操作系统、数据库、知识图谱、游戏等）中表现能力的基准测试。
- 相关文档：[AgentBench 论文](https://arxiv.org/abs/2308.03688)

**GAIA**（General AI Assistants Benchmark）

- 解释：评估通用 AI 助手的基准测试，包含需要多步推理、工具使用和真实世界知识的复杂任务。
- 相关文档：[GAIA 论文](https://arxiv.org/abs/2311.12983) | [GAIA Hugging Face](https://huggingface.co/spaces/gaia-benchmark/leaderboard)

**Tracing / Observability**（追踪 / 可观测性）

- 解释：对 LLM 和 Agent 的执行过程进行监控和记录，包括调用链路、Token 消耗、延迟、错误等。是生产环境运维的核心能力。
- 相关文档：[LangSmith](https://smith.langchain.com/) | [Langfuse](https://langfuse.com/) | [Arize Phoenix](https://phoenix.arize.com/)

**Eval / Evaluation**（评估）

- 解释：系统性地评估 LLM/Agent 输出质量和能力的过程，包括自动评估（如 LLM-as-judge）和人工评估。
- 相关文档：[OpenAI: Evals](https://github.com/openai/evals) | [Ragas (RAG eval)](https://docs.ragas.io/)

**Leaderboard**（排行榜）

- 解释：公开展示不同模型/Agent 在特定 Benchmark 上表现的排名，方便横向比较。知名的有 Hugging Face Leaderboard、LMSYS Chatbot Arena。
- 相关文档：[LMSYS Chatbot Arena](https://chat.lmsys.org/) | [Hugging Face Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard)

---

## 八、新兴概念

**AGI**（Artificial General Intelligence，通用人工智能）

- 解释：能在任何智力任务上达到或超越人类水平的 AI。这是当前 AI 研究的终极目标，尚无明确定义的实现标准。
- 相关文档：[OpenAI: AGI definition](https://openai.com/blog/governance-of-superintelligence/) | [DeepMind: Levels of AGI](https://arxiv.org/abs/2311.17824)

**Scaling Laws**（缩放定律）

- 解释：描述模型性能与参数量、数据量、计算量之间幂律关系的规律。是当前 LLM 发展的基础理论支撑。
- 相关文档：[Kaplan et al., "Scaling Laws for Neural Language Models"](https://arxiv.org/abs/2001.08361) | [Hoffmann et al., "Chinchilla Scaling Laws"](https://arxiv.org/abs/2203.15556)

**Emergent Abilities**（涌现能力）

- 解释：模型规模达到一定阈值后突然出现的新能力，这些能力在小模型中不存在。如 In-context Learning、CoT 推理等。
- 相关文档：[Wei et al., "Emergent Abilities of Large Language Models"](https://arxiv.org/abs/2206.07682)

**Compound AI Systems**（复合 AI 系统）

- 解释：由多个 AI 组件（LLM、检索器、工具、评估器等）组合而成的系统，通过组件协作实现比单一模型更强的能力。Agent 是其典型形态。
- 相关文档：[Berkeley AI: Compound AI Systems](https://bair.berkeley.edu/blog/2024/02/18/compound-ai-systems/)

**AI Operating System**（AIOS，AI 操作系统）

- 解释：将 Agent 作为一等公民的操作系统概念，为 Agent 提供资源调度、权限管理、Agent 间通信等基础设施。
- 相关文档：[AIOS: AI Agent Operating System (paper)](https://arxiv.org/abs/2403.16971) | [AIOS GitHub](https://github.com/agiresearch/AIOS)

**Agent Marketplace**（Agent 市场）

- 解释：类似应用商店的 Agent 交易平台，开发者发布和分享可复用的 Agent，用户按需选择和使用。
- 相关文档：[OpenAI: GPT Store](https://openai.com/blog/introducing-the-gpt-store/) | [Coze](https://www.coze.com/)

**GUI Agent**（图形界面智能体）

- 解释：能够通过理解图形用户界面（GUI）进行操作的 Agent，与 Computer Use 类似但更侧重移动端和 Web 端。
- 相关文档：[Anthropic: Claude Computer Use](https://www.anthropic.com/news/claude-3-5-sonnet-computer-use) | [AppAgent](https://github.com/mnotgod96/AppAgent)

**Agentic Search**（智能体搜索）

- 解释：由 Agent 驱动的下一代搜索范式，不仅返回链接，还自动浏览、理解和综合信息，直接给出答案。
- 相关文档：[Perplexity AI](https://www.perplexity.ai/) | [OpenAI: Deep Research](https://openai.com/index/introducing-deep-research/)

**Deep Research**（深度研究）

- 解释：Agent 自主进行多轮搜索、阅读、分析、综合的长文本研究能力，能产出结构化的研究报告。OpenAI 和 Google 均已推出相关功能。
- 相关文档：[OpenAI Deep Research](https://openai.com/index/introducing-deep-research/) | [Google Gemini Deep Research](https://deepmind.google/technologies/gemini/)

---

## 发展脉络图

| 时间 | 里程碑事件 | 代表性技术 / 产品 |
| --- | --- | --- |
| 2017 | Transformer 架构提出 | Attention is All You Need |
| 2018-2019 | 预训练模型兴起 | BERT、GPT-2 |
| 2020 | GPT-3 发布，提出 In-context Learning | Few-shot Learning、Scaling Laws |
| 2022.01 | Chain-of-Thought 提示技术 | CoT Prompting |
| 2022.03 | RLHF 在 InstructGPT 中应用 | SFT + RLHF 对齐训练 |
| 2022.10 | ReAct 范式提出 | Reasoning + Acting |
| 2022.11 | ChatGPT 发布，LLM 大规模普及 | GPT-3.5、对话式 AI |
| 2023.02 | 多模态 LLM 出现 | GPT-4、GPT-4V |
| 2023.03 | AutoGPT 引爆 autonomous agent 概念 | AutoGPT、BabyAGI |
| 2023.06 | RAG 成为知识增强主流方案 | LangChain、LlamaIndex |
| 2023.10 | Agent 框架百花齐放 | AutoGen、MetaGPT、CrewAI |
| 2024.05 | 多 Agent 协作标准酝酿 | A2A Protocol、MCP |
| 2024.09 | OpenAI o1 发布，推理模型时代开启 | Reasoning Models、Test-time Compute |
| 2024.10 | Anthropic 推出 Computer Use | GUI Agent、Browser Automation |
| 2024.11 | Anthropic 发布 MCP 协议 | Model Context Protocol |
| 2025.01 | DeepSeek-R1 开源推理模型 | RL for Reasoning |
| 2025.02 | Google 推出 A2A 协议 | Agent 互操作性 |
| 2025.06 | OpenAI 推出 Deep Research | Agentic Search |
| 2025+ | Agent 走向生产环境 | AIOS、Agent Marketplace |

---

> 🌍 *The world is yours. — Tony Montana, AI Generated*