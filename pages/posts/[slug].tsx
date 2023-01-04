import { PrismaClient } from '@prisma/client';
import classNames from 'classnames';
import { getMDXComponent } from 'mdx-bundler/client';
import { InferGetStaticPropsType, NextPageWithLayout } from 'next';
import { useMemo } from 'react';

import { getLayout } from '@/components/Layout/Post';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import { getAllPosts } from '@/utils/posts';

import style from './index.module.scss';

export async function getStaticProps({ params }: any) {
  const db = new PrismaClient();
  const post = await db.posts.findFirst({
    where: {
      slug: params.slug
    }
  });

  await db.$disconnect();

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

const BlogPost: NextPageWithLayout = (
  post: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const Component = useMemo(
    () => getMDXComponent(post.content!),
    [post.content]
  );

  return (
    <div className="w-2/3 md:w-1/2 m-auto px-10">
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{post.createdAt}</p>
      <article className={classNames(style['markdown-body'], 'w-full mt-10')}>
        {/* @ts-ignore */}
        <Component components={{ pre: SyntaxHighlighter }} />
      </article>
    </div>
  );
};

BlogPost.getLayout = getLayout;

export default BlogPost;
