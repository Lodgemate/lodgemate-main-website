"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormTab1 from "./FormTab1";
import FormTab2 from "./FormTab2";
import FormTab3 from "./FormTab3";
import Link from "next/link";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  resetFormData,
  selectAllList_Listingdata,
} from "@/lib/features/Listing/ListingSlice";
import {
  showFailedModal,
  showLoadingModal,
  showSuccessfulModal,
} from "@/lib/features/Modal/ModalSlice";
import { selectToken } from "@/lib/features/Auth/tokenSlice";

function FindRoommate() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState(1);
  const formData = useAppSelector(selectAllList_Listingdata);
  const parseToken = useAppSelector(selectToken);

  useEffect(() => {
    dispatch(resetFormData());
  }, []);

  const handleNext = () => {
    if (currentTab < 3) setCurrentTab(currentTab + 1);
  };

  const handleBack = () => {
    if (currentTab > 1) setCurrentTab(currentTab - 1);
  };

  const tabHeadings = [
    "Tell us about yourself",
    "How you live...",
    "You’re done!",
  ];

  const handleListRoommates = async () => {
    dispatch(showLoadingModal("Posting Roommates"));
    console.log(Object.fromEntries(formData));

    // Ensure formData is of the correct type
    if (!(formData instanceof FormData)) {
      console.error("formData is not available or is not of type FormData");
      return;
    }

    const url = Endpoints.getPrivateRoommates;

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
      body: formData,
    };

    try {
      const res: any = await FetchApi(url, options);
      console.log(res);

      if (res.status === "success") {
        dispatch(showLoadingModal(null));
        dispatch(showSuccessfulModal(res.message));
        setTimeout(() => {
          dispatch(showSuccessfulModal(null));
          router.push("/");
        }, 500);
      } else {
        dispatch(showLoadingModal(null));
        throw res;
      }
    } catch (error: any) {
      dispatch(showLoadingModal(null));
      dispatch(showFailedModal(error.message));
      console.log(error);
    }
  };

  return (
    <div className="mt-[50px] text-[14px]">
      <div className="sm:grid sm:grid-cols-2">
        <div className="col-span-1 pt-[80px] bg-[#FAFAFA] hidden sm:block">
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-[18px] text-primary font-bold pb-[50px]">
              Couldn't find a roommate? No worries!
            </h1>
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718854899/utilities/LodgeMate_File/pana_hkebb5.svg"
              alt=""
            />
          </div>
        </div>

        <div className="col-span-1 sm:pt-[80px] pt-[40px]">
          <div className="flex justify-center items-center">
            <div className="sm:w-[500px] w-full text-lgray sm:border sm:h-screen no-scrollbar sm:overflow-auto">
              <div className="flex relative border-b justify-center w-full">
                <Link href="/" className=" absolute top-4 right-6">
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718851772/utilities/LodgeMate_File/Group_23_j5sjal.svg"
                    alt=""
                  />
                </Link>
                {currentTab === 2 && (
                  <button
                    onClick={handleBack}
                    className=" absolute top-3 left-4"
                  >
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719102154/utilities/LodgeMate_File/lucide_move-up_zjmfel.svg"
                      alt=""
                    />
                  </button>
                )}
                <h2 className="text-[16px] font-semibold text-center p-[10px]">
                  {tabHeadings[currentTab - 1]}
                </h2>
              </div>

              <div className="flex gap-2 items-center p-[20px] justify-center">
                <div
                  className={`w-[78px] h-[4px] rounded-full ${
                    currentTab === 1 ? "bg-lgray" : "bg-xgray"
                  }`}
                ></div>
                <div
                  className={`w-[78px] h-[4px] rounded-full ${
                    currentTab === 2 ? "bg-lgray" : "bg-xgray"
                  }`}
                ></div>
                <div
                  className={`w-[78px] h-[4px] rounded-full ${
                    currentTab === 3 ? "bg-lgray" : "bg-xgray"
                  }`}
                ></div>
              </div>

              <div className="px-4">
                {currentTab === 1 && <FormTab1 />}
                {currentTab === 2 && <FormTab2 />}
                {currentTab === 3 && <FormTab3 />}
              </div>

              <div className="px-4 flex gap-2 text-white">
                <button
                  className="bg-primary w-full py-[12px] mb-[24px] rounded-[8px]"
                  onClick={currentTab === 2 ? handleListRoommates : handleNext}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindRoommate;
