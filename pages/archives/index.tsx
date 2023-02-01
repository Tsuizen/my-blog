import getYear from 'date-fns/getYear';
import { InferGetStaticPropsType, NextPageWithLayout } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import { getLayout } from '@/layout/Default';
import { getRecentPosts } from '@/lib/posts';
import { Post } from '@/types';

type ArchivePost = Pick<
  Post,
  'createdAt' | 'title' | 'slug' | 'subtitle' | 'description'
>;

export async function getStaticProps() {
  const posts = await getRecentPosts<ArchivePost>([
    'slug',
    'title',
    'createdAt',
    'subtitle',
    'description'
  ]);

  return {
    props: {
      posts
    }
  };
}

const Archives: NextPageWithLayout = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { posts } = props;

  return (
    <>
      <NextSeo title="归档 | Tsuizen's blog"></NextSeo>
      <div className="mx-auto w-4/5 md:w-1/2">
        {posts.map((post, index) => (
          <div key={index}>
            <div className="my-4 font-bold text-2xl text-primary">
              {(index === 0 ||
                getYear(new Date(post.createdAt!)) !==
                  getYear(new Date(posts[index - 1].createdAt!))) &&
                new Date(post.createdAt!).getFullYear()}
            </div>
            <div className="card w-full bg-card shadow-xl mb-6" key={index}>
              <div className="card-body">
                <div className="text-xl font-bold">
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </div>
                <div className="text-md text-gray-500 mb-4">
                  {post.subtitle}
                </div>
                <p>{post.description}</p>
                <div className="card-actions justify-end  hover:text-primary-focus">
                  <Link href={`/posts/${post.slug}`} className="text-primary">
                    阅读全文
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

Archives.getLayout = getLayout;

export default Archives;
