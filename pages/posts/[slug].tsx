import { getMDXComponent } from 'mdx-bundler/client';
import { InferGetStaticPropsType } from 'next';
import { useMemo } from 'react';

import { getAllPosts, getPostsData } from '@/utils/blogPosts';

export async function getStaticProps({ params }: any) {
  const postData = await getPostsData(params.slug);
  return {
    props: {
      ...postData
    }
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);
  console.log(posts);
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

export default function BlogPost({
  code,
  frontmatter
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>
      <p>{frontmatter.date}</p>
      <article>
        <Component />
      </article>
    </>
  );
}
