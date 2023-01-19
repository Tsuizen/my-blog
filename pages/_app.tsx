import '@/styles/globals.css';
import 'normalize.css/normalize.css';

import type { AppPropsWithLayout } from 'next/app';
import dynamic from 'next/dynamic';
import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo';

import BackToTop from '@/components/BackToTop';
// import Footer from '@/components/Footer';
import SEO from '@/config/seo-config';

const Footer = dynamic(() => import('@/components/Footer'));

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <DefaultSeo {...SEO} />
      {/* 网站logo */}
      <LogoJsonLd
        logo="http://www.tsuizen.cn/images/logo.png"
        url="https://www.tsuizen.cn"
      />
      {/* 社交信息 */}
      <SocialProfileJsonLd
        type="Person"
        name="Tsuizen"
        url="http://www.tsuizen.cn"
        sameAs={['https://github.com/Tsuizen']}
      />

      {getLayout(<Component {...pageProps}></Component>)}
      <Footer />
      <BackToTop />
    </>
  );
}
