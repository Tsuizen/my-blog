// @ts-nocheck
import classNames from 'classnames';
import { getMDXComponent } from 'mdx-bundler/client';
import { InferGetStaticPropsType, NextPageWithLayout } from 'next';
import { useEffect, useMemo, useState } from 'react';

import { getLayout } from '@/components/Layout/Post';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import TableOfContent, {
  TableOfContentsProps
} from '@/components/TableOfContent';
import { getAllPosts } from '@/utils/posts';
import prisma from '@/utils/prisma';

import style from './index.module.scss';

export async function getStaticProps({ params }: any) {
  const db = prisma;
  const post = await db.post.findFirst({
    where: {
      slug: params.slug
    }
  });

  return {
    props: {
      ...post
    }
  };
}

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

const BlogPost: NextPageWithLayout = (
  post: InferGetStaticPropsType<typeof getStaticProps>
) => {
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
          <p>{post.description}</p>
          <p>{post.createdAt}</p>
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
