import classnames from 'classnames';
import { InferGetStaticPropsType, NextPageWithLayout } from 'next';
import { NextSeo } from 'next-seo';

import Category from '@/components/Category';
import RecentPosts from '@/components/RecentPosts';
import Tag from '@/components/Tag';
import { getLayout } from '@/layout/Home';
import getRSS from '@/lib/generateRss';
import { getRecentPosts } from '@/lib/posts';
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

  await getRSS();

  return {
    props: {
      posts
    }
  };
}

// const RecentPosts = dynamic(() => import('@/components/RecentPosts'));
// const Category = dynamic(() => import('@/components/Category'));
// const Tag = dynamic(() => import('@/components/Tag'));

const Home: NextPageWithLayout = ({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo title="首页 | Tsuizen's blog" />
      <main
        className={classnames(
          style['container'],
          'md:w-4/5 md:grid m-auto break-all pt-10 items-start'
        )}
      >
        <RecentPosts posts={posts} className={style.content} page="index" />
        <Category className={style.category} />
        <Tag className={style.popular} />
      </main>
    </>
  );
};

Home.getLayout = getLayout;

export default Home;
