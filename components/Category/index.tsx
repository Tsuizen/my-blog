import classNames from 'classnames';

import { categories } from '../Config/config';

const Category = ({ className }: { className: string }) => {
  return (
    <>
      <div className={classNames(className, 'mb-10 mx-4 px-6')}>
        <div className="text-lg text-purple-500 font-bold">分类</div>
        <div className="mt-2">
          {categories.map((category) => (
            <button
              key={category.label}
              className="btn btn-sm btn-light p-2 m-2"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
