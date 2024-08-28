import React, { useState } from "react";

interface EditLodgeModalProps {
  onClose: () => void;
}

const EditLodgeModal: React.FC<EditLodgeModalProps> = ({ onClose }) => {
  const [images, setImages] = useState(["/image1.jpg", "/image2.jpg"]); // Replace with actual image paths
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Edit lodge listing</h2>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto max-h-[70vh]">
          {/* Image Carousel */}
          <div className="relative mb-4">
            <img
              src={images[currentIndex]}
              alt="Lodge"
              className="w-full h-64 object-cover rounded-md"
            />
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              ◀
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              ▶
            </button>
          </div>

          {/* Add more images */}
          <button className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 py-2 rounded-md hover:bg-gray-50">
            + Add more
          </button>

          {/* Lodge Name */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter name of lodge
            </label>
            <input
              type="text"
              placeholder="Elite lodges"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Lodge Location */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter location of lodge
            </label>
            <input
              type="text"
              placeholder="14 Cross Avenue, Owerri, Imo State"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Lodge Price */}
          <div className="mt-4 flex items-center">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Enter a price
              </label>
              <input
                type="text"
                placeholder="₦170,000"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="ml-4 flex items-center">
              <input
                type="checkbox"
                id="negotiable"
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <label
                htmlFor="negotiable"
                className="ml-2 block text-sm text-gray-700"
              >
                Mark as negotiable
              </label>
            </div>
          </div>

          {/* Lodge Description */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter lodge description
            </label>
            <textarea
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows={3}
            />
          </div>

          {/* Accommodation Type */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Which of this best describes the accommodation?
            </label>
            <div className="mt-2 flex space-x-2">
              <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md">
                Self-contained
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md">
                Apartment
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md">
                Flat
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md">
                Single room
              </button>
            </div>
          </div>

          {/* Room Number */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              How many rooms are there?
            </label>
            <div className="mt-2 flex flex-wrap space-x-2">
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                1 room
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                2 rooms
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                3 rooms
              </button>
              <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md mb-2">
                4 rooms
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                5 rooms
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                6 rooms
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                7 rooms
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                8 rooms
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                9 rooms
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                10+ rooms
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Please select only the features your accommodation has.
            </label>
            <div className="mt-2 flex flex-wrap space-x-2">
              <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md mb-2">
                Water
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                Water heater
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                Security
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                Parking space
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                Recreation center
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                WiFi
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                Proximity to school
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                Provision shop
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mb-2">
                Electricity
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLodgeModal;
