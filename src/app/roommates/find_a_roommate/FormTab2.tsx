import React from 'react'

function FormTab2() {
  return (
    <div className='mb-[100px]'>
      <div className="pb-[16px] border-b">
        <label htmlFor="describeyou" className="font-bold mt-[32px]">
          Which best describes you?
        </label>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded-full border h-[18px] w-[18px]"></div>{" "}
          <p>I want someone to come live with me</p>{" "}
        </div>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded-full border h-[18px] w-[18px] flex justify-center items-center">
            <div className="bg-black h-[6px] w-[6px] rounded-full"></div>
          </div>{" "}
          <p>I want someone to come live with me</p>{" "}
        </div>
      </div>
      {/* What type of apartment are you looking to live in? */}
      <div className="pb-[16px] border-b">
        <label htmlFor="describeyou" className="font-bold mt-[32px]">
          What type of apartment are you looking to live in?{" "}
        </label>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded border h-[18px] w-[18px]"></div>{" "}
          <p>Self-contained</p>{" "}
        </div>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded border h-[18px] w-[18px]"></div> <p>Flat</p>{" "}
        </div>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded border h-[18px] w-[18px]"></div>{" "}
          <p>Single room</p>{" "}
        </div>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded border h-[18px] w-[18px]"></div>{" "}
          <p>Apartment</p>{" "}
        </div>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded border h-[18px] w-[18px] flex justify-center items-center">
            <div className="bg-black h-[6px] w-[6px] rounded-full"></div>
          </div>{" "}
          <p>Anyone avilable</p>{" "}
        </div>
      </div>
      {/* How do you want to live? */}
      <div className="pb-[16px] ">
        <label htmlFor="describeyou" className="font-bold mt-[32px]">
          How do you want to live?{" "}
        </label>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded-full border h-[18px] w-[18px]"></div>{" "}
          <p>I wan&apos;t to have my own room</p>{" "}
        </div>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded-full border h-[18px] w-[18px] flex justify-center items-center">
            <div className="bg-black h-[6px] w-[6px] rounded-full"></div>
          </div>{" "}
          <p>I can share 1 room</p>{" "}
        </div>
      </div>
    </div>
  );
}

export default FormTab2
