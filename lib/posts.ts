import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import { Post } from '@/types';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug<T extends Post>(
  slug: string,
  fields: string[] = []
): T {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  const readTime = readingTime(fileContents.toString(), {
    wordsPerMinute: 300
  });

  const items = {};

  // 按需导出数据
  fields.forEach(async (field) => {
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
    if (field === 'readTime') {
      items[field] = readTime;
    }
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'createdAt') {
      items[field] = format(data.createdAt, 'yyyy-MM-dd');
    }
  });

  items['draft'] = data.draft;

  return items as T;
}

export function getAllPosts<T extends Post>(fields: string[] = []): T[] {
  const slugs = getPostSlugs();

  const posts = slugs
    .filter((slug) => !getPostBySlug<T>(slug, fields).draft)
    .map((slug) => getPostBySlug<T>(slug, fields))
    .sort((a, b) => {
      if (isEqual(new Date(a.createdAt!), new Date(b.createdAt!))) return 0;
      else
        return isBefore(new Date(a.createdAt!), new Date(b.createdAt!))
          ? 1
          : -1;
    });
  
  
  return posts;
}

export async function getRecentPosts<T extends Post>(
  fields: string[] = []
): Promise<T[]> {
  const posts = getAllPosts<T>(fields);
  return posts;
}
