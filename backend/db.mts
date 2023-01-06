import { format, isBefore, isEqual } from 'date-fns';

import { Post } from './init.mjs';
import getDB from './prisma.mjs';

function omitBy(obj: any, ...props: any[]) {
  const result = { ...obj };
  props.forEach(function (prop) {
    delete result[prop];
  });
  return result;
}

async function savePosts(posts: Post[]) {
  const db = getDB();
  if (!db) {
    console.error('获取数据库实例失败！');
    return;
  }

  //排序，确保日期越小对应的 ID 越小
  const initPosts = posts
    .sort((a, b) => {
      if (a.sort === b.sort) {
        if (isEqual(a.createdAt, b.createdAt)) return 0;
        else return isBefore(a.createdAt, b.createdAt) ? -1 : 1;
      }

      return a.sort - b.sort;
    })
    .map((v) => {
      return {
        ...omitBy(v, 'sort'),
        createdAt: format(v.createdAt, 'yyyy-MM-dd HH:mm:ss'),
        updatedAt: format(v.updatedAt, 'yyyy-MM-dd HH:mm:ss')
      };
    });

  await db.posts.deleteMany({});
  for (const post of initPosts) {
    await db.posts.create({ data: post });
  }
  await db.$disconnect();
}

export { savePosts };
