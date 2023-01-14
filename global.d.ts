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

interface Post {
  readMins: number;
  words: number;
  content: string;
  headings: string;
  filename: string;
  featureImage: string;
  featureVideo: string;
  sourceLink: string;
  scripts: string;
  demoLink: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  sort: number;
  category: any;
  categorySlug: string;
  chapter: string;
  i18n: string;
}
export {};
