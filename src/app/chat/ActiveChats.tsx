"use client";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import { extractDate } from "@/utils/utils";
import React, { useEffect, useState } from "react";

interface ActiveChatsProps {
  currentUser: any;
  activeChat: any;
  setActiveChat: any;
}
const cache = new Map<string, any>();

const ActiveChats: React.FC<ActiveChatsProps> = ({
  currentUser,
  activeChat,
  setActiveChat,
}) => {
  const [data, setData] = useState<any[] | null>(null);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({}); // Track image errors by participant

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    const url = Endpoints.getAllMessages;
    const body = {
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
    };

    if (cache.has(url)) {
      const cachedItem = cache.get(url);
      setData(cachedItem);
    }

    const fetchData = async () => {
      try {
        const res: any = await FetchApi(url, body);
        setData(res.data.latestRoomsMessage);
        cache.set(url, res.data.latestRoomsMessage);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeChat]);

  const reciversData = (data: any[]) => {
    const newArr = data.filter(
      (ent: any) => ent?._id !== currentUser?.data.user._id
    );
    return newArr[0];
  };

  return (
    <>
      {data &&
        data.map((chat) => {
          const participant = reciversData(chat.latestMessage.participants);
          const showImage =
            participant?.profilePicture && !imageError[participant?._id];

          return (
            <div
              key={chat.latestMessage._id}
              className={`flex justify-between items-start p-2 border-b border-gray-300 cursor-pointer ${
                activeChat?.id === chat.id ? "bg-[#F5F5F5]- bg-white" : "bg-white"
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="flex items-center">
                {showImage ? (
                  <img
                    src={participant?.profilePicture}
                    alt={`${participant?.firstName}'s profile`}
                    className="w-[45px] h-[45px] rounded-full"
                    onError={() =>
                      setImageError((prev) => ({
                        ...prev,
                        [participant._id]: true,
                      }))
                    } // Mark image as errored
                  />
                ) : (
                  <div className="w-[45px] h-[45px] bg-gray-500 text-white flex items-center justify-center rounded-full">
                    {participant?.firstName?.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="ml-4">
                  <div className="font-semibold">{participant?.firstName}</div>
                  <div className="w-[150px] truncate text-[12px]">
                    {chat.latestMessage.message}
                  </div>
                </div>
              </div>
              <div className="text-[8px] text-gray-500 ">
                {extractDate(chat.latestMessage.dateCreated)}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ActiveChats;
