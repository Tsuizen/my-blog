import { PrismaClient } from '@prisma/client';
import classnames from 'classnames';
import { InferGetStaticPropsType, NextPageWithLayout } from 'next';

import Category from '@/components/Category';
import { RecentPosts } from '@/components/RecentPosts';
import Tag from '@/components/Tag';
import { getLayout } from '@/Layout/Home';

import style from './index.module.scss';

// 获取首页滚动加载数据
async function getRecentPosts() {
  const db = new PrismaClient();
  const posts = await db.posts.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 20,
    select: {
      title: true,
      subtitle: true,
      description: true,
      slug: true,
      category: true,
      categorySlug: true,
      author: true,
      tags: true,
      featureImage: true,
      createdAt: true,
      updatedAt: true
    }
  });
  await db.$disconnect();
  return posts;
}

export async function getStaticProps() {
  const posts = await getRecentPosts();
  return {
    props: {
      posts
    }
  };
}

const Home: NextPageWithLayout = ({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <main
        className={classnames(
          style['container'],
          'md:w-4/5 md:grid m-auto break-all pt-10 items-start'
        )}
      >
        <RecentPosts posts={posts} className={style.content} />
        <Category className={style.category} />
        <Tag className={style.popular} />
      </main>
    </>
  );
};

Home.getLayout = getLayout;

export default Home;
