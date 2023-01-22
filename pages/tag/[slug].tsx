import { InferGetStaticPropsType, NextPageWithLayout } from 'next';
import { NextSeo } from 'next-seo';

import ListItem from '@/components/PostLIst';
import { TAGS } from '@/config/slug-config';
import { getLayout } from '@/layout/Default';
import { getRecentPosts } from '@/lib/posts';
import { Post } from '@/types';

type TagPosts = Pick<
  Post,
  'slug' | 'title' | 'subtitle' | 'tags' | 'description' | 'createdAt'
>;

export async function getStaticPaths() {
  const tags = TAGS.map((tag) => tag.label);
  return {
    paths: tags.map((slug) => {
      return {
        params: {
          slug
        }
      };
    }),
    fallback: false
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const posts = await getRecentPosts<TagPosts>([
    'slug',
    'title',
    'createdAt',
    'subtitle',
    'description',
    'TagPage',
    'tags'
  ]);

  return {
    props: {
      posts: posts.filter((post) => post.tags?.includes(params.slug)),
      keyword: params.slug
    }
  };
}

const TagPage: NextPageWithLayout = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { posts, keyword } = props;
  <NextSeo title={`${keyword} | Tsuizen's blog`} />;
  return (
    <>
      <ListItem allPosts={posts} keyword={keyword}></ListItem>
    </>
  );
};

TagPage.getLayout = getLayout;

export default TagPage;
