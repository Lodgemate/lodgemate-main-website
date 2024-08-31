import React from "react";

interface EditProfileModalProps {
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose }) => {
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto relative">
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
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <img
                src="/path-to-image.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <button className="text-white">✏️</button>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Names & description
            </label>
            <input
              type="text"
              placeholder="John"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <input
              type="text"
              placeholder="Doe"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <textarea
              placeholder="Hey there!..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Socials
            </label>
            <div className="flex items-center mt-1">
              <input
                type="text"
                placeholder="Facebook"
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button className="ml-2 text-blue-500">Submit</button>
            </div>
            <div className="flex items-center mt-1">
              <input
                type="text"
                placeholder="Instagram"
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center mt-1">
              <button className="ml-2 text-blue-500">Add link</button>
            </div>
            <div className="flex items-center mt-1">
              <button className="ml-2 text-blue-500">Add link</button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <button className="w-full bg-blue-500 text-white py-2 rounded-md">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
