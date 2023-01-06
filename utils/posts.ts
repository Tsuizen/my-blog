import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface Post {
  readMins: number;
  words: number;
  content: string;
  headings: string;
  filename: string;
  featureImage: string;
  featureVideo: string;
  sourceLink: string;
  scripts: string;
  demoLink: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  sort: number;
  category: any;
  categorySlug: string;
  chapter: string;
  i18n: string;
}

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

  // 确保只导出最低限度数据
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
