import React, { useState, useEffect } from "react";
import AOS from "aos";


interface WriteReviewProps {
  show: boolean;
  onClose: () => void;
}

const WriteReview: React.FC<WriteReviewProps> = ({ show, onClose }) => {
  const [starSources, setStarSources] = useState<string[]>([
    "/icons/star_black.svg",
    "/icons/star_black.svg",
    "/icons/star_black.svg",
    "/icons/star_black.svg",
    "/icons/star_black.svg",
  ]);

     useEffect(() => {
       AOS.init({
         duration: 1000,
       });
     }, []);
    
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  const handleStarClick = (index: number) => {
    const newStarSources = starSources.map((src, i) =>
      i <= index ? "/icons/star_gold.svg" : "/icons/star_black.svg"
    );
    setStarSources(newStarSources);
  };

  if (!show) {
    return null;
    }
    
    

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start pt-[100px]  justify-center"
      onClick={onClose}
    >
          <div
              
        className="bg-white p-6 rounded-[12px]  shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
              data-aos="zoom-in-up"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <div className="mb-4">
          <div className="flex gap-2">
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1720745689/utilities/LodgeMate_File/Img_jccfin.svg"
              alt=""
            />
            <div>
              <h1 className="font-semibold">McGreggor</h1>
              <p>05/05/23</p>
            </div>
          </div>
        </div>
        <div className="text-gray-700">
          <div className="flex w-full justify-center gap-3">
            {starSources.map((src, index) => (
              <img
                key={index}
                src={src}
                alt=""
                onClick={() => handleStarClick(index)}
                className="cursor-pointer"
              />
            ))}
          </div>
          <textarea
            name="review"
            placeholder="Write something here..."
            className="border w-[350px] sm:w-[700px] resize-none mt-4 h-24 p-2 rounded-lg outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
