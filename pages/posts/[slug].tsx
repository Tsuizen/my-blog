// @ts-nocheck
import classNames from 'classnames';
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

import style from './index.module.scss';

const TableOfContent = dynamic(() => import('@/components/TableOfContent'));

type ReadTimeResults = {
  text: string;
  time: number;
  words: number;
  minutes: number;
};

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
      (opts.remarkPlugins = [...(opts.remarkPlugins ?? []), remarkGfm]),
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

  const post = frontmatter;
  post.readTime = readTime;
  post.content = code;

  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
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
        canonical={'https://tsuizen.cn/' + post.title}
        openGraph={{
          title: `${post.title}`,
          description: `${post.description}`,
          url: 'https://tsuizen.cn/posts/' + post.title,
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
        url={`https://tsuizen.cn/posts/${post.title}`}
        title={post.title}
        images={[]}
        datePublished={post.createdAt}
        dateModified={post.updatedAt}
        authorName={[
          {
            name: 'Tsuizen',
            url: 'https://tsuizen.cn'
          }
        ]}
        publisherName="Tsuizen"
        publisherLogo="https://tsuizen.cn/images/logo.png"
        description={post.description}
        isAccessibleForFree={true}
      />
      <div className="flex md:w-10/12 m-auto items-start">
        <main className="flex flex-wrap mt-10 w-full m-auto">
          <div className="w-4/5 px-10 m-auto md:px-0">
            <h1 className="text-4xl">{post.title}</h1>
            <p className="text-gray-500">
              {format(new Date(post.createdAt), 'yyyy-MM-dd')}
              &nbsp;·&nbsp;
              {Math.ceil(readTime.minutes)}&nbsp;分钟阅读
            </p>

            <p>{post.description}</p>
            <article
              className={classNames(style['markdown-body'], 'w-full mt-10')}
            >
              <Component components={components} />
            </article>
          </div>
        </main>
        <TableOfContent
          headings={headings}
          className="hidden md:block break-words w-60 p-4 mt-10 sticky top-20"
        />
      </div>
    </>
  );
};

BlogPost.getLayout = getLayout;

export default BlogPost;
