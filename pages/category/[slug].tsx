import { InferGetStaticPropsType, NextPageWithLayout } from 'next';

import { getLayout } from '@/components/Layout/Post';
import ListItem from '@/components/ListItem';
import { categories } from '@/Config/config';
import prisma from '@/utils/prisma';

export async function getStaticPaths() {
  const categorySlug = categories.map((category) => category.label);
  return {
    paths: categorySlug.map((slug) => {
      return {
        params: {
          slug
        }
      };
    }),
    fallback: false
  };
}

export async function getStaticProps({ params }: any) {
  const db = prisma;
  const posts = await db.posts.findMany({
    where: {
      category: {
        contains: params.slug
      }
    },
    select: {
      title: true,
      slug: true,
      subtitle: true,
      description: true,
      category: true
    }
  });

  return {
    props: {
      posts
    }
  };
}

const Category: NextPageWithLayout = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { posts } = props;
  const keys = posts.length && posts[0].category;

  return (
    <>
      <ListItem allPosts={posts} keyword={keys}></ListItem>
    </>
  );
};

Category.getLayout = getLayout;

export default Category;
