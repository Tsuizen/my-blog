import { InferGetStaticPropsType, NextPageWithLayout } from 'next';

import ListItem from '@/components/PostLIst';
import { CATEGORIES } from '@/config/slug-config';
import { getLayout } from '@/layout/Post';
import { getRecentPosts } from '@/lib/posts';
import { Post } from '@/types';

type CategoryPosts = Pick<
  Post,
  'slug' | 'title' | 'subtitle' | 'category' | 'description' | 'createdAt'
>;

export async function getStaticPaths() {
  const categorySlug = CATEGORIES.map((category) => category.label);
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
  const posts = await getRecentPosts<CategoryPosts>([
    'slug',
    'title',
    'createdAt',
    'subtitle',
    'description',
    'category'
  ]);

  return {
    props: {
      posts: posts.filter((post) => post.category === params.slug),
      keyword: params.slug
    }
  };
}

const Category: NextPageWithLayout = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { posts, keyword } = props;

  return (
    <>
      <ListItem allPosts={posts} keyword={keyword}></ListItem>
    </>
  );
};

Category.getLayout = getLayout;

export default Category;
