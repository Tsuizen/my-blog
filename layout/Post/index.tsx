import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { LayoutProps } from '../Home';

const NavBar = dynamic(() => import('@/components/NavBar'));

const PostLayout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar color={'bg-base-100'} />
      {children}
    </>
  );
};

export const getLayout = (page) => <PostLayout>{page}</PostLayout>;

export default PostLayout;
