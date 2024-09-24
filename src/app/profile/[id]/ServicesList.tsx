import { Service, ServiceApiResponse } from "@/lib/Types";
import React, { useState } from "react";
import EditServiceModal from "./modals/EditServicesModal";
import { IoPencil } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  showDeleteModal,
  showFailedModal,
} from "@/lib/features/Modal/ModalSlice";
import { useAppDispatch } from "@/lib/hooks";
import { FetchApi } from "@/utils/Fetchdata";
import { Endpoints } from "@/services/Api/endpoints";

// Sample data

interface ServiceCardProps {
  id?: any;
  type?: string;
  name?: string;
  address?: string;
  category?: string;
  images?: string[];
  price: number;
  imageUrl?: string;
  location: string;
  nearbyCategory?: string;
  products?: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  imageUrl,
  name,
  location,
  nearbyCategory,
  price,
  products,
}) => {
  
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State to handle popup visibility
  const [isDeleted, setIsDeleted] = useState(false);
  const [OpenEditService, setOpenEditService] = useState(false);
  const dispatch = useAppDispatch();

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);


  const reset = {
    deleteFunction: null,
    message: "",
  };

  const handleDelete = async () => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    const body = {
      method: "DELETE",
      headers: {
        "content-type": "Application-json",
        Authorization: `Bearer ${parseToken}`,
      },
    };
    try {
      const res: any = await FetchApi(
        Endpoints.getPrivateServicesbyId + id,
        body
      );

      console.log(res);
      if (res.status === "success") {
        dispatch(showDeleteModal(reset));
        setIsDeleted(true);
      } else {
        throw res;
      }
    } catch (error: any) {
      dispatch(showFailedModal(error.message));
    }
  };

  const handleIpenlodgeedit = () => {
    setOpenEditService(true);
  };

  const deleteProps = {
    deleteFunction: handleDelete,
    message: "Do you want to delete this Service",
  };

  if (isDeleted) {
    return;
  }
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible); // Toggle popup visibility
  };

  return (
    <div className='max-w-sm rounded overflow-hidden'>
      {OpenEditService && (
        <EditServiceModal
          product={products}
          onClose={() => setOpenEditService(false)}
        />
      )}

      <button className='relative '>
        <img
          className='sm:w-[500px] w-[240pc] h-[244px] sm:h-[200px]  rounded-[12px]'
          src={imageUrl}
          alt={name}
        />
        <img
          src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223406/utilities/LodgeMate_File/Vector_aflwdv.png'
          alt='lodgemate'
          className='absolute top-2 left-2 text-xl hidden'
        />
        {/* Menu icon with popup */}
        <img
          src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719611975/utilities/LodgeMate_File/menu_cx8xja.svg'
          alt='Menu'
          className='absolute top-2 right-2 bg-white h-6 w-6 rounded-full text-xl cursor-pointer'
          onClick={togglePopup}
        />
        <div className='absolute bottom-4 flex justify-between items-center w-full px-5 '>
          <IoPencil
            onClick={handleIpenlodgeedit}
            className=' bg-slate-800 p-1 rounded-full text-slate-50 z-20 text-2xl font-bold hover:text-slate-100 cursor-pointer'
          />
          <RiDeleteBinLine
            onClick={() => dispatch(showDeleteModal(deleteProps))}
            className='  bg-slate-800 p-1 rounded-full text-slate-50 z-20 text-2xl font-bold hover:text-slate-100 cursor-pointer'
          />
        </div>
        {/* Additional icons or overlays can be added here */}
      </button>
      <div className='py-[15px]'>
        <div className='font-bold text-[14px] flex items-start'>{name}</div>
        <p className='text-lgray text-[13px]'>
          I offer electrical rewiring services with lorem ipsum dolor sit amet,
          consectetur dolor sit amet, consectetudolor sit amet add
        </p>
        <div className='flex items-center mt-[4px] text-gray-600'>
          <img
            src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg'
            alt=''
            className='mr-2'
          />
          <p className='text-[13px]'>{nearbyCategory}</p>
        </div>
        <p className='text-dgray text-[15px] font-semibold mt-2'>
          {formattedPrice}
        </p>
      </div>
    </div>
  );
};
interface serviceListedProps {
  data: ServiceApiResponse | null;
}

const ServicesListed: React.FC<serviceListedProps> = ({ data }) => {
  console.log(data);
  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
        {data?.status === "success" &&
          data?.data.services.slice(0, 9).map((service) => (
            <ServiceCard
              products={service}
              key={String(service._id)}
              id={service._id}
              // type={service.t}
              name={service.serviceName}
              address={service.address_text}
              // category={service.serviceCategories}
              images={service.photos}
              price={service.maxPrice}
              imageUrl={service.coverphoto}
              location={service.address_text}
              // nearbyCategory={service.nearbyCategory}
            />
          ))}
      </div>
    </div>
  );
};

export default ServicesListed;
