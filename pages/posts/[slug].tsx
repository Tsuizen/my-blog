import { PrismaClient } from '@prisma/client';
import { getMDXComponent } from 'mdx-bundler/client';
import { InferGetStaticPropsType } from 'next';
import { useMemo } from 'react';

import { getAllPosts } from '@/utils/posts';

export async function getStaticProps({ params }: any) {
  console.log(params.slug);
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

export default function BlogPost(
  post: InferGetStaticPropsType<typeof getStaticProps>
) {
  const Component = useMemo(
    () => getMDXComponent(post.content!),
    [post.content]
  );

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{post.createdAt}</p>
      <article>
        <Component />
      </article>
    </>
  );
}
