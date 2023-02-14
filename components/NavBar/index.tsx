import classNames from 'classnames';
import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { FiRss } from 'react-icons/fi';

import useMounted from '@/hooks/useMounted';
// import useToggle from '@/hooks/useToggle';
import { useThemeStore } from '@/store/store';

import Search from '../Search/DocSerach';

const NavBar = ({ style }) => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  // const [showSearch, toggleShowSearch] = useToggle(false);

  const hasMounted = useMounted();

  // 首次进入时根据localStorage切换主题
  useEffect(() => {
    toggleTheme(theme);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const handleToggleTheme = () => {
    toggleTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div
      className={classNames(
        style,
        'flex flex-wrap md:navbar md:flex-nowrap  px-0 sticky top-0 box-border z-10 text-post'
      )}
    >
      <div className="flex items-center w-full md:navbar-start md:justify-center">
        <Link
          className="btn btn-ghost normal-case text-xl hover:bg-opacity-0 text-primary"
          href="/"
        >
          Tsuizen&apos;s blog
        </Link>
      </div>

      <div className="flex  md:navbar-center ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/" className="hover:bg-opacity-0">
              首页
            </Link>
          </li>
          <li tabIndex={0}>
            <Link href="/archives" className="hover:bg-opacity-0">
              归档
            </Link>
          </li>
          <li>
            <Link href="/tag" className="hover:bg-opacity-0">
              标签
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center m-auto md:navbar-end mr-4">
        <Search />
        {/* <button
          onClick={toggleShowSearch}
          className="btn btn-ghost btn-circle hover:bg-opacity-0 text-[28px]"
        ></button> */}
        <label className="swap swap-rotate mx-4">
          <input
            type="checkbox"
            defaultChecked={theme === 'light'}
            onClick={handleToggleTheme}
          />
          <Image
            src="/images/sun.svg"
            alt="light"
            width={22}
            height={22}
            className="swap-on md:w-6 md:h-6"
          />
          <Image
            src="/images/moon.svg"
            alt="dark"
            width={22}
            height={22}
            className="swap-off md:w-6 md:h-6"
          />
        </label>
        <Link href={'/feed.xml'} target="_blank" className="ml-2">
          <FiRss
            className={classnames(
              theme === 'light' ? 'text-[#2c2c2c]' : 'text-white',
              ' text-[26px]'
            )}
          ></FiRss>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
