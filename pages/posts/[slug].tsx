// @ts-nocheck
import classNames from 'classnames';
import format from 'date-fns/format';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import { InferGetStaticPropsType, NextPageWithLayout } from 'next';
import path from 'path';
import { useEffect, useMemo, useState } from 'react';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import TableOfContent, {
  TableOfContentsProps
} from '@/components/TableOfContent';
import { getLayout } from '@/Layout/Post';
import { getAllPosts } from '@/utils/posts';

import style from './index.module.scss';

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
  console.log(COMPONENTROOT);
  const { code, frontmatter } = await bundleMDX({
    mdxOptions: (opts) => {
      //TODO: 添加额外的处理插件
      (opts.remarkPlugins = [...(opts.remarkPlugins ?? []), remarkGfm]),
        (opts.rehypePlugins = [
          ...(opts.rehypePlugins ?? []),
          rehypeSlug
          // rehypePrism
        ]);
      return opts;
    },
    file: path.resolve(process.cwd(), `posts/${params.slug}.md`),
    cwd: COMPONENTROOT
  });

  const post = frontmatter;
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

  return (
    <div className="flex md:w-10/12 m-auto items-start">
      <main className="flex flex-wrap mt-10 w-full m-auto">
        <div className="w-2/3 px-10 m-auto md:w-3/4 md:px-0">
          <h1>{post.title}</h1>
          <p className="text-gray-500">
            {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm:ss')}
          </p>
          <p>{post.description}</p>
          <article
            className={classNames(style['markdown-body'], 'w-full mt-10')}
          >
            <Component
              components={{
                pre: SyntaxHighlighter
              }}
            />
          </article>
        </div>
      </main>
      <TableOfContent
        headings={headings}
        className="hidden md:block break-words w-60 p-4 mt-10 sticky top-20"
      />
    </div>
  );
};

BlogPost.getLayout = getLayout;

export default BlogPost;
