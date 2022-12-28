import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { RecentPosts } from '@/components/RecentPosts';

import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <RecentPosts />
      <Footer />
    </>
  );
}
