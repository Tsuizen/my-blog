import { getMDXComponent } from 'mdx-bundler/client';
import { InferGetStaticPropsType } from 'next';
import { useMemo } from 'react';

import { getAllPosts, getPostsData } from '@/utils/posts';

export async function getStaticProps({ params }: any) {
  const postData = await getPostsData(params.slug);
  console.log(postData.slug);
  return {
    props: {
      code: postData.code,
      slug: postData.slug,
      frontmatter: JSON.parse(JSON.stringify(postData.frontmatter))
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
