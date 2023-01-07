import type { NextPage } from 'next';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

import { LayoutProps } from '../Home';

const PostLayout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div>
      <NavBar color={'bg-base-100'} />
      {children}
      <Footer />
    </div>
  );
};

export const getLayout = (page) => <PostLayout>{page}</PostLayout>;

export default PostLayout;
