// @ts-nocheck
"use client";
import { Lodge } from "@/lib/Types";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import React, { useState } from "react";
import { FaTrash, FaXmark } from "react-icons/fa6";


interface EditLodgeModalProps {
  product?: Lodge;
  onClose: () => void;
}

const EditLodgeModal: React.FC<EditLodgeModalProps> = ({product, onClose }) => {
  const [images, setImages] = useState(product?.photos); // Replace with actual image paths
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    newImages:[],
    lodgeName: product?.lodgeName,
    // location: product?.lodgeName,
    price: product?.price,
    description: product?.lodgeDescription,
    negotiable: false,
    accommodationType: 'others',
    roomNumber: product?.numberOfRooms,
    features: product?.lodgeFeatures,
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNewImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
      const newImage = URL.createObjectURL(event.target.files[0]);
      //@ts-ignore
      const newImages = [newImage, ...images];
      setImages(newImages)
      //@ts-ignore
      setFormData({...formData, newImages: [...formData.newImages, event.target.files[0] ] });

    }
  };

  const handleRemoveImage = () => {
    const imgSrc = document.getElementById('myImage')?.src;
    setFormData({...formData,previousPhotosUrls: [...formData.previousPhotosUrls, imgSrc]})
    const newArr= images?.filter((ent)=>ent !== imgSrc)
    setImages(newArr)
  };
  console.log(formData)
  console.log(product?.id)

  const handleSaveChanges = () => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    const form = new FormData();
      //@ts-ignore
    form.append("lodgeName", formData.lodgeName);
    // form.append("location", formData.location);
      //@ts-ignore
    form.append("price", formData.price);
      //@ts-ignore
    form.append("lodgeDescription", formData.description);
    // form.append("negotiable", formData.negotiable.toString());
    // form.append("accommodationType", formData.accommodationType);
    form.append("numberOfRooms", formData.roomNumber);
     formData.features.forEach((feature) => form.append("lodgeFeatures[]", feature));
    formData.newImages.forEach((image) => form.append("photos", image));
    formData.previousPhotosUrls && formData.previousPhotosUrls.forEach((image) => form.append("previousPhotosUrls[]", image));

    // Submit the form data to the backend or handle it as needed
    console.log([...form.entries()]);
    console.log(formData);
    const submitLidge=async()=>{
      const url = `${Endpoints.getPrivateLodgesbyId}${product?._id}`
      console.log(url)
      const option={
        method:"PATCH",
        headers: {
          
          Authorization: `Bearer ${parseToken}`,
        },
        body: form
      }

      const res = await FetchApi(url,option)
      console.log(res)
    }
    submitLidge()
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
            id="myImage"
              src={images[currentIndex]}
              alt="Lodge"
              className="w-full h-64 object-cover rounded-md"
            />
              <button onClick={handleRemoveImage} className=" absolute top-0 text-5xl right-0 font-sans text-red-500 border border-red-500 rounded-full">
                <FaXmark/>
              </button>
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
          <label className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 py-2 rounded-md hover:bg-gray-50">
            + Add more
            <input
                // id={`file-input-${index}`}
                type="file"
                accept="image/*"
                onChange={handleNewImageUpload}
                className="hidden"
              />
          </label>

          {/* Lodge Name */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter name of lodge
            </label>
            <input
              type="text"
              name="lodgeName"
              value={formData.lodgeName}
              onChange={handleInputChange}
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
              name="location"
              value={formData.location}
              onChange={handleInputChange}
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
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="₦170,000"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="ml-4 flex items-center">
              <input
                type="checkbox"
                id="negotiable"
                name="negotiable"
                checked={formData.negotiable}
                onChange={handleInputChange}
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
              name="description"
              value={formData.description}
              onChange={handleInputChange}
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
              {["Self-contained", "Apartment", "Flat", "Single room"].map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, accommodationType: type })}
                    className={`px-4 py-2 rounded-md ${
                      formData.accommodationType === type
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Room Number */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              How many rooms are there?
            </label>
            <div className="mt-2 flex flex-wrap space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "10+"].map((num) => (
                <button
                  key={num}
                  onClick={() => setFormData({ ...formData, roomNumber: `${num} rooms` })}
                  className={`px-4 py-2 rounded-md mb-2 ${
                    formData.roomNumber === `${num} rooms`
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {num} room{num !== 1 && "s"}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Please select only the features your accommodation has.
            </label>
            <div className="mt-2 flex flex-wrap space-x-2">
              {[
                "Water",
                "Water heater",
                "Security",
                "Parking space",
                "Recreation center",
                "WiFi",
                "Proximity to school",
                "Provision shop",
                "Electricity",
              ].map((feature) => (
                <button
                  key={feature}
                  onClick={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      features: prevData?.features?.includes(feature)
                        ? prevData.features.filter((f) => f !== feature)
                        : [...prevData.features, feature],
                    }));
                  }}
                  className={`px-4 py-2 rounded-md mb-2 ${
                    formData.features?.includes(feature)
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleSaveChanges}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLodgeModal;
