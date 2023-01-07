import type { NextPage } from 'next';
import { ReactNode, useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { useThemeStore } from '@/store/store';

export interface LayoutProps {
  children: ReactNode;
}

const HomeLayout: NextPage<LayoutProps> = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);

  // SSG 页面初始会给build时的html，rehydrate不会重新渲染页面，通过useEffect在页面mounted后再更新页面
  // https://www.joshwcomeau.com/react/the-perils-of-rehydration/#some-problematic-code-1
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="h-52 md:h-72 relative  w-full bg-light">
        <div className="w-full bg-light h-10"></div>
        <NavBar color="bg-light"></NavBar>
        <div className="w-full absolute -bottom-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 290"
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
