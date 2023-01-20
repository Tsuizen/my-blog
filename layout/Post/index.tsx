import type { NextPage } from 'next';

import NavBar from '@/components/NavBar';

import { LayoutProps } from '../Home';

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
