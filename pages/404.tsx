import Link from 'next/link';
import { BsArrowUpLeft } from 'react-icons/bs';

const Custom404 = () => {
  return (
    <>
      <div className="bg-black w-screen h-screen">
        <div className="mx-auto w-fit top-1/3 relative text-gray-50">
          <div className="text-6xl md:text-9xl">Not Found</div>
          <div className="text-4xl md:text-6xl">There is nothing.</div>
          <div className="py-10 text-2xl text-yellow-400">
            <BsArrowUpLeft />
            <Link href="/" className="text-yellow-400 pl-4">
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;
