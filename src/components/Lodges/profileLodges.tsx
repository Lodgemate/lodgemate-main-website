import React from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { IoPencil } from "react-icons/io5";
import { useAppDispatch } from '@/lib/hooks';
import { showDeleteModal } from '@/lib/features/Modal/ModalSlice';
import { FetchApi } from '@/utils/Fetchdata';
import { Endpoints } from '@/services/Api/endpoints';
interface ProductCardProps {
    id: any;
    type: string;
    name: string;
    address: string;
    university?: string;
    images: string[];
    price: number; // Ensure this is always a number
    imageUrl: string;
    location: string;
    nearbyUniversity?: string;
  }

const ProductCard: React.FC<ProductCardProps> = React.memo(({
    id,
    imageUrl,
    name,
    location,
    nearbyUniversity,
    price,
  }) => {
    const formattedPrice = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
    const dispatch = useAppDispatch();
    console.log(id)
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
        const res = FetchApi(Endpoints.getPrivateLodgesbyId + id, body);
        console.log(await res);
      } catch (error) {}
    };

    const deleteProps ={
      deleteFunction: handleDelete,
      message: "Do you want to delete this Lodge"
    }
  
    return (
      <div className="max-w-sm rounded overflow-hidden ">
        <button className="relative">
          <img
            className="w-full h-[244px] sm:h-[200px] object-cover rounded-[12px]"
            src={imageUrl}
            alt={name}
          />
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223406/utilities/LodgeMate_File/Vector_aflwdv.png"
            alt="lodgemate"
            className="absolute top-2 left-2 text-xl"
          />
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719611975/utilities/LodgeMate_File/menu_cx8xja.svg"
            alt=""
            className="absolute top-2 right-2 bg-white h-6 w-6 rounded-full text-xl"
          />
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223205/utilities/LodgeMate_File/Indicators_psmeyv.svg"
            alt=""
            className="absolute bottom-4 right-[40%]  text-xl"
          />
          <div className="absolute bottom-4 flex justify-between items-center w-full px-5 ">
          <IoPencil className=' bg-slate-800 p-1 rounded-full text-slate-50 z-20 text-2xl font-bold hover:text-slate-100 cursor-pointer' />
          <RiDeleteBinLine onClick={()=> dispatch(showDeleteModal(deleteProps))} className='  bg-slate-800 p-1 rounded-full text-slate-50 z-20 text-2xl font-bold hover:text-slate-100 cursor-pointer'  />
          </div>
        </button>
        <div className="py-[15px] gap-y-2 flex flex-col justify-between ">
          <div className="font-bold text-[14px] flex items-start">
            {name}
            
          </div>
          <p className="text-lgray text-[13px]">{location}</p>
          <div className="flex items-center mt-[4px] text-gray-600">
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
              alt=""
              className="mr-2"
            />
            <p className="text-[13px]">
              <span>{nearbyUniversity}</span>
            </p>
          </div>
          <p className="text-dgray text-[15px] font-semibold mt-2">
            {formattedPrice}/yr
          </p>
          
        </div>
      </div>
    );
  });

export default ProductCard