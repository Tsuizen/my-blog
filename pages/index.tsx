import { PrismaClient } from '@prisma/client';
import { InferGetStaticPropsType } from 'next';

import Footer from '@/components/Footer';
import { RecentPosts } from '@/components/RecentPosts';

import Header from '../components/Header';

async function getPosts(start = 0) {
  const db = new PrismaClient();
  const data = await db.posts.findMany({
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
      featureImageWidth: true,
      featureImageHeight: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return data;
}

export async function getStaticProps() {
  const posts = await getPosts();
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
