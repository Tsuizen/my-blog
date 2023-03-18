// @ts-nocheck
import Giscus from '@giscus/react';
import format from 'date-fns/format';
import * as fs from 'fs';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import { InferGetStaticPropsType, NextPageWithLayout } from 'next';
import dynamic from 'next/dynamic';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import path from 'path';
import { useEffect, useMemo, useState } from 'react';
import readingTime from 'reading-time';
import rehypeJoinLine from 'rehype-join-line';
import rehypeSlug from 'rehype-slug';
import rephyTargetBlank from 'rehype-target-blank';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';

import ListItem from '@/components/List/ListItem';
import OrderList from '@/components/List/OrderList';
import UnorderList from '@/components/List/UnorderList';
import Bilibili from '@/components/Player/Bilibili';
import Youtube from '@/components/Player/Youtube';
import PostImage from '@/components/PostImage';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import { TableOfContentsProps } from '@/components/TableOfContent';
import SEO from '@/config/seo-config';
import { getLayout } from '@/layout/Default';
import { getAllPosts } from '@/lib/posts';
import remarkNoteBlock from '@/lib/remark-note-block';
import { useThemeStore } from '@/store/store';
import { Post } from '@/types';

const TableOfContent = dynamic(() => import('@/components/TableOfContent'));

interface ReadTimeResults {
  text: string;
  time: number;
  words: number;
  minutes: number;
}

const components = {
  ul: UnorderList,
  ol: OrderList,
  li: ListItem,
  pre: SyntaxHighlighter,
  img: PostImage,
  Youtube,
  Bilibili
};

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      };
    }),
    fallback: false
  };
}

export async function getStaticProps({ params }: any) {
  const COMPONENTROOT = path.join(process.cwd(), 'posts');
  const filePath = path.resolve(process.cwd(), `posts/${params.slug}.mdx`);
  const { code, frontmatter } = await bundleMDX({
    mdxOptions: (opts) => {
      //TODO: 添加额外的处理插件
      (opts.remarkPlugins = [
        ...(opts.remarkPlugins ?? []),
        remarkGfm,
        remarkDirective,
        remarkNoteBlock
      ]),
        (opts.rehypePlugins = [
          ...(opts.rehypePlugins ?? []),
          rehypeSlug,
          rehypeJoinLine,
          rephyTargetBlank
        ]);
      return opts;
    },
    file: filePath,
    cwd: COMPONENTROOT
  });

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const readTime = readingTime(fileContents.toString(), {
    wordsPerMinute: 300
  });

  const post: Post = frontmatter;

  post.readTime = readTime;
  post.content = code;
  console.log(post);
  post.createdAt = format(post.createdAt, 'yyyy-MM-dd');

  if (post.updatedAt) {
    post.updatedAt = format(post.updatedAt, 'yyyy-MM-dd');
  }
  return {
    props: {
      post: post
    }
  };
}

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<
    TableOfContentsProps['headings']
  >([]);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll(
        'article > h1, article > h2, article > h3, article > h4, article > h5, article > h6'
      )
    )
      .filter((heading) => heading.id)
      .map((heading) => {
        return {
          id: heading.id,
          text: heading.textContent,
          level: heading.nodeName.substring(1)
        };
      });

    setNestedHeadings(headings);
  }, []);

  return [nestedHeadings];
};

const BlogPost: NextPageWithLayout = ({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const theme = useThemeStore((state) => state.theme);
  const [headings] = useHeadingsData();
  const Component = useMemo(
    () => getMDXComponent(post.content!),
    [post.content]
  );
  const { readTime }: { readTime: ReadTimeResults } = post;

  return (
    <>
      <NextSeo
        {...SEO}
        title={`${post.title} | Tsuizen's blog`}
        description={post.description}
        canonical={`https://blog.tsuizen.cn/posts/${post.slug}`}
        openGraph={{
          title: `${post.title}`,
          description: `${post.description}`,
          url: 'https://blog.tsuizen.cn/posts/' + post.slug,
          type: 'article',
          article: {
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            authors: ['Tsuizen'],
            tags: post.tags
          },
          images: []
        }}
      ></NextSeo>
      <ArticleJsonLd
        url={`https://blog.tsuizen.cn/posts/${post.slug}`}
        title={post.title}
        images={[]}
        datePublished={post.createdAt}
        dateModified={post.updatedAt}
        authorName={[
          {
            name: 'Tsuizen',
            url: 'https://blog.tsuizen.cn'
          }
        ]}
        publisherName="Tsuizen"
        publisherLogo="https://blog.tsuizen.cn/images/logo.png"
        description={post.description}
        isAccessibleForFree={true}
      />
      <div className="flex md:w-11/12 xl:w-9/12 m-auto items-start text-post">
        <main className="flex flex-wrap mt-10 w-full m-auto">
          <div className="w-4/5 px-10 md:px-0 m-auto">
            <h1 className="text-4xl">{post.title}</h1>
            <p className="text-gray-500">
              {post.createdAt}
              &nbsp;·&nbsp;
              {Math.ceil(readTime.minutes)}&nbsp;分钟阅读
            </p>

            <p>{post.description}</p>
            <article className={'markdown-body w-full mt-10'}>
              <Component components={components} />
            </article>
          </div>
        </main>
        <TableOfContent
          headings={headings}
          className="hidden md:block break-words w-60 mt-10 sticky top-20"
        />
      </div>
      <div className="w-11/12 md:w-9/12 xl:w-8/12 m-auto p-4 box-border">
        <Giscus
          id={post.slug}
          repo="Tsuizen/blog-giscus"
          repoId="R_kgDOJFKs9Q"
          category="Announcements"
          categoryId="DIC_kwDOJFKs9c4CUop5"
          mapping="url"
          term="欢迎评论👏"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          theme={theme}
          lang="en"
          loading="lazy"
        />
      </div>
    </>
  );
};

BlogPost.getLayout = getLayout;

export default BlogPost;
