import { InferGetStaticPropsType, NextPageWithLayout } from 'next';

import ListItem from '@/components/ListItem';
import { TAGS } from '@/config';
import { getLayout } from '@/layout/Default';
import { Post } from '@/types';
import { getRecentPosts } from '@/utils/posts';

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

  return (
    <>
      <ListItem allPosts={posts} keyword={keyword}></ListItem>
    </>
  );
};

TagPage.getLayout = getLayout;

export default TagPage;
