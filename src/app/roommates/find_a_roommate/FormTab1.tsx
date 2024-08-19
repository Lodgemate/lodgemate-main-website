import React, { useState } from "react";
import UniversitySelect from "./UniversitySelect";
import ChooseHobbies from "./ChooseHobbies";
import ContactInfo from "./ContactInfo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectAllList_imagesUrl, selectAllList_Listingdata, setImagesUrl, setStateItem } from "@/lib/features/Listing/ListingSlice";

function FormTab1() {
  const dispatch = useAppDispatch();
  const data =useAppSelector(selectAllList_Listingdata)
  const imagePlaceholder =useAppSelector(selectAllList_imagesUrl)
  const hasKeypreferredRoommateDescription = data.has('preferredRoommateDescription');
  const extractedpreferredRoommateDescription = hasKeypreferredRoommateDescription && data.get('preferredRoommateDescription') || null
  const [preferredRoommateDescription, setpreferredRoommateDescription] = useState<any>(extractedpreferredRoommateDescription && extractedpreferredRoommateDescription || null);
  const [placeholder, setplaceholder] = useState(imagePlaceholder[0])
  const handleChangeRoommateDesc= (param : string)=>{
    setpreferredRoommateDescription(param)
    dispatch(setStateItem({ key: "preferredRoommateDescription", value: param }));
  }

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
      const newImage = URL.createObjectURL(event.target.files[0]);
      const parsedImg=[newImage]
      setplaceholder(newImage)
      dispatch(setImagesUrl(parsedImg))
      dispatch(setStateItem({key: 'profilePicture', value:event.target.files[0]}))
    }
  };


  return (
    <form className='flex flex-col items-center justify-center w-full text-[16px]'>
      <div className=''>
        <p>This information will help us match you with a roommate</p>{" "}
      </div>
      <div className='mt-[32px] mb-[24px]'>


        
      <label
              className="flex items-center justify-center w-full bg-gray-900 rounded-full overflow-hidden max-w-[120px] h-[120px] cursor-pointer"
              htmlFor={`file-input-${"index"}`}
            >
              <input
                id={`file-input-${"index"}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
                className="hidden"
              />
              {placeholder ? (
                <img
                  src={placeholder}
                  alt='profilephoto'
                  className="object-cover max-w-[120px] h-[120px] "
                />
              ) : (
                <img
                  src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718917696/utilities/LodgeMate_File/Profile_qzo5aq.svg'
                  alt=''
                  className="w-full"
                />
              )}
            </label>
      </div>{" "}
      <div className='flex gap-2 text-[16px]'>
        <input type='checkbox' name='usepicture' id='' />
        <label htmlFor='usepicture'>Use my picture</label>
      </div>
      <div className='mt-[32px] flex-col flex w-full'>
        {/* <div className='flex flex-col w-full mb-[25px]'>
          <label htmlFor='name' className='font-bold'>
            Enter your public name?
          </label>
          <input
            type='text'
            name='name'
            id=''
            placeholder='Enter a name that you want people to see'
            className='flex w-full py-[12px] px-[16px] border rounded-[8px] mt-[12px] focus:outline-none appearance-none'
          />
        </div>
        <div className='flex flex-col w-full mb-[25px]'>
          <label htmlFor='name' className='font-bold'>
            Which school is nearest to you?{" "}
          </label>

          <UniversitySelect />
        </div>
        <div className='flex flex-col w-full mb-[25px]'>
          <label htmlFor='name' className='font-bold'>
            Describe who you&apos;re looking for{" "}
          </label>
          <textarea
            name='name'
            id=''
            placeholder="I'm looking for a quiet and respectful roommate who values a peaceful and clean living environment. Ideally, they should be considerate, responsible, and friendly to ensure a harmonious and positive household."
            className=' no-scrollbar h-[164px] flex w-full  py-[12px] px-[16px] border rounded-[8px] mt-[12px] focus:outline-none appearance-none'
          />
        </div> */}

        <ChooseHobbies />
        {/* <ContactInfo /> */}
        {/* preferredRoommateDescription */}
        <div className="py-[16px] ">
        <label htmlFor="describeyou" className="font-bold mt-[32px]">
        Whats Prefered Roommate Description?{" "}
        </label>
        <div className="relative">
          <input
          type="text"
          placeholder="Enter Your Prefered Roommate Description"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e)=>handleChangeRoommateDesc(e.target.value)}
          value={preferredRoommateDescription}
        />
        </div>
      </div>
      </div>
    </form>
  );
}

export default FormTab1;
