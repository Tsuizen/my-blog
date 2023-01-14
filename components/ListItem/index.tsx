import Link from 'next/link';
import { Key } from 'react';

interface Post {
  slug: Key;
  title: string;
  subtitle: string;
  description: string;
  createdAt: string;
}

const ListItem = ({ keyword, allPosts }) => {
  console.log(allPosts);
  return (
    <div className="mx-auto w-1/2" key={keyword}>
      <div className="my-4 font-bold text-2xl text-primary">
        #&nbsp;{keyword}
      </div>
      {allPosts.length &&
        allPosts.map((post: Post) => (
          <div className="card w-full bg-card shadow-xl mb-6" key={post.slug}>
            <div className="card-body">
              <div className="text-xl font-bold">{post.title}</div>
              <div className="text-md text-gray-500 mb-4">{post.subtitle}</div>
              <p>{post.description}</p>
              <div className="card-actions justify-end  hover:text-primary-focus">
                <Link href={`/posts/${post.slug}`} className="text-primary">
                  阅读全文
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListItem;
