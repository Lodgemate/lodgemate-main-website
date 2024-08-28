"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Tab1Content from "./Tab1";
import Tab2Content from "./Tab2";
import Tab3Content from "./Tab3";
import Tab4Content from "./Tab4";
import Tab5Content from "./Tab5";
import { FetchApi } from "@/utils/Fetchdata";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectAllList_Listingdata } from "@/lib/features/Listing/ListingSlice";
import { Endpoints } from "@/services/Api/endpoints";
import {
  showFailedModal,
  showLoadingModal,
  showSuccessfulModal,
} from "@/lib/features/Modal/ModalSlice";

const LodgeTabs = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const formData = useAppSelector(selectAllList_Listingdata);
  const tabs = [
    { title: "Tab 1", content: <Tab1 /> },
    { title: "Tab 2", content: <Tab2 /> },
    { title: "Tab 3", content: <Tab3 /> },
    { title: "Tab 4", content: <Tab4 /> },
    { title: "Tab 5", content: <Tab5 /> },
  ];

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

  const handleListLodges = async () => {
    dispatch(showLoadingModal("Posting Lodge"));
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    // console.log(Object.fromEntries(formData));
    if (!(formData instanceof FormData)) {
      console.error("FormData is not available or is not of type FormData");
      return;
    }
    const body = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
      body: formData,
    };
    console.log("res");

    try {
      const res = FetchApi(Endpoints.getPrivateLodges, body);
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
      console.log(await error);
    }
  };
  // make an unorderd list for err
  return (
    <div className="flex w-full flex-col">
      <div className=" mt-[100px] justify-center flex items-center w-full">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button h-2 w-[42px] mx-2 rounded-full ${
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
      <div className="flex sm:justify-center justify-between items-center">
        <button
          onClick={prevTab}
          disabled={activeTab === 0}
          className="sm:hidden flex items-center gap-2 text-[14px]"
        >
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719102154/utilities/LodgeMate_File/lucide_move-up_zjmfel.svg"
            alt="back"
          />
          Back
        </button>
        <button
          onClick={activeTab === 4 ? handleListLodges : nextTab}
          // disabled={activeTab ===  1 || activeTab > 4}
          className="bg-primary text-white text-[14px] w-1/2 sm:w-[300px] h-[48px] rounded-[8px]"
        >
          {activeTab === 4 ? "List your lodge" : "Next"}
        </button>
      </div>
    </div>
  );
};

const Tab1 = () => (
  <div>
    <h2 className=' text-[16px] text-lblack'>
      Which of this best describes the accommodation?
    </h2>
    <form>
      <Tab1Content />
    </form>
  </div>
);

const Tab2 = () => (
  <div>
    <h2 className=' text-[16px] text-lblack'>How many room are has it?</h2>
    <form>
      <Tab2Content />
    </form>
  </div>
);

const Tab3 = () => (
  <div>
    <h2 className=' text-[16px] text-lblack'>
      Please select only the features your accommodation has.
    </h2>
    <form>
      <Tab3Content />
    </form>
  </div>
);

const Tab4 = () => (
  <div>
    <h2 className=' text-[16px] text-lblack'>
      Let people see what your lodge looks like. <br /> Upload a minimum of (5)
      image
    </h2>
    <form>
      <Tab4Content />
    </form>
  </div>
);

const Tab5 = () => (
  <div>
    <h2 className=' text-[16px] text-lblack'>
      Almost done. Fill in these details.
    </h2>
    <form>
      <Tab5Content />
    </form>
  </div>
);

export default LodgeTabs;
