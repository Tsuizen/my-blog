import classNames from 'classnames';
import Link from 'next/link';

import { CATEGORIES } from '../../config';

const Category = ({ className }: { className: string }) => {
  return (
    <>
      <div className={classNames(className, 'mb-10 mx-4 px-6')}>
        <div className="text-lg text-purple-400 font-bold">分类</div>
        <div className="mt-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.label}
              className="btn btn-sm btn-light p-2 m-2"
            >
              <Link href={`/category/${category.label}`}>{category.label}</Link>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
