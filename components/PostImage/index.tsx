import Image from 'next/image';

const PostImage = ({ alt, src, width, height }) => {
  return (
    <Image
      alt={alt}
      src={`${src}`}
      width={width}
      height={height}
      quality={70}
    />
  );
};

export default PostImage;
