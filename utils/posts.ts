import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // 按需导出数据
  fields.forEach((field) => {
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (field === 'createdAt') {
      items[field] = format(data.createdAt, 'yyyy-MM-dd HH:mm:ss');
    }
  });
  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((a, b) => {
      if (isEqual(new Date(a.createdAt), new Date(b.createdAt))) return 0;
      else
        return isBefore(new Date(a.createdAt), new Date(b.createdAt)) ? 1 : -1;
    });
  return posts;
}
