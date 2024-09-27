import { showFailedModal } from "@/lib/features/Modal/ModalSlice";
import {
  selectAllUsersdata,
  setUserData,
} from "@/lib/features/Users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ApiResponse } from "@/lib/Types";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

interface EditProfileModalProps {
  currentUser: ApiResponse | null;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectAllUsersdata);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [formData, setformData] = useState({
    profilePicture: currentUser?.data.user.profilePicture,
    firstName: currentUser?.data.user.firstName,
    lastName: currentUser?.data.user.lastName,
    bio: currentUser?.data.user.bio,
    contact: {
      linkedin: currentUser?.data.user.contact?.linkedin,
      whatsapp: currentUser?.data.user.contact?.whatsapp,
      instagram: currentUser?.data.user.contact?.instagram,
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      const newImage = URL.createObjectURL(event.target.files[0]);
      setformData({ ...formData, profilePicture: newImage });
      setPlaceholder(newImage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    const body = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parseToken}`,
      },
      body: JSON.stringify(formData),
    };
    try {
      const res: any = await FetchApi(Endpoints.getUsers, body);
      if (res.status === "success") {
        dispatch(setUserData(res));
        setIsLoading(false);
        onClose();
      } else {
        throw res;
      }
    } catch (error: any) {
      setIsLoading(false);
      dispatch(showFailedModal(error.message));
    }
  };
  // console.log(currentUser?.data.user.profilePicture)
  return (
    <div className="fixed bg-black bg-opacity-60 text-[14px]  inset-0 flex items-center justify-center z-[990]">
      <div className="bg-white overflow-y-auto h-[500px] no-scrollbar rounded-lg shadow-lg w-full max-w-md mx-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:"
        >
          ✖
        </button>

        <div className="p-4 border-b">
          <h2 className="text-[16px] font-semibold">
            Edit your public profile
          </h2>
        </div>

        <div className="p-4">
          {/* <div className='flex items-center justify-center mb-4'>
            <div className='relative w-20 h-20 rounded-full overflow-hidden'>
              <img
                src='/path-to-image.jpg'
                alt='Profile'
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                <button className='text-white'>✏️</button>
              </div>
            </div>
          </div> */}

          <div className="mt-[32px] mb-[24px]">
            <div className="flex items-center justify-center mb-4">
              <div className=" relative">
                <label
                  className="flex  items-center justify-center w-full bg-gray-900 rounded-full overflow-hidden max-w-[120px] h-[120px] cursor-pointer"
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
                    <div className=" ">
                      <img
                        src={placeholder}
                        alt="profilephoto"
                        className="object-cover max-w-[120px] h-[120px] "
                      />
                    </div>
                  ) : (
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718917696/utilities/LodgeMate_File/Profile_qzo5aq.svg"
                      alt=""
                      className="w-full"
                    />
                  )}
                </label>
                <button className=" absolute bottom-1 right-0 bg-white border rounded-full p-2 z-[500] ">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7958 2.2059C17.4916 1.90161 17.1304 1.66023 16.7328 1.49554C16.3353 1.33086 15.9092 1.24609 15.4789 1.24609C15.0486 1.24609 14.6225 1.33086 14.225 1.49554C13.8275 1.66023 13.4663 1.90161 13.162 2.2059L3.32204 12.0459C2.8547 12.5135 2.52144 13.098 2.35704 13.7384L1.26954 17.9709C1.24257 18.0762 1.24354 18.1867 1.27234 18.2916C1.30114 18.3964 1.35679 18.4919 1.43378 18.5686C1.51078 18.6454 1.60646 18.7007 1.71138 18.7292C1.81629 18.7576 1.92682 18.7582 2.03204 18.7309L6.26329 17.6447C6.90377 17.4805 7.48834 17.1472 7.95579 16.6797L17.7958 6.83965C18.1001 6.53542 18.3415 6.17422 18.5061 5.77668C18.6708 5.37915 18.7556 4.95307 18.7556 4.52278C18.7556 4.09248 18.6708 3.6664 18.5061 3.26887C18.3415 2.87134 18.1001 2.51014 17.7958 2.2059ZM14.0458 3.08965C14.4259 2.70956 14.9414 2.49603 15.4789 2.49603C16.0164 2.49603 16.5319 2.70956 16.912 3.08965C17.2921 3.46974 17.5057 3.98525 17.5057 4.52278C17.5057 5.0603 17.2921 5.57581 16.912 5.9559L15.9383 6.92965L13.072 4.0634L14.0458 3.08965ZM12.1883 4.94715L15.0545 7.8134L7.07204 15.7959C6.76251 16.1048 6.37571 16.325 5.95204 16.4334L2.74329 17.2584L3.56829 14.0497C3.67588 13.6257 3.89616 13.2387 4.20579 12.9297L12.1883 4.94715Z"
                      fill="#666666"
                    />
                  </svg>
                </button>
              </div>
            </div>{" "}
          </div>

          <div className="mb-4">
            <label className="block   ">Names & description</label>
            <div className=" flex items-center gap-3">
              <input
                value={formData.firstName}
                name="firstName"
                type="text"
                placeholder="First name"
                onChange={(e) => {
                  setformData({ ...formData, [e.target.name]: e.target.value });
                }}
                className="mt-1 block w-full p-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:"
              />
              <input
                value={formData.lastName}
                name="lastName"
                type="text"
                placeholder="Last name"
                onChange={(e) => {
                  setformData({ ...formData, [e.target.name]: e.target.value });
                }}
                className="mt-1 block w-full border p-2 outline-none border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:"
              />
            </div>

            <textarea
              value={formData.bio}
              name="bio"
              placeholder="Write your bio"
              onChange={(e) => {
                setformData({ ...formData, [e.target.name]: e.target.value });
              }}
              className="mt-3 block w-full h-[150px] outline-none border p-2  border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:"
            />
          </div>

          <div className="mb-4">
            <label className="block textm  ">Socials</label>
            <div className="flex items-center justify-between border-b pb-1 mb-2 mt-1 gap-x-2">
              <label className="flex gap-2  textsm  ">
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/LinkedIn_a3gtp7.svg"
                  alt="linkedin"
                  className="w-[24px] h-[24px]"
                />
                Linkedin
              </label>
              <input
                value={formData.contact.linkedin}
                name="linkedin"
                type="text"
                onChange={(e) => {
                  setformData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      [e.target.name]: e.target.value,
                    },
                  });
                }}
                placeholder="Paste the link to your page"
                className="block p-1 w-[150px] border outline-none border-gray-300 rounded-md -sm focus:ring-blue-500 focus:border-blue-500 sm:"
              />
            </div>
            <div className="flex items-center justify-between border-b pb-1 mb-2  mt-1 gap-x-2">
              <label className="flex gap-2 -blue-500 -sm  ">
                {" "}
                <FaWhatsapp className="w-[24px] h-[24px] text-gray-500" />
                Whatsapp
              </label>
              <input
                value={formData.contact.whatsapp}
                name="whatsapp"
                type="text"
                onChange={(e) => {
                  setformData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      [e.target.name]: e.target.value,
                    },
                  });
                }}
                placeholder="Paste the link to your page"
                className="block w-[150px] outline-none p-1 border border-gray-300 rounded-md -sm focus:ring-blue-500 focus:border-blue-500 sm:"
              />
            </div>
            <div className="flex items-center mt-1 justify-between border-b pb-1 mb-2  gap-x-2">
              <label className="  flex gap-2  ">
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Instagram_vwhjji.svg"
                  alt="ig"
                  className="w-[24px] h-[24px] "
                />
                Instagram
              </label>
              <input
                value={formData.contact.instagram}
                name="instagram"
                type="text"
                onChange={(e) => {
                  setformData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      [e.target.name]: e.target.value,
                    },
                  });
                }}
                placeholder="Paste the link to your page"
                className="block w-[150px] border p-1 border-gray-300 rounded-md -sm focus:ring-blue-500 focus:border-blue-500 sm:"
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            className="w-full bg-blue-500 flex gap-2 justify-center items-center text-white py-2 rounded-md"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                Saving changes <div className="circularLoader" />
              </>
            ) : (
              " Save change"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
