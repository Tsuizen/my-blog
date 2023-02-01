import '@/styles/globals.css';
import 'normalize.css/normalize.css';
import '@/styles/markdown.scss';

import type { AppPropsWithLayout } from 'next/app';
import Head from 'next/head';
import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo';

import BackToTop from '@/components/BackToTop';
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
        logo="http://blog.tsuizen.cn/images/logo.png"
        url="https://blog.tsuizen.cn"
      />
      {/* 社交信息 */}
      <SocialProfileJsonLd
        type="Person"
        name="Tsuizen"
        url="http://blog.tsuizen.cn"
        sameAs={['https://github.com/Tsuizen']}
      />

      {getLayout(<Component {...pageProps}></Component>)}
      <BackToTop />
    </>
  );
}
