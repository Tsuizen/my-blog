import Image from 'next/image';

const PostImage = ({ alt, src }) => {
  return (
    <Image
      className="w-full my-6"
      alt={alt}
      src={src}
      width={700}
      height={475}
      // sizes="100vw"
      // style={{
      //   width: '100%',
      //   height: 'auto'
      // }}
      quality={100}
      placeholder="blur"
      blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    ></Image>
  );
};

export default PostImage;
