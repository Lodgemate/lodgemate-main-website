"use client";

import React, { useState } from "react";

interface ChatMessage {
  id: number;
  text: string;
  received: boolean;
}

interface ChatPreview {
  id: number;
  name: string;
  message: string;
  time: string;
  profileImg: string;
  messages: ChatMessage[];
}

const chats: ChatPreview[] = [
  {
    id: 1,
    name: "John Doe",
    message:
      "Hello Sir, I’m John. I’m interested in being your roommate. Is the room still available?",
    time: "02:20pm",
    profileImg:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719950708/utilities/LodgeMate_File/1234_qyeour.svg",
    messages: [
      {
        id: 1,
        text: "Hello Sir, I’m John. I’m interested in being your roommate. Is the room still available?",
        received: true,
      },
      {
        id: 2,
        text: "I’d appreciate it if you could let me know the best way to communicate. How about using WhatsApp?",
        received: true,
      },
      {
        id: 3,
        text: "Hi John 👋 Good afternoon, Yes, the room is still available.",
        received: false,
      },
    ],
  },
  {
    id: 2,
    name: "Zack Fox",
    message:
      "Hey, I'm Zack. Is the room still up for grabs? I'd love to be your roommate.",
    time: "02:25pm",
    profileImg:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719951183/utilities/LodgeMate_File/wqer_b0cdon.svg",
    messages: [
      {
        id: 1,
        text: "Hey, I'm Zack. Is the room still up for grabs? I'd love to be your roommate.",
        received: true,
      },
      {
        id: 2,
        text: "Can you let me know the best way to reach you? Maybe we could chat on WhatsApp.",
        received: true,
      },
      {
        id: 3,
        text: "Hello Zack 👋 Good afternoon, Yes, the room is still available.",
        received: false,
      },
    ],
  },
  {
    id: 3,
    name: "Lion James",
    message:
      "Hi, I'm Lion. Just checking if the room is still available. I'd like to move in.",
    time: "02:30pm",
    profileImg:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719951182/utilities/LodgeMate_File/456768iok_snh1up.svg",
    messages: [
      {
        id: 1,
        text: "Hi, I'm Lion. Just checking if the room is still available. I'd like to move in.",
        received: true,
      },
      {
        id: 2,
        text: "What's the best way to keep in touch? I think WhatsApp would be convenient.",
        received: true,
      },
      {
        id: 3,
        text: "Hello Lion 👋 Good afternoon, Yes, the room is still available.",
        received: false,
      },
    ],
  },

  // Add more chat previews here
];

const MobileChat: React.FC = () => {
  const [activeChat, setActiveChat] = useState<ChatPreview | null>(null);
  const [message, setMessage] = useState<string>("");
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-white mt-[100px]">
      {!activeChat ? (
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Your chats</h1>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer"
              onClick={() => setActiveChat(chat)}
            >
              <div className="flex items-center">
                <img
                  src={chat.profileImg}
                  alt={`${chat.name}'s profile`}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <div className="font-semibold">{chat.name}</div>
                  <div className="text-sm text-gray-600 truncate w-40">
                    {chat.message}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{chat.time}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-center p-4 border-b border-gray-200">
            <button
              onClick={() => setActiveChat(null)}
              className="mr-4 text-gray-500"
            >
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/arrow_back_hviyes.svg"
                alt="Back"
                className="w-6 h-6"
              />
            </button>
            <img
              src={activeChat.profileImg}
              alt={`${activeChat.name}'s profile`}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setShowProfile(true)}
            />
            <div className="ml-3">
              <div className="font-semibold text-lg">{activeChat.name}</div>
            </div>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {activeChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-2 ${
                  msg.received ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-xs p-3 ${
                    msg.received
                      ? "bg-blue-100 text-blue-900 rounded-r-lg rounded-t-lg"
                      : "bg-primary text-white rounded-l-lg rounded-t-lg"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          {activeChat && (
            <div className="flex items-center p-4 border-t border-gray-300">
              <div className="flex items-center p-1 bg-[#30a2ff28] h-[48px] w-full rounded-full pl-2 pr-4">
                <button className="mr-1 text-gray-500">
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/Add_kdegc6.svg"
                      alt="add"
                      className=""
                  />
                </button>
                <input
                  type="text"
                  placeholder="Say Hi..."
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

              {message ? (
                <button className="ml-2 text-blue-500 font-bold">Send</button>
              ) : (
                <>
                  <button className="ml-2 text-gray-500 h-[48px]">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/ic_baseline-phone_sq7scg.svg"
                      alt=""
                      className="h-[40px] w-[40px]"
                    />
                  </button>
                  <button className="ml-2 text-gray-500">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/mic_kgxbgm.svg"
                      alt=""
                      className="h-[40px] w-[40px]"
                    />
                  </button>
                </>
              )}
            </div>
          )}

          {/* Profile Popup */}
          {showProfile && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-80">
                <img
                  src={activeChat.profileImg}
                  alt={`${activeChat.name}'s profile`}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <div className="text-center font-semibold text-lg mb-4">
                  {activeChat.name}
                </div>
                <div className="flex justify-around mb-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719953600/utilities/LodgeMate_File/ion_male-outline_qtox5s.svg"
                      alt="gender"
                    />
                    <p>Male</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337645/utilities/LodgeMate_File/home_pin_1_jvqqfs.svg"
                      alt="university"
                    />
                    <p>FUTO</p>
                  </div>
                </div>
                <button
                  className="w-full p-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => setShowProfile(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileChat;
