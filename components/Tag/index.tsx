import classNames from 'classnames';
import Link from 'next/link';

import { tags } from '../../Config/config';

const Tag = ({ className }: { className: string }) => {
  return (
    <div className={classNames(className, 'mx-4 px-6 sticky top-20')}>
      <div className="text-lg text-purple-500 font-bold">标签</div>
      <div className="mt-6">
        {tags.map((tag) => (
          <span key={tag.label} className="inline-block m-2">
            <Link
              href={`/tags/${tag.tagSlug}`}
              className="text-md text-tag font-bold hover:text-primary"
            >
              #{tag.label}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tag;
