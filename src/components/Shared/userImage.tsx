import React from "react";
import { useState } from "react";
import Image from "next/image";
import { getInitials } from "@/utils/utils";

interface userImageProps {
  src: string;
  fallbackText?: string;
  alt: string;
  size: any;
  onclick?: any
}
const UserImage: React.FC<userImageProps> = ({
  src,
  fallbackText,
  alt,
  size,
  onclick
}) => {
  const [hasError, setHasError] = useState(false);
  return (
    <div className='flex items-center' onClick={onclick}>
      {!hasError ? (
        <img
          src={src === 'default.png'? '/'+src : src}
          alt={alt}
          onError={() => setHasError(true)}
          width={16} // Adjust layout as needed
          height={16} // Adjust layout as needed
        //   objectFit='cover' // Adjust objectFit as needed
          className={`${size} border border-lblue rounded-full`}
        />
      ) : (
        <div
          className={`bg-lblue rounded-full flex justify-center text-white text- items-center ${size}`}
        >
          {fallbackText && getInitials(fallbackText)}
        </div>
      )}
    </div>
  );
};

export default UserImage;

// const MyComponent = () => (
//   <div>
//     <h1>Image with Fallback Example</h1>
//     <ImageWithFallback
//       src="/path/to/your/image.jpg"
//       fallbackSrc="/path/to/your/fallback-image.jpg"
//       alt="Description of the image"
//       width={500} // Adjust width
//       height={300} // Adjust height
//     />
//   </div>
// );
