import React, { useState } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { IoPencil } from "react-icons/io5";
import { useAppDispatch } from '@/lib/hooks';
import { showDeleteModal, showFailedModal } from '@/lib/features/Modal/ModalSlice';
import { FetchApi } from '@/utils/Fetchdata';
import { Endpoints } from '@/services/Api/endpoints';
import EditLodgeModal from '@/app/profile/[id]/modals/EditLodgeModal';
import { Lodge } from '@/lib/Types';
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
    product?: Lodge;
  }

const ProductCard: React.FC<ProductCardProps> = React.memo(({
    id,
    imageUrl,
    name,
    location,
    nearbyUniversity,
    price,
    product
  }) => {
  const [isDeleted, setIsDeleted] = useState(false)
  const [OpenEditLodges, setOpenEditLodges] = useState(false)

    const reset = {
      deleteFunction: null,
      message: "",
    };
    const formattedPrice = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
    const dispatch = useAppDispatch();

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
          Endpoints.getPrivateLodgesbyId + id,
          body
        );

        console.log(res);
        if (res.status === "success") {
          dispatch(showDeleteModal(reset));
          setIsDeleted(true)
        } else {
          throw res;
        }
      } catch (error: any) {
        dispatch(showFailedModal(error.message));
      }
    };
 const handleIpenlodgeedit=()=>{
  setOpenEditLodges(true)
 }
    const deleteProps ={
      deleteFunction: handleDelete,
      message: "Do you want to delete this Lodge"
    }

  if (isDeleted) {
    return;
  }
    return (
      <div className="flex w-full flex-col rounded overflow-hidden ">
    {OpenEditLodges && <EditLodgeModal product ={product} onClose={()=>setOpenEditLodges(false)}/>}

        <button className="relative">
          <div className="w-full h-[244px] sm:h-[200px] rounded-[12px]">
            <img
              className="w-full h-[244px] sm:h-[200px] rounded-[12px] object-cover"
              src={imageUrl}
              alt={name}
            />
          </div>

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
            <IoPencil onClick={handleIpenlodgeedit} className=" bg-slate-800 p-1 rounded-full text-slate-50 z-20 text-2xl font-bold hover:text-slate-100 cursor-pointer" />
            <RiDeleteBinLine
              onClick={() => dispatch(showDeleteModal(deleteProps))}
              className="  bg-slate-800 p-1 rounded-full text-slate-50 z-20 text-2xl font-bold hover:text-slate-100 cursor-pointer"
            />
          </div>
        </button>
        <div className="py-[15px] gap-y-2 flex flex-col justify-between ">
          <div className="font-bold tflex items-start">{name}</div>
          <p className="text-lgray text-[12px]">{location}</p>
          <div className="flex items-center mt-[4px text-gray-600">
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
              alt=""
              className="mr-2"
            />
            <p className="text-[12px]">
              <span>{nearbyUniversity}</span>
            </p>
          </div>
          <p className="text-dgray text-[14px] font-semibold mt-1">
            {formattedPrice}/yr
          </p>
        </div>
      </div>
    );
  });

export default ProductCard