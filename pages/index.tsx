import { PrismaClient } from '@prisma/client';
import { InferGetStaticPropsType, NextPageWithLayout } from 'next';

import { RecentPosts } from '@/components/RecentPosts';
import { getLayout } from '@/Layout/Home';

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
      <RecentPosts posts={posts} />
    </>
  );
};

Home.getLayout = getLayout;

export default Home;
