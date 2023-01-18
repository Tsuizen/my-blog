import type { NextPage } from 'next';

import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

import { LayoutProps } from '../Home';

const PostLayout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar color={'bg-base-100'} />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
};

export const getLayout = (page) => <PostLayout>{page}</PostLayout>;

export default PostLayout;
