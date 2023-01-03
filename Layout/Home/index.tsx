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
      <div className={'h-52 md:h-80 bg-light w-full relative'}>
        <div className="w-full bg-light"></div>
        <Header color={'bg-light'}></Header>
        <div className="w-full absolute -bottom-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 290"
            className="bg-light w-full"
          >
            <path fill="#fff" d="M0,256L1440,128L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export const getLayout = (page) => <HomeLayout>{page}</HomeLayout>;

export default HomeLayout;
