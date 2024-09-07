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
    <div className="fixed bg-black bg-opacity-60  inset-0 flex items-center justify-center z-[990]">
      <div className="bg-white overflow-y-auto h-[500px] no-scrollbar rounded-lg shadow-lg w-full max-w-md mx-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Edit your public profile</h2>
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
                    alt="profilephoto"
                    className="object-cover max-w-[120px] h-[120px] "
                  />
                ) : (
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718917696/utilities/LodgeMate_File/Profile_qzo5aq.svg"
                    alt=""
                    className="w-full"
                  />
                )}
              </label>
            </div>{" "}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Names & description
            </label>
            <input
              value={formData.firstName}
              name="firstName"
              type="text"
              placeholder="First name"
              onChange={(e) => {
                setformData({ ...formData, [e.target.name]: e.target.value });
              }}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <input
              value={formData.lastName}
              name="lastName"
              type="text"
              placeholder="Last name"
              onChange={(e) => {
                setformData({ ...formData, [e.target.name]: e.target.value });
              }}
              className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <textarea
              value={formData.bio}
              name="bio"
              placeholder="Write your bio"
              onChange={(e) => {
                setformData({ ...formData, [e.target.name]: e.target.value });
              }}
              className="mt-1 block w-full border p-2  border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Socials
            </label>
            <div className="flex items-center mt-1 gap-x-2">
              <label className="block text-blue-500 text-sm font-medium ">
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
                className="block p-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center mt-1 gap-x-2">
              <label className="block text-blue-500 text-sm font-medium ">
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
                className="block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center mt-1 gap-x-2">
              <label className="block text-blue-500 text-sm font-medium ">
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
                className="block w-full border p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
