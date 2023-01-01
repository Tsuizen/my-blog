import Image from 'next/image';
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

export function RecentPosts({ posts }) {
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
      <section className="flex flex-wrap text-gray-600 max-w-screen-sm my-10 mx-6">
        {recentPosts.posts.map((post) => (
          <div
            key={post.slug}
            className="bg-gray-100 w-full mx-4 block md:overflow-hidden md:flex md:flex-wrap my-4"
          >
            <div className="md:w-full md:h-52 transform transition-transform ease-in-out duration-500 hover:scale-110">
              <Link href={`/posts/${encodeURIComponent(post.slug!)}/`}>
                <Image
                  className="object-cover"
                  fill
                  src={post.featureImage!}
                  title={post.title}
                  alt="feature image"
                />
              </Link>
            </div>
            <div className="bg-white p-6 z-[1] shadow-md md:w-full md:p-8">
              <h3 className="text-lg mb-2 lg:text-2xl mt-2 ">
                <Link
                  href={`/posts/${encodeURIComponent(post.slug!)}/`}
                  passHref
                  className="text-gray-600"
                >
                  {post.title}
                </Link>
              </h3>
              <span className="w-1/4 border-b-2 border-primary inline-block mt-2"></span>
              <div className="text-sm mb-4 lg:text-base mt-0">
                {post.description}
              </div>
              <div className="text-gray-400 flex items-center text-sm">
                <svg
                  className="w-3 h-3 mr-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="calendar-alt"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                  ></path>
                </svg>
                <span className="">{post.createdAt}</span>
                <span className="text-primary text-sm inline-block ml-2">
                  <Link
                    className="hover:text-blue-500"
                    href={`/category/${encodeURIComponent(
                      post.categorySlug!
                    )}/`}
                    passHref
                  >
                    {post.category}
                  </Link>
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
