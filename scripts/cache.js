// 使用fuse.js搜索
const fs = require('fs');
const { join } = require('path');
const matter = require('gray-matter');

function getRealPath(path) {
  return join(process.cwd(), path);
}

const postsDirectory = getRealPath('posts');

function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, excerpt, content } = matter(fileContents, {
    excerpt_separator: '<!-- more -->'
  });

  const items = { excerpt };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });
  items['draft'] = data.draft;
  return items;
}

function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .filter((slug) => !getPostBySlug(slug, fields).draft)
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

const data = `export const posts = ${JSON.stringify(
  getAllPosts(['title', 'content', 'slug', 'tags'])
)}`;

try {
  fs.readdirSync(getRealPath('cache'));
} catch (error) {
  fs.mkdirSync(getRealPath('cache'));
}

fs.writeFile(getRealPath('cache/data.js'), data, (err) => {
  if (err) console.log(err);
  console.log('posts cached');
});
