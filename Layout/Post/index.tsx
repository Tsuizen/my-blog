import type { NextPage } from 'next';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { LayoutProps } from '../Home';

const PostLayout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="flex flex-wrap">{children}</main>
      <Footer />
    </div>
  );
};

export const getLayout = (page) => <PostLayout>{page}</PostLayout>;

export default PostLayout;
