import React from "react";
import UniversitySelect from "./UniversitySelect";
import ChooseHobbies from "./ChooseHobbies";
import ContactInfo from "./ContactInfo";

function FormTab1() {
  return (
    <form className="flex flex-col items-center justify-center w-full text-[16px]">
      <div className="">
        <p>This information will help us match you with a roommate</p>{" "}
      </div>
      <div className="mt-[32px] mb-[24px]">
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718917696/utilities/LodgeMate_File/Profile_qzo5aq.svg"
          alt=""
        />
      </div>{" "}
      <div className="flex gap-2 text-[16px]">
        <input type="checkbox" name="usepicture" id="" />
        <label htmlFor="usepicture">Use my picture</label>
      </div>
      <div className="mt-[32px] flex-col flex w-full">
        <div className="flex flex-col w-full mb-[25px]">
          <label htmlFor="name" className="font-bold">
            Enter your public name?
          </label>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Enter a name that you want people to see"
            className="flex w-full py-[12px] px-[16px] border rounded-[8px] mt-[12px] focus:outline-none appearance-none"
          />
        </div>
        <div className="flex flex-col w-full mb-[25px]">
          <label htmlFor="name" className="font-bold">
            Which school is nearest to you?{" "}
          </label>

          <UniversitySelect />
        </div>
        <div className="flex flex-col w-full mb-[25px]">
          <label htmlFor="name" className="font-bold">
            Describe who you&apos;re looking for{" "}
          </label>
          <textarea
            name="name"
            id=""
            placeholder="I'm looking for a quiet and respectful roommate who values a peaceful and clean living environment. Ideally, they should be considerate, responsible, and friendly to ensure a harmonious and positive household."
            className=" no-scrollbar h-[164px] flex w-full  py-[12px] px-[16px] border rounded-[8px] mt-[12px] focus:outline-none appearance-none"
          />
              </div>
              
              <ChooseHobbies />
              <ContactInfo />
      </div>
    </form>
  );
}

export default FormTab1;
