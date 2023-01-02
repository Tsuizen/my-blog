import classNames from 'classnames';

import { categories } from '../Config/config';

const Sider = ({ className }: { className: string }) => {
  return (
    <>
      <div className={classNames(className, 'my-10 mx-4 px-6 ')}>
        <div className="">
          <div className="text-lg text-accent font-bold">分类</div>
          <div>
            {categories.map((category) => (
              <button
                key={category.label}
                className="btn btn-sm btn-light p-2 m-1"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sider;
