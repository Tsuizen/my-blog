import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function RecentPosts({ posts }) {
  const [recentPosts, setRecentPosts] = useState({
    posts: posts,
    hasMore: true
  });

  useEffect(() => {
    setRecentPosts(posts);
  }, [posts]);

  // const fetchMoreData = () => {
  //   fetch('/api/recentposts', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       lastSlug: recentPosts.posts[recentPosts.posts.length - 1].slug || '',
  //       count: recentPosts.posts.length || 0
  //     })
  //   })
  //     .then((response) => response.json())
  //     .then(function (resp) {
  //       if (resp && resp.success && resp.posts && resp.posts.length > 0) {
  //         setRecentPosts({
  //           ...recentPosts,
  //           posts: recentPosts.posts.concat(resp.posts)
  //         });
  //       } else {
  //         setRecentPosts({
  //           ...recentPosts,
  //           hasMore: false
  //         });
  //       }
  //     });
  // };

  return (
    <>
      <div className="text-center pt-24 pb-16 text-gray-600">
        <h2 className="text-5xl md:text-6xl">最新文章</h2>
      </div>

      <section className="flex flex-wrap text-gray-600 max-w-screen-lg mx-auto mb-10">
        {recentPosts.posts.map((v) => (
          <div
            key={v.slug}
            className="bg-gray-100 w-full mb-10 mx-4 block md:overflow-hidden md:flex"
          >
            <div className="md:w-1/2 transform transition-transform ease-in-out duration-500 hover:scale-110">
              <Link href={`/${encodeURIComponent(v.slug)}/`}>
                <Image
                  src={v.featureImage}
                  title={v.title}
                  width={100}
                  height={100}
                  alt="feature image"
                />
              </Link>
            </div>
            <div className="bg-white p-6 z-[1] shadow-md md:w-1/2 md:p-8 md:my-6 md:-ml-8">
              <span className="text-primary text-sm bg-gray-200 rounded-sm px-2 py-1 mb-4 inline-block lg:text-base">
                <Link
                  href={`/category/${encodeURIComponent(v.categorySlug)}/`}
                  passHref
                >
                  {v.category}
                </Link>
              </span>
              <h3 className="text-lg mb-2 lg:text-2xl">
                <Link href={`/${encodeURIComponent(v.slug)}/`} passHref>
                  {v.title}
                </Link>
              </h3>
              <span className="w-1/4 mb-4 border-b-2 border-primary inline-block"></span>
              <div className="text-sm mb-4 lg:text-base">{v.description}</div>
              <div className="text-xs text-gray-400 flex items-center">
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
                <span className="">{v.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
