"use client"
import Image from 'next/image'
import React from 'react'
import Blurbg from './Blurbg';
import { useAppSelector } from '@/lib/hooks';
import { selectAllloadingModalMssg } from '@/lib/features/Modal/ModalSlice';
const LogoLoader = () => {
const loadingStatus= useAppSelector(selectAllloadingModalMssg)
  return (
    <>
    {
      loadingStatus && (
        <Blurbg>
        <div className='w-screeen p-5 rounded-lg flex flex-col items-center  bg-white h-fit'>
          <div className='spinner mb-4'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <Image
            src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961632/utilities/LodgeMate_File/Vector_15_oyrjmn.svg'
            height={28}
            width={160}
            alt='account'
            className='animate-pulse '
          />
          <p className=' text-center font-medium text-slate-800'>{loadingStatus}</p>
        </div>
      </Blurbg>
      )
    }
    </>
  
  );
}

export default LogoLoader