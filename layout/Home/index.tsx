import classNames from 'classnames';
import type { NextPage } from 'next';
import { ReactNode } from 'react';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import useMounted from '@/hooks/useMounted';
import { useThemeStore } from '@/store/store';

import styles from './index.module.scss';

// NavBar懒加载导致页面回流
// const NavBar = dynamic(() => import('@/components/NavBar'));

export interface LayoutProps {
  children: ReactNode;
}

const HomeLayout: NextPage<LayoutProps> = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);
  const hasMounted = useMounted();

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="h-72 md:h-96 relative  w-full bg-header">
        <div className="w-full bg-header h-14"></div>
        <NavBar color={'bg-header'} />
        <div
          className={classNames(
            styles['typing'],
            'w-full text-center text-xl m-auto mt-4 text-primary'
          )}
        >
          Show me the code.
        </div>
        <div className="w-full absolute -bottom-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 280"
            className="w-full"
          >
            <path
              fill={theme === 'dark' ? '#0E141B' : '#fff'}
              d="M0,256L1440,128L1440,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      {children}

      <Footer />
    </>
  );
};

export const getLayout = (page) => <HomeLayout>{page}</HomeLayout>;

export default HomeLayout;
