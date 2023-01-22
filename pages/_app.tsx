import '@/styles/globals.css';
import 'normalize.css/normalize.css';

import type { AppPropsWithLayout } from 'next/app';
import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo';

import BackToTop from '@/components/BackToTop';
import SEO from '@/config/seo-config';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <DefaultSeo {...SEO} />
      {/* 网站logo */}
      <LogoJsonLd
        logo="http://tsuizen.cn/images/logo.png"
        url="https://tsuizen.cn"
      />
      {/* 社交信息 */}
      <SocialProfileJsonLd
        type="Person"
        name="Tsuizen"
        url="http://tsuizen.cn"
        sameAs={['https://github.com/Tsuizen']}
      />

      {getLayout(<Component {...pageProps}></Component>)}
      <BackToTop />
    </>
  );
}
