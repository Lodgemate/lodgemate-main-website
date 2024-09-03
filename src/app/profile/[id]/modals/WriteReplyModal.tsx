import React from "react";

type WriteReplyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const WriteReplyModal: React.FC<WriteReplyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-[12px] bg-black bg-opacity-50 flex justify-center items-center z-[900]">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div className="flex items-center mb-2">
            <img className="w-12 h-12 rounded-full" src="/" />
            <div className="ml-4">
              <div className="font-bold">David John</div>
              <div className="text-gray-500 text-sm">27/09/2024</div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &#10005;
            </button>
          </div>
        </div>
        <div className=" flex flex-col ">
          <textarea
            name="message"
            id=""
            className="h-[100px] border rounded-lg outline-none p-2"
          ></textarea>
          <p>500/500 remaining</p>
          <button className="p-2 bg-blue-500 text-white mt-4 rounded-lg">
            Reply comment
          </button>
        </div>

        <div className="flex justify-between items-center"></div>
      </div>
    </div>
  );
};

export default WriteReplyModal;
