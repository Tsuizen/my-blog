import type { NextPage } from 'next';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

import { LayoutProps } from '../Home';

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar style={'bg-base-100'} />
      {children}
      <Footer />
    </>
  );
};

export const getLayout = (page) => <Layout>{page}</Layout>;

export default Layout;
