import Fuse from 'fuse.js';
import { NextApiRequest, NextApiResponse } from 'next';

import { posts } from '@/cache/data';
// import { getRecentPosts } from '@/lib/posts';
import { Post } from '@/types';

export type SearchPosts = Pick<
  Post,
  'slug' | 'title' | 'subtitle' | 'tags' | 'description' | 'category'
>;

const Search = async (req: NextApiRequest, res: NextApiResponse) => {
  const { q } = req.query;
  // const posts = await getRecentPosts<SearchPosts>([
  //   'title',
  //   'slug',
  //   'tags',
  //   'category',
  //   'subtitle',
  //   'description'
  // ]);

  const options = {
    includeScore: true,
    includeMatches: true,
    ignoreLocation: true,
    minMatchCharLength: 2,
    keys: ['tags', 'title']
  };

  const fuse = new Fuse(posts, options);

  const result = fuse.search(q as string).map(({ item }) => item);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    code: 0,
    msg: '',
    result: result || []
  });
};

export default Search;
