import { DocSearch } from '@docsearch/react';

const Search = () => {
  const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
  const algoliaClientKey = process.env.NEXT_PUBLIC_ALGOLIA_APP_KEY as string;

  return (
    <div className="hidden md:block">
      <DocSearch
        apiKey={algoliaClientKey}
        appId={algoliaAppId}
        indexName="tsuizen"
      ></DocSearch>
    </div>
  );
};

export default Search;
