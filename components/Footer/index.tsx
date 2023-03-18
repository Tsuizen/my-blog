import Image from 'next/image';

const Footer = () => {
  return (
    <>
      <footer className="footer footer-center py-10 text-base-content rounded">
        <div>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://github.com/Tsuizen"
              target={'_blank'}
              rel="noopener noreferrer"
            >
              <Image
                src="/images/github.svg"
                width={30}
                height={30}
                alt="github"
              />
            </a>
          </div>
        </div>
        <div>
          <p>Copyright © 2023 - All right reserved by Tsuizen</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
