import { InferGetStaticPropsType } from 'next';

import Footer from '@/components/Footer';
import { RecentPosts } from '@/components/RecentPosts';

import Header from '../components/Header';

export async function getStaticProps() {}

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
