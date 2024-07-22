'use client'
import React from "react";
import Blurbg from "./Blurbg";
import { FaXmark } from "react-icons/fa6";
import { selectAllfailedModalMssg } from "@/lib/features/Modal/ModalSlice";
import { useAppSelector } from "@/lib/hooks";

const Failed = () => {
  const failedStatus = useAppSelector(selectAllfailedModalMssg);
  return (
    <>
      {failedStatus && (
        <Blurbg>
          <div className='w-screeen p-5 rounded-lg flex flex-col items-center min-w-[300px] bg-white h-fit'>
            <div className=' border-green-500 border-2 rounded-full mb-4'>
              <FaXmark className=' text-6xl m-5 text-green-500' />
            </div>
            <p className=' text-center font-medium text-slate-800'>
              {failedStatus}
            </p>
          </div>
        </Blurbg>
      )}
    </>
  );
};

export default Failed;
