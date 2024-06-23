import React from 'react'

function FormTab3() {
  return (
    <div className="mb-[200px]">
      <div className="flex justify-center items-center flex-col gap-[25px] mt-[60px] ">
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719102661/utilities/LodgeMate_File/Vector_jr3bep.svg"
          alt=""
        />
        <h2 className="text-[20px] font-bold text-primary ">
          Request successful
        </h2>
        <p className='text-center'>
          Your request for a roommate has been posted. You can undo the request
          or continue browsing potential roomies.
        </p>
      </div>
    </div>
  );
}

export default FormTab3
