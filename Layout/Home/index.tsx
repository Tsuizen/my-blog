import type { NextPage } from 'next';
import { ReactNode } from 'react';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import useMounted from '@/hooks/useMounted';
import { useThemeStore } from '@/store/store';

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
      <div className="h-52 md:h-72 relative  w-full bg-header">
        <div className="w-full bg-header h-10"></div>
        <NavBar color={'bg-header'} />
        <div className="w-full absolute -bottom-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 280"
            className="w-full"
          >
            <path
              fill={theme === 'light' ? '#fff' : '#0E141B'}
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
