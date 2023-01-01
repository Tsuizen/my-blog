/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { NextPageWithLayout } from 'next';
import { AppProps } from 'next/app';

declare module 'next' {
  type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

declare module 'next/app' {
  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };
}

declare global {
  var __db: any;
}
export {};
