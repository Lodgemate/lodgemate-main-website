'use client'
import React from "react";
import { FaCheckDouble } from "react-icons/fa6";
import Blurbg from "./Blurbg";
import { selectAllsuccessModalMssg } from "@/lib/features/Modal/ModalSlice";
import { useAppSelector } from "@/lib/hooks";
const Aproved = () => {
  const successStatus = useAppSelector(selectAllsuccessModalMssg);
  return (
    <>
      {successStatus && (
        <Blurbg>
          <div className='w-screeen p-5 rounded-lg flex flex-col items-center min-w-[300px] bg-white h-fit'>
            <div className=' border-green-500 border-2 rounded-full mb-4'>
              <FaCheckDouble className=' text-6xl m-5 text-green-500' />
            </div>
            <p className=' text-center font-medium text-slate-800'>
              {successStatus}
            </p>
          </div>
        </Blurbg>
      )}
    </>
  );
};

export default Aproved;
