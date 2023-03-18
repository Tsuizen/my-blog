import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  alt?: string;
  className?: string;
  placeholder?: string;
  threshold?: number;
}

const LazyImage = (props: Props) => {
  const { src, alt, className, placeholder, threshold = 0 } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > threshold) {
            setIsLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // 还没研究Nextjs怎么给不支持原生懒加载的浏览器polyfill
  return 'loading' in HTMLImageElement.prototype ? (
    <Image src={src} alt={alt!} className={className}></Image>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={isLoaded ? src : placeholder}
      alt={alt}
      className={className}
    />
  );
};

export default LazyImage;
