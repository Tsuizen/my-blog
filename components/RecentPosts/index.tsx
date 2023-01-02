import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface Post {
  id?: number;
  i18n?: string;
  slug?: string;
  layout?: string;
  category?: string;
  categorySlug?: string;
  chapter?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  scripts?: string;
  headings?: string;
  content?: string;
  readMins?: number;
  words?: number;
  author?: string;
  tags?: string;
  featureImage?: string;
  featureImageWidth?: number;
  featureImageHeight?: number;
  featureVideo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function RecentPosts({ posts, className }) {
  const [recentPosts, setRecentPosts] = useState<{
    posts: Post[];
  }>({
    posts: posts
  });

  useEffect(() => {
    posts.subtitle = '副标题';
    setRecentPosts({ posts });
  }, [posts]);

  return (
    <>
      <section
        className={classNames(
          className,
          'flex flex-wrap text-gray-600 max-w-screen-sm my-10'
        )}
      >
        <div className="mx-4 px-6 text-lg text-accent font-bold">最近更新</div>
        {recentPosts.posts.map((post) => (
          <div
            key={post.slug}
            className="w-full mx-4 block md:overflow-hidden md:flex md:flex-wrap mt-8"
          >
            <div className="bg-white px-6 z-[1] md:w-full">
              <h3 className="text-lg mb-2 lg:text-2xl  ">
                <Link
                  href={`/posts/${encodeURIComponent(post.slug!)}/`}
                  passHref
                  className="text-gray-800 hover:text-primary-focus"
                >
                  {post.title}
                </Link>
              </h3>
              {post.subtitle ? (
                <div className="text-gray-600">{post.subtitle}</div>
              ) : (
                ''
              )}
              <span className="w-1/4 border-b-2 border-primary inline-block mt-2"></span>
              <div className="text-sm mb-4 lg:text-base mt-0">
                <Link
                  href={`/posts/${encodeURIComponent(post.slug!)}/`}
                  className="text-gray-600"
                >
                  {post.description}
                </Link>
              </div>
              <div className="text-gray-500 flex items-center text-sm">
                <span className="">{post.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
