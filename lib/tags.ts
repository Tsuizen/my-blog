import { getRecentPosts } from './posts';

type TagsInfo = {
  name: string;
  postsNum: number;
};

export default async function getAllTags() {
  const posts = await getRecentPosts(['tags']);
  const tags: Record<string, TagsInfo> = {};

  for (const post of posts) {
    for (const tag of post.tags!) {
      if (!tags[tag]) {
        tags[tag] = { name: tag, postsNum: 0 };
      }
      tags[tag].postsNum++;
    }
  }
  return tags;
}
