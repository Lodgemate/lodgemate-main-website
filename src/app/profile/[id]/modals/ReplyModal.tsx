import React, { useState } from "react";

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reply: string) => void;
}

const ReplyModal: React.FC<ReplyModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [reply, setReply] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (reply.trim().length > 0) {
      onSubmit(reply);
      setReply(""); // Clear the input after submission
      onClose(); // Close the modal after submission
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <img
              src="path-to-avatar-image"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">McGregor</h3>
              <p className="text-sm text-gray-500">05/05/23</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <textarea
            className="w-full h-24 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a reply here..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <span>{reply.length}/500 remaining</span>
          </div>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={reply.trim().length === 0}
          >
            Submit reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
