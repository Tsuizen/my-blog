import '@/styles/globals.css';
import 'normalize.css/normalize.css';

import type { AppPropsWithLayout } from 'next/app';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps}></Component>);
}
