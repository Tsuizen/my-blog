import '@/styles/globals.css';
import 'normalize.css/normalize.css';
import '@/styles/markdown.scss';
import 'instantsearch.css/themes/satellite.css';
import '@docsearch/css';

import { Analytics } from '@vercel/analytics/react';
import type { AppPropsWithLayout } from 'next/app';
import Head from 'next/head';
import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo';

import BackToTop from '@/components/BackToTop';
import ErrorBoundary from '@/components/ErrorBoundry';
import SEO from '@/config/seo-config';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
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
      <ErrorBoundary>
        {getLayout(<Component {...pageProps}></Component>)}
        <BackToTop />
        <Analytics />
      </ErrorBoundary>
    </>
  );
};

export default App;
