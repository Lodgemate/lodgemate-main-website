import React, { useState, useEffect } from "react";

interface ImageGalleryProps {
  LodgeData: {
    photos: string[]; // Assuming photos is an array of image URLs or paths
  };
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ LodgeData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % LodgeData.photos.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + LodgeData.photos.length) % LodgeData.photos.length
    );
  };

  return (
    <>
      <div
        className="flex gap-4 overflow-x-scroll scroll-smooth no-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {LodgeData.photos.map((image, index) => (
          <div key={index} className="flex-none">
            <img
              src={image}
              alt={`image ${index + 1}`}
              className="sm:h-[300px] h-[260px] w-[300px] cursor-pointer"
              onClick={() => openModal(index)}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={closeModal}
          >
            &times;
          </button>
          <button
            className="absolute left-4 text-white text-2xl"
            onClick={goToPrevious}
          >
            &#10094;
          </button>
          <div className="max-w-4xl">
            <img
              src={LodgeData.photos[currentIndex]}
              alt={`image ${currentIndex + 1}`}
              className="w-full h-auto"
            />
          </div>
          <button
            className="absolute right-4 text-white text-2xl"
            onClick={goToNext}
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
