import type { NextPage } from 'next';
import type { ReactNode } from 'react';

import Footer from '../Footer';
import Header from '../Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
