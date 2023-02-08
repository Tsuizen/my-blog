// ./components/Search/CustomHits.js
import Link from 'next/link';
import { connectStateResults, Snippet } from 'react-instantsearch-dom';

function Hits({ searchState, searchResults }) {
  const validQuery = searchState.query?.length >= 3;
  console.log(searchResults);
  return (
    <>
      {searchResults?.hits.length === 0 && validQuery && (
        <p>Aw snap! No search results were found.</p>
      )}
      {searchResults?.hits.length > 0 && validQuery && (
        <div className="rounded">
          {searchResults.hits.map((hit) => (
            <div
              key={hit.objectID}
              className="p-4 rounded-md m-4 bg-card hover:bg-info"
            >
              <Link href={hit.url}>
                <Snippet hit={hit} attribute="content" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default connectStateResults(Hits);
