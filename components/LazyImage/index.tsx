import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  alt?: string;
  className?: string;
  placeholder?: string;
  threshold?: number;
}

export default function LazyImage(props: Props) {
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

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : placeholder}
      alt={alt}
      className={className}
    />
  );
}
