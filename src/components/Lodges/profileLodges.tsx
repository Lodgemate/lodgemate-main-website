import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  showDeleteModal,
  showFailedModal,
} from "@/lib/features/Modal/ModalSlice";
import { FetchApi } from "@/utils/Fetchdata";
import { Endpoints } from "@/services/Api/endpoints";
import EditLodgeModal from "@/app/profile/[id]/modals/EditLodgeModal";
import { Lodge } from "@/lib/Types";
import ShouldHide from "@/app/profile/[id]/ShouldHide";
import { selectToken } from "@/lib/features/Auth/tokenSlice";

interface ProductCardProps {
  id: any;
  type: string;
  name: string;
  address: string;
  university?: string;
  images: string[];
  price: number;
  imageUrl: string;
  location: string;
  nearbyUniversity?: string;
  product?: Lodge;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ id, imageUrl, name, address, nearbyUniversity, price, product }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [openEditLodges, setOpenEditLodges] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const parseToken = useAppSelector(selectToken);

    const formattedPrice = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);

    const dispatch = useAppDispatch();

    const handleDelete = async () => {
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

        if (res.status === "success") {
          setIsDeleted(true);
        } else {
          throw res;
        }
      } catch (error: any) {
        dispatch(showFailedModal(error.message));
      }
    };

    const togglePopup = () => {
      setIsPopupVisible(!isPopupVisible); // Toggle popup visibility
    };

    if (isDeleted) {
      return;
    }
    return (
      <div className="relative flex w-full flex-col rounded overflow-hidden">
        {openEditLodges && (
          <EditLodgeModal
            product={product}
            onClose={() => setOpenEditLodges(false)}
          />
        )}

        <div className="relative">
          <img
            className="w-full h-[244px] sm:h-[200px] rounded-[12px] object-cover"
            src={imageUrl}
            alt={name}
          />

          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223406/utilities/LodgeMate_File/Vector_aflwdv.png"
            alt="lodgemate"
            className="absolute top-2 left-2 text-xl hidden"
          />

          <div>
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719611975/utilities/LodgeMate_File/menu_cx8xja.svg"
              alt="Menu"
              className="absolute top-2 right-2 bg-white h-6 w-6 rounded-full text-xl cursor-pointer"
              onClick={togglePopup}
            />
          </div>

          {/* Popup */}
          {isPopupVisible && (
            <div className="absolute top-10 right-2 bg-white text-[14px] w-[120px] text-gray-700 shadow-md border rounded p-2 z-20">
              <button
                onClick={() => setIsPopupVisible(false)}
                className="text-sm flex justify-end w-full text-gray-500 hover:text-gray-700"
              >
                <img src="/icons/close.svg" alt="" />
              </button>
              <hr className="my-2" />

              <div
                onClick={() => setOpenEditLodges(true)}
                className="cursor-pointer hover:text-blue-500 flex items-center m gap-1"
              >
                {" "}
                <img src="/icons/pen_gray.svg" alt="" />
                Edit
              </div>
              <hr className="my-2" />

              <div
                onClick={() =>
                  dispatch(
                    showDeleteModal({
                      deleteFunction: handleDelete,
                      message: "Do you want to delete this Lodge?",
                    })
                  )
                }
                className="cursor-pointer text-red-500 flex items-center pb-2 gap-1"
              >
                <img src="/icons/delete.svg" alt="" />
                Delete
              </div>
            </div>
          )}

          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223205/utilities/LodgeMate_File/Indicators_psmeyv.svg"
            alt=""
            className="absolute bottom-4 right-[40%] text-xl"
          />

          <div className="absolute bottom-4 flex justify-between items-center w-full px-5"></div>
        </div>

        <div className="py-[15px] gap-y-2 flex flex-col justify-between">
          <div className="font-bold flex items-start">{name}</div>
          <p className="text-lgray text-[12px]">{address}</p>
          <div className="flex items-center mt-[4px] text-gray-600">
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
  }
);

export default ProductCard;
