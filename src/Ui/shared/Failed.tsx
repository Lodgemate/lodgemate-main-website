"use client";
import React from "react";
import Blurbg from "./Blurbg";
import { FaXmark } from "react-icons/fa6";
import {
  selectAllfailedModalMssg,
  showFailedModal,
} from "@/lib/features/Modal/ModalSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

const Failed = () => {
  const dispatch = useAppDispatch();
  const failedStatus = useAppSelector(selectAllfailedModalMssg);
  return (
    <>
      {failedStatus && (
        <Blurbg>
          <div className="w-screeen p-5 rounded-lg flex flex-col items-center min-w-[300px] bg-white h-fit relative">
            <div className=" border-red-500 border-2 rounded-full mb-4">
              <FaXmark className=" text-6xl m-5 text-red-500" />
            </div>
            <p className=" text-center text-[14px] font-medium text-slate-800">
              {failedStatus}
            </p>
            <p
              onClick={() => dispatch(showFailedModal(null))}
              className=" cursor-pointer m-1 text-black text-[14px] absolute z-50 top-1 right-4 "
            >
Close            </p>
          </div>
        </Blurbg>
      )}
    </>
  );
};

export default Failed;
