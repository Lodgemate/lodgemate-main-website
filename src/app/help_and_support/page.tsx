"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { io, Socket } from "socket.io-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { randomUUID } from "crypto";
import { showLoadingModal } from "@/lib/features/Modal/ModalSlice";
import axios from "axios";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";

interface ChatMessage {
  _id: number;
  message: string;
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
      _id: 1,
      message: "Welcome to customer care! How can we assist you today?",
      received: true,
    },
  ],
};

const Help = () => {
  const [activeChat, setActiveChat] = useState<ChatPreview>(customerCareChat);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const currentUser = useAppSelector(selectAllUsersdata);
  const dispatch = useAppDispatch();
  const myId = currentUser?.data.user._id;
  console.log(currentUser);

  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  const parsedToken = JSON.parse(token);
  useEffect(() => {
    const socket = io("https://api.lodgemate.com.ng/help_and_support", {
      path: "/socket.io",
      transports: ["websocket"],
      auth: {
        authorization: `Bearer ${parsedToken}`,
      },
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      setSocket(socket);
      socket.emit(
        "join-room",
        {
          participants: [currentUser?.data.user._id],
          roomId: "6726d12832fe3651c6304983",
        },
        (response: any) => {
          console.log({ response });
        }
      );
    });

    socket.on("disconnect", (reason) => {
      console.log("WebSocket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("status", (data) => {
      console.log("Status event received:", data);
    });

    socket.on("new-message", (messageData) => {
      console.log("New message received:", messageData);
    });

    socket.on("typing", (user) => {
      console.log(`${user} is typing...`);
    });

    socket.on("room-message", (status) => {
      console.log("Room joined status:", status); // Status response from the server
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [parsedToken]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        dispatch(showLoadingModal("Loading messages"));
        const res = await axios.get(
          `https://api.lodgemate.com.ng/v1/rooms/${myId}/most-recent-messages`,
          {
            headers: {
              Authorization: `Bearer ${parsedToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const messages = res.data.data.messages;
        console.log(messages);
        setActiveChat((prevChat) => ({
          ...prevChat,
          messages: [...messages].reverse(),
        }));
        setMessage(message);
      } catch (error) {
        console.log("error fetching messages", error);
      } finally {
        dispatch(showLoadingModal(null));
      }
    };

    fetchMessages();
  }, [parsedToken, myId]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat.messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (socket) {
      console.log("emitting typing");
      socket.emit("typing", currentUser?.data.user.firstName || "User");
    }
  };

  const handleSendMessage = () => {
    if ((message.trim() !== "" || image) && socket) {
      const newMessage: ChatMessage = {
        _id: activeChat.messages.length + 1,
        message,
        received: false,
        image: image,
      };

      console.log("emmitting new message");

      socket.emit("room-message", {
        participants: [currentUser?.data.user._id],
        roomId: currentUser?.data.user._id,
        sentBy: currentUser?.data.user._id,
        fullname: currentUser?.data.user.firstName,
        profilePicture: currentUser?.data.user.profilePicture,
        message: message,
      });

      setActiveChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      }));
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
    <div className="flex h-screen pt-[70px]  text-[14px] text-lblack">
      <div className="w-1/4 border-r border-gray-300 hidden sm:block">
        <div className=" border-b pb-[80px]"></div>
      </div>

      <div className=" flex flex-col w-full max-w-3xl justify-between p-4">
        <ScrollArea className="w-full">
          {activeChat?.messages.map((msg, index) => {
            const isLastMessage = index === activeChat.messages.length - 1;
            return (
              <div
                key={msg._id}
                ref={isLastMessage ? lastMessageRef : null} // Attach ref only to the last message
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
                  {msg.message}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="sent"
                      className="mt-2 max-w-full"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </ScrollArea>

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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents newline in input
                  handleSendMessage();
                }
              }}
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
            onClick={() => handleSendMessage()}
          >
            Send
          </button>
        </div>
      </div>

      {/* Third Column */}
      <div className="w-1/4 border-l border-gray-300 hidden sm:block">
        <div className=" border-b pb-[80px]"></div>
      </div>
    </div>
  );
};

export default Help;
