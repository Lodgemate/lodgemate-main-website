// @ts-nocheck

import { Service } from "@/lib/Types";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface EditServiceModalProps {
  onClose: () => void;
  product?: Service
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({product, onClose }) => {
  const [images, setImages] = useState(product?.photos); // Replace with actual image paths
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    newImages:[],
    serviceName: product?.serviceName,
    // location: product?.serviceName,
    price: product?.maxPrice,
    description: product?.description,
    negotiable: false,
    previousPhotosUrls:[]
  });
console.log(images)
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
  console.log(images?.length)
  const handleRemoveImage = () => {
  console.log("imgSrc")


    const imgSrc = document.getElementById('myImage')?.src;
  console.log(imgSrc)
  const newArr= images?.filter((ent)=>ent !== imgSrc)
 console.log(newArr)
 console.log(newArr?.length)
   setImages(newArr)
    setFormData({...formData,previousPhotosUrls: [...formData.previousPhotosUrls, imgSrc]})
  
 
  };
  console.log(formData)
  console.log(product?.id)

  const handleSaveChanges = () => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    const form = new FormData();
      //@ts-ignore
    form.append("serviceName", formData.serviceName);
    // form.append("location", formData.location);
      //@ts-ignore
    form.append("price", formData.price);
      //@ts-ignore
    form.append("serviceDescription", formData.description);
    // form.append("negotiable", formData.negotiable.toString());
    // form.append("accommodationType", formData.accommodationType);

    formData.newImages.forEach((image) => form.append("photos", image));
    formData.previousPhotosUrls && formData.previousPhotosUrls.forEach((image) => form.append("previousPhotosUrls[]", image));


    const submitLidge=async()=>{
      const url = `${Endpoints.getPrivateServicesbyId}${product?._id}`
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
          <h2 className="text-xl font-semibold">Edit Service listing</h2>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto max-h-[70vh]">
          {/* Image Carousel */}
          <div className="relative mb-4">
            <img
            id="myImage"
              src={images[currentIndex]}
              alt="Service"
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

          {/* Service Name */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter name of Service
            </label>
            <input
              type="text"
              placeholder="Elite Services"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          

          {/* Service Location */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter location of Service
            </label>
            <input
              type="text"
              placeholder="14 Cross Avenue, Owerri, Imo State"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Service Price */}
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

          {/* Service Description */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter Service description
            </label>
            <textarea
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows={3}
            />
          </div>

         
         
        </div>

        <div className="p-4 border-t">
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" onClick={handleSaveChanges}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditServiceModal;
