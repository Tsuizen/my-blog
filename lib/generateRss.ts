import { writeFileSync } from 'fs';
import RSS from 'rss';

import { Post } from '@/types';

import { getRecentPosts } from './posts';

type RSSPost = Pick<Post, 'title' | 'createdAt' | 'description' | 'slug'> & {
  date: Date;
  url: string;
};

const getRSS = async () => {
  const siteUrl = process.env.SITE_URL;
  const allPosts = await getRecentPosts<RSSPost>([
    'title',
    'createdAt',
    'description',
    'slug'
  ]);

  const feed = new RSS({
    title: "Tsuizen's blog",
    description: '随便写东西的地方',
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    language: 'cn',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Tsuizen`
  });

  allPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `${siteUrl}/posts/${post.slug}`,
      date: post.date,
      description: post.description
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
};

export default getRSS;
