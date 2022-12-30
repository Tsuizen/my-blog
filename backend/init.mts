import * as fsP from 'fs/promises';
import { bundleMDX } from 'mdx-bundler';
import * as path from 'path';
import readingTime from 'reading-time';

import { savePosts } from './db.mjs';

interface FilePath {
  dir: string;
  name: string;
}

interface Posts {
  
}

//获取 MDX 文档数据
const DOCROOT = process.env?.DOC_ROOT || path.join(process.cwd(), 'posts');
const COMPONENTROOT =
  process.env?.COMP_ROOT || path.join(process.cwd(), 'components');

export async function getPathAll(
  root: string,
  allFiles: FilePath[] = [],
  attachs?: FilePath
) {
  //获取所有文件
  const files = await fsP.readdir(root, { withFileTypes: true });

  //存储文件
  const dir: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const ext = path.extname(files[i].name);

    if (files[i].isDirectory()) {
      dir.push(path.join(root, files[i].name));
    } else if (files[i].isFile() && (ext === '.md' || ext === '.mdx')) {
      allFiles.push({ ...attachs, dir: root, name: files[i].name });
    }
  }

  //递归
  await Promise.all(
    dir.map(async (file) => getPathAll(file, allFiles, attachs))
  );

  return allFiles;
}

async function getMDXList() {
  const files = (await getPathAll(DOCROOT, [])) as FilePath[];

  type Once = {
    [key: string]: boolean;
  };

  let posts: Post[] = [];
  let onces: Once = {};

  for (let i = 0; i < files.length; i++) {
    const fp = path.join(files[i].dir, files[i].name);
    // 文章标题列表
    let headings: string[] = [];
    const { code, frontmatter } = await bundleMDX({
      mdxOptions: (opts) => {
        //TODO: 添加额外的处理插件
        return opts;
      },
      file: fp,
      cwd: COMPONENTROOT
    });

    //是否为草稿
    if (frontmatter.isDraft) {
      continue;
    }

    //统计字数
    const text = await fsP.readFile(fp);
    const stats = readingTime(text.toString(), { wordsPerMinute: 400 });

    const category = frontmatter.category || '博客';

    let post: Post = {
      sort: getSort(files[i].name),
      category: category,
      categorySlug: category,
      chapter: '',
      featureImage: '',
      featureVideo: '',
      demoLink: '',
      sourceLink: '',
      scripts: '',
      i18n: '',
      ...frontmatter,
      readMins: stats.minutes,
      words: stats.words,
      content: code,
      headings: JSON.stringify(headings),
      filename: fp,
      createdAt: new Date(Date.parse(frontmatter.createdAt)),
      updatedAt: new Date(Date.parse(frontmatter.updatedAt))
    };

    //校验
    const key = `${post.slug}_${post.i18n}`;
    if (!onces[key]) {
      onces[key] = true;
    } else {
      console.error(key, 'URL 重复!');
    }

    posts.push(post);
  }

  return posts;
}

//获取文件排序
function getSort(filename: string) {
  const items = filename.split(' ');
  if (items.length > 0) {
    return ~~items[0];
  }

  return -1;
}

async function initPostsToDB() {
  const posts = await getMDXList();
  await savePosts(posts);
}

export { initPostsToDB };
