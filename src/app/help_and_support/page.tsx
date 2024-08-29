"use client";

import React, { useState, ChangeEvent } from "react";

interface ChatMessage {
  id: number;
  text: string;
  received: boolean;
  image?: string;
}

interface ChatPreview {
  id: number;
  name: string;
  messages: ChatMessage[];
}

const customerCareChat: ChatPreview = {
  id: 1,
  name: "Customer Care",
  messages: [
    {
      id: 1,
      text: "Welcome to customer care! How can we assist you today?",
      received: true,
    },
  ],
};

const Help: React.FC = () => {
  const [activeChat, setActiveChat] = useState<ChatPreview>(customerCareChat);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "" || image) {
      const newMessage: ChatMessage = {
        id: activeChat.messages.length + 1,
        text: message,
        received: false,
        image: image,
      };
      setActiveChat({
        ...activeChat,
        messages: [...activeChat.messages, newMessage],
      });
      setMessage("");
      setImage("");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex h-screen pt-[70px] text-[14px] text-lblack">
      {/* First Column */}
      <div className="w-1/4 border-r border-gray-300">
        <div className=" border-b pb-[80px]"></div>
      </div>

      {/* Second Column */}
      <div className="w-2/4 flex flex-col justify-between p-4">
        <div className="flex-grow overflow-y-auto">
          {activeChat?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-2 ${
                msg.received ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-xs p-3 ${
                  msg.received
                    ? "bg-[#30a2ff28] text-[#093576] rounded-r-[12px] rounded-t-[12px]"
                    : "bg-primary text-white rounded-l-[12px] rounded-t-[12px]"
                }`}
              >
                {msg.text}
                {msg.image && (
                  <img src={msg.image} alt="sent" className="mt-2 max-w-full" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center p-4 border-t border-gray-300">
          <div className="flex items-center p-1 bg-[#30a2ff28] h-[48px] w-full rounded-full  pl-2 pr-4">
            <button className="mr-1 text-gray-500">
              <label htmlFor="imageInput">
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/Add_kdegc6.svg"
                  alt="add"
                />
              </label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </button>
            <input
              type="text"
              placeholder="Enter a message..."
              value={message}
              onChange={handleInputChange}
              className="flex-grow px-4 py-2 bg-transparent rounded-lg focus:outline-none "
            />
            <button className="ml-2 text-gray-500">
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/bi_emoji-smile_ph5jwq.svg"
                alt=""
              />
            </button>
          </div>

          <button
            className="ml-2 text-blue-500 font-bold"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>

      {/* Third Column */}
      <div className="w-1/4 border-l border-gray-300">
        <div className=" border-b pb-[80px]"></div>
      </div>
    </div>
  );
};

export default Help;
