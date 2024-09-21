"use client";
import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "@/lib/hooks";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";
import { randomUUID } from "crypto";
import { MainObject } from "@/app/chat/types";
import EmojiPicker from 'emoji-picker-react'; // Newer emoji picker



interface WebSocketComponentProps {
  setMessages: any;
  activeChat: MainObject | null;
}
const WebSocketComponent: React.FC<WebSocketComponentProps> = ({
  setMessages,
  activeChat,
}) => {
  const currentUser = useAppSelector(selectAllUsersdata);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null); // Ref to track emoji picker

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const parsedToken = JSON.parse(token);
    const newSocket = io("https://api.lodgemate.com.ng/chats", {
      path: "/socket.io",
      transports: ["websocket"],
      auth: {
        authorization: `Bearer ${parsedToken}`,
      },
    });

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("disconnect", (reason) => {
      console.log("WebSocket disconnected:", reason);
    });

    newSocket.on("connect_error", (err) => {
      console.log("Connection Error:", err.message);
      if (err.message.includes("CORS")) {
        console.log("CORS error detected");
      }
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.emit("join-room", {
        participants: [
          activeChat?.latestMessage.participants[0]._id,
          activeChat?.latestMessage.participants[1]._id,
        ],
      });

      // Listening for status updates and new messages
      socket.on("room-message", (status) => {
        console.log("Room joined status:", status); // Status response from the server
      });
      const uniqueId = randomUUID;

      const newGeneratedMessage = {
        _id: uniqueId,
        sentBy: currentUser?.data.user._id,
        message: inputMessage,
      };

      socket.on("status", (status) => {
        console.log("New message received:", status);
        // setStatus(status.status)
      });

      socket.on("new-message", (newMessage) => {
        console.log("New message received:", newMessage);
        console.log(newMessage);
        setMessages((prevMessages: any) => [newMessage, ...prevMessages]);
      });
    }
  }, [activeChat, socket]);

  const sendMessage = async () => {
    if (socket && socket.connected) {
      // socket?.emit("join-room", {
      //   participants: ["669cd581968839bdca6397c6", "668aaa78ffccf5a5a61e854c"],})
      const message = {
        participants: [
          activeChat?.latestMessage.participants[0]._id,
          activeChat?.latestMessage.participants[1]._id,
        ],
        sentBy: currentUser?.data.user._id,
        fullname:
          currentUser?.data.user.firstName +
          " " +
          currentUser?.data.user.lastName,
        profilePicture: currentUser?.data.user.profilePicture,
        message: inputMessage,
      };
      const uniqueId = randomUUID;
      const newMessage = {
        _id: uniqueId,
        sentBy: currentUser?.data.user._id,
        message: inputMessage,
      };

      console.log("Sending message:", message);
      socket.emit("room-message", message);
      setMessages((prevMessages: any) => [newMessage, ...prevMessages]);
      setInputMessage("");
    } else {
      console.log("WebSocket not connected");
    }
  };

  const addEmoji = (emojiData: any) => {
    setInputMessage((prevMessage) => prevMessage + emojiData.emoji); // Access the emoji property directly
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false); // Close emoji picker
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {activeChat && (
        <div className="relative flex items-center p-4 border-t border-gray-300">
          {/* <p className="absolute -top-10 text-xl z-50	flex justify-center items-center gap-x-3">
            <p className="w-4 h-4 rounded-full bg-lblue"></p> {status}
          </p> */}
          <div className="flex input-wrapper items-center p-2 whitespace-nowrap bg-[#30a2ff28] h-[48px] w-full rounded-full ">
            {/* <button className="mr-2 text-gray-500 cursor-not-allowed" disabled>
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/Add_kdegc6.svg"
                alt="add"
                className="w-14 h-14"
              />
            </button> */}
            <input
              type="text"
              placeholder="Say Hi..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow w-full px-4 py-2 bg-transparent rounded-lg focus:outline-none"
            />
            <button
              className="ml-2 text-gray-500"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/bi_emoji-smile_ph5jwq.svg"
                alt="emoji picker"
                className="w-12 h-12"
              />
            </button>
            {showEmojiPicker && (
              <div
                ref={emojiPickerRef} // Reference to track clicks outside
                className="absolute bottom-0 right-0 z-10"
              >
                <EmojiPicker onEmojiClick={addEmoji} />
              </div>
            )}{" "}
          </div>

          {inputMessage ? (
            <button
              className="ml-2 text-blue-500 font-bold cursor-not-allowed"
              onClick={sendMessage}
            >
              Send
            </button>
          ) : (
            <>
              <button className="ml-2 text-gray-500 h-[48px]" disabled>
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/ic_baseline-phone_sq7scg.svg"
                  alt=""
                  className="h-[40px] w-[40px]"
                />
              </button>
              <button
                className="ml-2 text-gray-500 cursor-not-allowed"
                disabled
              >
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
    </div>
  );
};

export default WebSocketComponent;
