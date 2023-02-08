import algoliasearch from 'algoliasearch/lite';
import Link from 'next/link';
import { FC } from 'react';
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  PoweredBy,
  SearchBox,
  Snippet
} from 'react-instantsearch-hooks-web';

import Mask from '../Mask';

// import { algoliaAppId, algoliaClientKey } from '../../../utils/constants';
// import Mask from '../Mask';

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
const algoliaClientKey = process.env.NEXT_PUBLIC_ALGOLIA_APP_KEY as string;

const searchClient = algoliasearch(algoliaAppId, algoliaClientKey);

export type AlgoliaSearchProps = {
  show: boolean;
  toggleShow: any;
};

const HitComponent = ({ hit }) => {
  return (
    <div className="flex flex-col">
      <div className="text-lg ellipsis-2">
        <Link as={`/posts/${hit.slug}`} href="/posts/[slug]">
          <Highlight attribute="title" hit={hit} />
        </Link>
      </div>

      <div className="text-gray-400 text-sm ellipsis-4">
        <Snippet hit={hit} attribute="content" />
      </div>
    </div>
  );
};

// TODO: 节流搜索、搜索粒度调整
const AlgoliaSearch: FC<AlgoliaSearchProps> = ({ show, toggleShow }) => {
  return (
    <>
      {show && (
        <Mask
          show={show}
          toggleShow={toggleShow}
          className="bg-opacity-40 backdrop-filter backdrop-blur-lg"
        >
          <div className="w-96">
            <InstantSearch indexName="tsuizen" searchClient={searchClient}>
              <Configure attributesToSnippet={['content:100']} />
              <SearchBox />
              <Hits hitComponent={HitComponent} />
              <PoweredBy />
            </InstantSearch>
          </div>
        </Mask>
      )}
    </>
  );
};

export default AlgoliaSearch;
