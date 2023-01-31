import type { NextPage } from 'next';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

import { LayoutProps } from '../Home';

const PostLayout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar style={'base-100'} />
      {children}
      <Footer />
    </>
  );
};

export const getLayout = (page) => <PostLayout>{page}</PostLayout>;

export default PostLayout;
