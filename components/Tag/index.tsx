import classNames from 'classnames';
import Link from 'next/link';

import { TAGS } from '../../config';

const Tag = ({ className }: { className: string }) => {
  return (
    <div className={classNames(className, 'mx-4 px-6 sticky top-20')}>
      <div className="text-lg text-purple-400 font-bold">热门标签</div>
      <div className="mt-6">
        {TAGS.map((tag) => (
          <span key={tag.label} className="inline-block m-2">
            <Link
              href={`/tag/${tag.label}`}
              className="text-md text-base-content font-bold hover:text-primary"
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
