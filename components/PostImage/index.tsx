import Image from 'next/image';

const PostImage = ({ alt, src }) => {
  return (
    <span className=" text-center block">
      <Image
        className="my-6 mx-auto"
        alt={alt}
        src={src}
        width={600}
        height={400}
        // sizes="100vw"
        // style={{
        //   width: '100%',
        //   height: 'auto'
        // }}
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      ></Image>
    </span>
  );
};

export default PostImage;
