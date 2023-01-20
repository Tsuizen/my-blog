import '@/styles/globals.css';
import 'normalize.css/normalize.css';

import type { AppPropsWithLayout } from 'next/app';
import Head from 'next/head';
import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo';

import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import SEO from '@/config/seo-config';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
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
