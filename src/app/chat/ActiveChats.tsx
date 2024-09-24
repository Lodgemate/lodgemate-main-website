"use client";
import UserImage from "@/components/Shared/userImage";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import React, { useEffect, useState, useMemo } from "react";

interface ActiveChatsProps {
  currentUser: any;
  activeChat: any;
  setActiveChat: React.Dispatch<React.SetStateAction<any>>;
}

const cache = new Map<string, any>();

const ActiveChats: React.FC<ActiveChatsProps> = ({
  currentUser,
  activeChat,
  setActiveChat,
}) => {
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    const url = Endpoints.getAllMessages;

    const body = {
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
    };

    const fetchData = async () => {
      try {
        const res: any = await FetchApi(url, body);
        setData(res.data.latestRoomsMessage);
        cache.set(url, res.data.latestRoomsMessage);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    // Fetch data initially when the component mounts
    fetchData();

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const reciversData = useMemo(
    () => (data: any[]) => {
      const newArr = data.filter(
        (ent: any) => ent?._id !== currentUser?.data.user._id
      );
      return newArr[0];
    },
    [data, currentUser]
  );

  const formatDate = (dateString: string) => {
    const messageDate = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    if (diffInDays === 0) {
      return messageDate.toLocaleTimeString([], options);
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays > 1) {
      return messageDate.toLocaleDateString();
    }
  };

  const sortedData = useMemo(() => {
    return data
      ? [...data].sort((a, b) => {
          return (
            new Date(b.latestMessage.dateCreated).getTime() -
            new Date(a.latestMessage.dateCreated).getTime()
          );
        })
      : [];
  }, [data]);

  return (
    <>
      {sortedData.map((chat) => (
        <div
          key={chat.latestMessage._id}
          className={`flex justify-between items-start p-2 border-b border-gray-300 cursor-pointer ${
            activeChat?.id === chat.latestMessage._id
              ? "bg-primary bg-opacity-10"
              : "bg-white"
          }`}
          onClick={() => setActiveChat(chat)}
        >
          <div className="flex items-center">
            <UserImage
              src={
                reciversData(chat.latestMessage.participants)?.profilePicture
              }
              alt={`${
                reciversData(chat.latestMessage.participants)?.firstName
              }'s profile`}
              size={"w-[45px] h-[45px]"}
              fallbackText={
                reciversData(chat.latestMessage.participants)?.firstName +
                " " +
                reciversData(chat.latestMessage.participants)?.lastName
              }
            />
            <div className="ml-4">
              <div className="font-semibold">
                {reciversData(chat.latestMessage.participants)?.firstName}
              </div>
              <div className="w-[150px] truncate text-[12px]">
                {chat.latestMessage.message}
              </div>
            </div>
          </div>
          <div className="text-[8px] text-gray-500">
            {formatDate(chat.latestMessage.dateCreated)}
          </div>
        </div>
      ))}
    </>
  );
};

export default ActiveChats;
