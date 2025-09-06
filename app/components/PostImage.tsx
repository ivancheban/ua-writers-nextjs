'use client';

import { useState } from 'react';

// Define the properties our component will accept
interface PostImageProps {
  src: string;
  alt: string;
  className: string;
  fallbackSrc: string;
}

export default function PostImage({ src, alt, className, fallbackSrc }: PostImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  // We are using a standard <img> tag here.
  // The linter might suggest using Next.js's <Image> component, but for simplicity, we'll stick with this.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        // If an error occurs loading the src, we switch to the fallback source
        setImgSrc(fallbackSrc);
      }}
    />
  );
}