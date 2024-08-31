 "use client";

import React, { useEffect, useState } from "react";
import Tab1Content from "./Tab1";
import Tab2Content from "./Tab2";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { resetFormData, selectAllList_Listingdata } from "@/lib/features/Listing/ListingSlice";
import { FetchApi } from "@/utils/Fetchdata";
import { Endpoints } from "@/services/Api/endpoints";
import {
  showFailedModal,
  showLoadingModal,
  showSuccessfulModal,
} from "@/lib/features/Modal/ModalSlice";
import { useRouter } from "next/navigation";

const LodgeDescription = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const formData =useAppSelector(selectAllList_Listingdata)

  const tabs = [
    { title: "Tab 1", content: <Tab1 /> },
    { title: "Tab 2", content: <Tab2 /> },
  ];

  
  useEffect(() => {
    dispatch(resetFormData());
  }, []);
  
  const nextTab = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const prevTab = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };
  const handleListServices= async()=>{
    dispatch(showLoadingModal("Posting Service"));
    const localStorageToken = localStorage.getItem("token");
    const parseToken =localStorageToken && JSON.parse(localStorageToken)
    console.log(parseToken)
    console.log(formData)
  console.log(Object.fromEntries(formData))
if (!(formData instanceof FormData)) {
  console.error('FormData is not available or is not of type FormData');
  return;
}
const body = {
 method: "PUT",
 headers: {
  Authorization: `Bearer ${parseToken}`,
 },
  body: formData,
};
     console.log ( "res")

     try {
       const res = FetchApi(Endpoints.getPrivateServices,body)
       const parsedRes: any = await res;
      if (parsedRes.status === "success") {
        dispatch(showLoadingModal(null));
        dispatch(showSuccessfulModal(parsedRes.message));
        setTimeout(() => {
          dispatch(showSuccessfulModal(null));
          router.push("/");
        }, 500);
       } else {
        dispatch(showLoadingModal(null));
        dispatch(showFailedModal(parsedRes.message));
      }
     } catch (error) {
      console.log (await error)
     }
  }
  return (
    <div className="flex w-full px-4 sm:px-[150px] min-h-screen text-[14px] mb-[50px] ">
      <div className="flex w-full flex-col">
        <div className=" mt-[100px] justify-center flex items-center w-full">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-button h-0 w-[42px] mx-2 rounded-full ${
                activeTab === index ? "bg-primary" : "bg-xgray"
              }`}
              onClick={() => setActiveTab(index)}
            ></button>
          ))}
        </div>
        <button
          onClick={prevTab}
          disabled={activeTab === 0}
          className="mt-[40px] mb-[20px] w-fit"
        >
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719102154/utilities/LodgeMate_File/lucide_move-up_zjmfel.svg"
            alt=""
          />
        </button>
        <div className="tab-content mb-[100px]">{tabs[activeTab].content}</div>
        <div className="flex justify-between sm:justify-center items-center">
          <button
            onClick={prevTab}
            disabled={activeTab === 0}
            className="sm:hidden flex items-center gap-2  "
          >
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719102154/utilities/LodgeMate_File/lucide_move-up_zjmfel.svg"
              alt="back"
            />
            Back
          </button>
          <button
            onClick={activeTab === 1 ?handleListServices:nextTab }
            // disabled={activeTab === tabs.length - 1}
            className="bg-primary text-white w-1/2 sm:w-[300px] h-[48px] rounded-[8px]"
          >
            {activeTab === 1 ? "List your service" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};



const Tab1 = () => (
  <div>
    <h2 className=" text-[16px] text-lblack">
      Upload quality images of your service. <br /> A minimum of (5) images is
      required.
    </h2>
    <form>
      <Tab1Content />
    </form>
  </div>
);

const Tab2 = () => (
  <div>
    <h2 className=" text-[16px] text-lblack">
      Almost done. Fill in these details.
    </h2>
    <form>
      <Tab2Content />
    </form>
  </div>
);

export default LodgeDescription;
