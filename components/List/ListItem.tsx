import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { HiArrowSmRight } from 'react-icons/hi';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

import { ListContext } from './ListProvider';

const ListItem: React.FC<JSX.IntrinsicElements['li']> = (props) => {
  const { children, className = '', ...rest } = props;
  const { type } = useContext(ListContext);

  const childArr = useMemo(
    () => React.Children.map(children, (child) => child),
    [children]
  );
  const getMarker = {
    ul: () => (
      <span className="flex pt-[4px] pr-2">
        <HiArrowSmRight className="text-xl -ml-1 mr-1 text-primary" />
      </span>
    ),
    // ol 的 marker 样式在 markdown.scss 中设置
    ol: () => null,
    tl: () => (
      <span className="flex pt-[5px] pr-2 mr-[2px]">
        {/* @ts-ignore */}
        {childArr![0].props.checked ? (
          <ImCheckboxChecked className="text-xl -ml-1 mr-1 text-primary" />
        ) : (
          <ImCheckboxUnchecked className="text-xl -ml-1 mr-1 text-primary" />
        )}
      </span>
    )
  }[type];

  return (
    <li {...rest} className={classNames(className, 'flex items-start my-4')}>
      {getMarker()}
      <div className="flex-1">
        {type !== 'tl' ? children : childArr?.slice(2)}
      </div>
    </li>
  );
};

export default ListItem;
