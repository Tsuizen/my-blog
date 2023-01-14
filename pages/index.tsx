import classnames from 'classnames';
import { InferGetStaticPropsType, NextPageWithLayout } from 'next';

import Category from '@/components/Category';
import { getLayout } from '@/components/Layout/Home';
import RecentPosts from '@/components/RecentPosts';
import Tag from '@/components/Tag';
import { getAllPosts } from '@/utils/posts';

import style from './index.module.scss';

// 获取首页数据
async function getRecentPosts() {
  const sortPost = getAllPosts([
    'slug',
    'title',
    'createdAt',
    'subtitle',
    'description'
  ]);
  return sortPost;
}

export async function getStaticProps() {
  const posts = await getRecentPosts();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
}

const Home: NextPageWithLayout = ({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <main
        className={classnames(
          style['container'],
          'md:w-4/5 md:grid m-auto break-all pt-10 items-start'
        )}
      >
        <RecentPosts posts={posts} className={style.content} page="index" />
        <Category className={style.category} />
        <Tag className={style.popular} />
      </main>
    </>
  );
};

Home.getLayout = getLayout;

export default Home;
