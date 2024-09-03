import React, { useState } from "react";

interface MoreRepliesModalProps {
  isVisible: boolean;

  onClose: () => void;
}

const MoreRepliesModal: React.FC<MoreRepliesModalProps> = ({
  isVisible,
  onClose,
}) => {

    if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-[999]">
      <div className="bg-white rounded-lg w-[420px] p-6">
        <div className="flex justify-end items-center border-b pb-4">
          <button onClick={onClose} className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="max-w-sm p-4  rounded-lg h-[300px] overflow-y-auto no-scrollbar ">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="text-sm font-medium">McGreggor</h3>
              <p className=" text-gray-500">05/05/23</p>
              <div className="ml-auto flex items-center space-x-1 text-yellow-500">
                <span className=" font-semibold">3.5</span>
                <span className="">★</span>
              </div>
            </div>
          </div>
          <p className="mt-3  ">
            Lörem ipsum radiotopi triplastisk att radioitet mede, polimeter.
            Neometer konitet, cynosmos termometer entotal. Heterotropi androtes.
            Dessocial primatos postcism. Operafaktisk perform tritet. Hypertyp
            fotoform terrafili. Cynosmos bitiv fast biokrati pr...
          </p>

          <div className="pl-8 py-4">
            <div className="max-w-sm p-4  rounded-lg ">
              <div className="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="text-sm font-medium">McGreggor</h3>
                  <p className=" text-gray-500">05/05/23</p>
                  <div className="ml-auto flex items-center space-x-1 text-yellow-500">
                    <span className=" font-semibold">3.5</span>
                    <span className="">★</span>
                  </div>
                </div>
              </div>
              <p className="mt-3  ">
                Lörem ipsum radiotopi triplastisk att radioitet mede, polimeter.
                Neometer konitet, cynosmos termometer entotal. Heterotropi
                androtes. Dessocial primatos postcism. Operafaktisk perform
                tritet. Hypertyp fotoform terrafili. Cynosmos bitiv fast
                biokrati pr...
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreRepliesModal;
