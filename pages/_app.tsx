import '@/styles/globals.css';
import 'normalize.css/normalize.css';

import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
