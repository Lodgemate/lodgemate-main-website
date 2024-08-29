import Link from 'next/link';
import React from 'react'

function Listalodge() {
  return (
    <div className="flex justify-center items-center w-full text-lblack text-[14px] pt-[50px] mb-[400px]">
      <div className="flex flex-col justify-center items-center gap-[32px] ">
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719874533/utilities/LodgeMate_File/Lodge_Illustration_t1wdwi.svg"
          alt="lodge"
          className=' -mb-[120px] -mt-[50px sm:h-[500px]'
        />
        <div>
          <h1 className="font-semibold text-[18px] text-center mb-[12px]">
            List your lodge
          </h1>
          <p className='text-center'>
            Lodgemate helps match you with people who are  looking to rent a
            lodge. Try it now!
          </p>
        </div>

        <Link
          href="/lodges/list_lodge/lodge_description"
          className=" bg-primary text-white w-fit px-[44px] py-[12px] rounded-[8px] "
        >
          List your lodge
        </Link>
      </div>
      
    </div>
  );
}

export default Listalodge
