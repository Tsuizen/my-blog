import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">首页</Link>
            </li>
            <li tabIndex={0}>
              <Link href="#" className="justify-between">
                归档
              </Link>
            </li>
            <li>
              <Link href="#">标签</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">
          Tsuizen&apos;s blog;
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">首页</Link>
          </li>
          <li tabIndex={0}>
            <Link href="#">归档</Link>
          </li>
          <li>
            <Link href="#">标签</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <Image src="/dark.svg" alt="夜间模式" width={24} height={24} />
        </button>
        <button className="btn btn-ghost btn-circle">
          <Image src="/rss.svg" alt="rss" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
