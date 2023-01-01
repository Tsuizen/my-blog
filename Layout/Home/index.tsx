import type { NextPage } from 'next';
import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export interface LayoutProps {
  children: ReactNode;
}

const HomeLayout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export const getLayout = (page) => <HomeLayout>{page}</HomeLayout>;

export default HomeLayout;
