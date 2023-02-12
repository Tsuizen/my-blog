import classNames from 'classnames';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

export interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[];
  className: string;
}

// eslint-disable-next-line no-undef
function useIntersectionObserver(ids: string[], setActiveId) {
  const elements = Array.from(ids.map((id) => document.getElementById(id)));
  // 用useRef存储数据更新后页面不重渲染
  const headingsRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (headings) => {
        headingsRef.current = headings.reduce((map, heading) => {
          map[heading.target.id] = heading;
          return map;
        }, headingsRef.current);

        const visibleHeadings: IntersectionObserverEntry[] = [];

        Object.keys(headingsRef.current).forEach((key) => {
          const headingElement = headingsRef.current[key];
          if (headingElement.isIntersecting)
            visibleHeadings.push(headingElement);
        });

        visibleHeadings.length > 0 && setActiveId(visibleHeadings[0].target.id);
      },
      {
        // -100px是给header留出的距离
        rootMargin: '-100px 0px 0px 0px'
      }
    );

    elements.forEach((element) => observer.observe(element!));
  }, [setActiveId, elements]);
}

const TableOfContent: React.FC<TableOfContentsProps> = (props) => {
  const { headings, className } = props;
  const [activeId, setActiveId] = useState<string>();

  useIntersectionObserver(
    headings.map(({ id }) => id),
    setActiveId
  );

  return (
    <aside className={className}>
      <div className="text-md font-bold mb-2">目录</div>
      <ul className="list-none pl-0">
        {headings.length > 0 &&
          headings.map((heading) => (
            <li key={heading.id}>
              <Link
                href={`#${heading.id}`}
                className={classNames(
                  {
                    '!text-primary border-primary': activeId === heading.id
                  },
                  'block p-2 hover:text-primary text-sm overflow-y-auto'
                )}
                style={{ paddingLeft: `${(heading.level - 1) / 2}rem` }}
                // 页面平滑滚动
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${heading.id}`)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                {heading.text}
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default TableOfContent;
