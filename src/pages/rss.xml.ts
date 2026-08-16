import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
export async function GET(context: APIContext) {
  const posts = (await getCollection('writing', ({ data }) => !data.draft)).sort((a,b)=>b.data.publishedAt.valueOf()-a.data.publishedAt.valueOf());
  return rss({ title:'Kittsai Blog', description:'关于工程实践、技术判断与持续构建的文章。', site: context.site ?? 'https://kittsai.github.io', items: posts.map(post=>({title:post.data.title,description:post.data.description,pubDate:post.data.publishedAt,link:`/writing/${post.id}`})) });
}
