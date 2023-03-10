import classnames from 'classnames';
import { InferGetStaticPropsType, NextPageWithLayout } from 'next';
import { NextSeo } from 'next-seo';

import Category from '@/components/Category';
import RecentPosts from '@/components/RecentPosts';
import Tag from '@/components/Tag';
import { getLayout } from '@/layout/Home';
import getRSS from '@/lib/generateRss';
import { getRecentPosts } from '@/lib/posts';
import getAllTags from '@/lib/tags';
import { Post } from '@/types';

import style from './index.module.scss';

type HomePosts = Pick<
  Post,
  'slug' | 'title' | 'createdAt' | 'description' | 'subtitle'
>;

// 获取首页数据
export async function getStaticProps() {
  const posts = await getRecentPosts<HomePosts>([
    'slug',
    'title',
    'createdAt',
    'subtitle',
    'description'
  ]);

  const tags = await getAllTags();

  await getRSS();

  return {
    props: {
      posts,
      tags
    }
  };
}

// const RecentPosts = dynamic(() => import('@/components/RecentPosts'));
// const Category = dynamic(() => import('@/components/Category'));
// const Tag = dynamic(() => import('@/components/Tag'));

const Home: NextPageWithLayout = ({
  posts,
  tags
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo title="首页 | Tsuizen's blog" />
      <main
        className={classnames(
          style['container'],
          'w-11/12 md:w-10/12 xl:w-3/5 md:grid m-auto break-all pt-10 items-start'
        )}
      >
        <RecentPosts posts={posts} className={style.content} page="index" />
        <Category className={style.category} />
        <Tag className={style.popular} tags={Object.values(tags)} />
      </main>
    </>
  );
};

Home.getLayout = getLayout;

export default Home;
