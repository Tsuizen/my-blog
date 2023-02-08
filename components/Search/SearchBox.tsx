import { useClickAway } from 'ahooks';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';

import { SearchPosts } from '@/pages/api/search';
import request from '@/service/request';

const SearchBox: React.FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [results, setResults] = useState<SearchPosts[]>([]);

  const handleChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      request
        .get(`/api/search?q=${query}`)
        .then((res) => res.data)
        .then((res) => {
          setResults(res.result);
        });
    }
  }, []);

  const handleFocus = useCallback(() => {
    setActive(true);
  }, []);

  useClickAway(() => {
    setActive(false);
  }, searchRef);

  return (
    <div className="hidden md:block relative" ref={searchRef}>
      <input
        className="input input-bordered input-info w-32 max-w-sm h-6"
        type="text"
        onFocus={handleFocus}
        onChange={handleChange}
      />
      {active && results?.length ? (
        <ul className="absolute w-40 overflow-hidden rounded -left-10 top-4">
          {results.map((result) => (
            <li
              key={result.slug}
              className="my-1 p-1 rounded-md border-solid border-accent bg-card left-10"
            >
              <Link
                href={`/posts/${result.slug}`}
                className="hover:text-primary text-post"
              >
                {result.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default SearchBox;
