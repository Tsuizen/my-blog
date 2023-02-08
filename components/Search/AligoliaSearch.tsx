import algoliasearch from 'algoliasearch/lite';
import { FC, useRef } from 'react';
import {
  Configure,
  InstantSearch,
  PoweredBy,
  SearchBox
} from 'react-instantsearch-dom';

import Mask from '../Mask';
import Customhits from './Customhits';

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
const algoliaClientKey = process.env.NEXT_PUBLIC_ALGOLIA_APP_KEY as string;

const searchClient = algoliasearch(algoliaAppId, algoliaClientKey);

export type AlgoliaSearchProps = {
  show: boolean;
  toggleShow: any;
};

// TODO: 节流搜索、搜索粒度调整
const AlgoliaSearch: FC<AlgoliaSearchProps> = ({ show, toggleShow }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {show && (
        <Mask
          show={show}
          toggleShow={toggleShow}
          className="bg-opacity-40 backdrop-filter backdrop-blur-lg"
        >
          <div className="w-60 md:w-96" ref={targetRef}>
            <InstantSearch indexName="tsuizen" searchClient={searchClient}>
              <Configure attributesToSnippet={['content:15']} hitsPerPage={5} />
              <SearchBox />
              {/* <Hits hitComponent={HitComponent} /> */}
              <Customhits />
              <PoweredBy />
            </InstantSearch>
          </div>
        </Mask>
      )}
    </>
  );
};

export default AlgoliaSearch;
