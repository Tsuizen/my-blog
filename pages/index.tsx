import { PrismaClient } from '@prisma/client';
import { InferGetStaticPropsType } from 'next';

import Footer from '@/components/Footer';
import { RecentPosts } from '@/components/RecentPosts';

import Header from '../components/Header';

// 获取首页滚动加载数据
async function getRecentPosts(start = 0) {
  const db = new PrismaClient();
  const posts = await db.posts.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    skip: start,
    take: 5,
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

export default function Home({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Header />
      {/* <Hero /> */}
      <RecentPosts posts={posts} />
      <Footer />
    </>
  );
}
