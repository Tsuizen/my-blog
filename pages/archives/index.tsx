import { InferGetStaticPropsType, NextPageWithLayout } from 'next';
import Link from 'next/link';

import { getLayout } from '@/components/Layout/Post';
import prisma from '@/utils/prisma';

interface Post {
  createdAt: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
}

interface AllPost {
  year: string;
  posts: Post[];
}

const getYear = async () => {
  const db = prisma;
  const allDate = await db.posts.findMany({
    select: {
      createdAt: true
    },
    orderBy: [{ createdAt: 'desc' }]
  });

  const years: string[] = [];

  for (let date of allDate) {
    years.push(new Date(date.createdAt).getFullYear().toString());
  }
  return [...new Set(years)];
};

export async function getStaticProps() {
  const db = prisma;
  const posts: Post[][] = [];
  const years = await getYear();

  for (const year of years) {
    const postByYear = await db.posts.findMany({
      where: {
        createdAt: {
          gte: year + '-01-01',
          lte: year + '-12-31'
        }
      },
      orderBy: [{ createdAt: 'desc' }],
      select: {
        title: true,
        description: true,
        subtitle: true,
        createdAt: true,
        slug: true
      }
    });
    posts.push(postByYear);
  }

  return {
    props: {
      posts: JSON.stringify(posts)
    }
  };
}

const Archives: NextPageWithLayout = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const allPosts: AllPost[] = JSON.parse(props.posts).map((postByYear) => ({
    year: new Date(postByYear[0].createdAt).getFullYear(),
    posts: postByYear
  }));

  return (
    <>
      <div>
        {allPosts.map((postsByYear) => {
          return (
            <div key={postsByYear.year} className="mx-auto w-1/2">
              <div className="my-4 font-bold text-2xl text-primary">
                #&nbsp;{postsByYear.year}
              </div>
              {postsByYear.posts.map((post) => (
                <div
                  className="card w-full bg-card shadow-xl mb-6"
                  key={post.slug}
                >
                  <div className="card-body">
                    <div className="text-xl font-bold">{post.title}</div>
                    <div className="text-md text-gray-500 mb-4">
                      {post.subtitle}
                    </div>
                    <p>{post.description}</p>
                    <div className="card-actions justify-end  hover:text-primary-focus">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="text-primary"
                      >
                        阅读全文
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

Archives.getLayout = getLayout;

export default Archives;
