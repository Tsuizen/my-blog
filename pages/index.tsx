import Footer from '@/components/Footer';
import { RecentPosts } from '@/components/RecentPosts';

import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      {/* <Hero /> */}
      <RecentPosts />
      <Footer />
    </>
  );
}
