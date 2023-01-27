import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Post } from '@/types';

interface Props {
  posts: Post[];
  className?: string;
  page?: string;
}

const RecentPosts = ({ posts, className, page }: Props) => {
  const [recentPosts, setRecentPosts] = useState<{
    posts: Post[];
  }>({
    posts: posts
  });

  useEffect(() => {
    setRecentPosts({ posts });
  }, [posts]);

  return (
    <>
      <section
        className={classNames(className, 'flex flex-wrap max-w-screen-sm mb-4')}
      >
        {page === 'index' ? (
          <div className="mx-4 px-6 text-lg text-purple-400 font-bold">
            最近更新
          </div>
        ) : (
          ''
        )}
        {recentPosts.posts.map((post) => (
          <div
            key={post.slug}
            className="w-full mx-4 block md:overflow-hidden md:flex md:flex-wrap mt-8"
          >
            <div className=" bg-base-100 px-6 z-[1] md:w-full">
              <h3 className="text-lg mb-2 lg:text-2xl">
                <Link
                  href={`/posts/${post.slug!}/`}
                  passHref
                  className="hover:text-primary"
                >
                  {post.title}
                </Link>
              </h3>
              {post.subtitle ? (
                <div className="text-gray-500 font-bold">{post.subtitle}</div>
              ) : (
                ''
              )}
              <span className="w-1/4 border-b-2 border-primary inline-block mt-2"></span>
              <div className="text-sm mb-4 lg:text-base mt-0">
                <Link href={`/posts/${post.slug!}/`} className="text-gray-500">
                  {post.description}
                </Link>
              </div>
              <div className="text-gray-500 flex items-center text-sm">
                <span>{post.createdAt}</span>
                <span className="ml-2">
                  <Link
                    className="hover:text-primary"
                    href={`/posts/${post.slug!}/`}
                  >
                    阅读更多
                  </Link>
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentPosts;
