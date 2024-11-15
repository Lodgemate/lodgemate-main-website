import React, { useEffect, useState } from "react";
import { NotificationData, NotificationResponse } from "../Navbar/buttons/More";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import Link from "next/link";

interface props {
  notifications: NotificationResponse | undefined;
}

const NotificationModal: React.FC<props> = ({ notifications }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    const markAsRead = async (id: string) => {
      const url = Endpoints.getNotification + "/" + id;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parseToken}`,
        },
      };

      console.log(await FetchApi(url, options));
    };
    if (
      notifications &&
      notifications.data &&
      notifications.data.notifications.length >= 1
    ) {
      // notifications.data.notifications.forEach((ent) => markAsRead(ent?._id));
    }
  }, [notifications]);

  return (
    <div className="flex w-full">
      <div className="sm:w-[362px] p-4 mt-2 bg-white ">
        {notifications &&
        notifications.data &&
        notifications.data.notifications.length >= 1
          ? notifications.data.notifications.map((ent) => {
              return (
                <div className="border-b pb-2 mb-2">
                  <p className="px-3 py-1 font-bold">{ent.title}</p>
                  <p className=" px-4 line-clamp-1 ">{ent.body}</p>
                  {/* {ent.resource === 'chat' && 
                <Link className="px-4 hover:underline text-xs text-lblue" href={'/chat'}>Show Message</Link>
              } */}
                </div>
              );
            })
          : "No Notifications yet"}
      </div>
    </div>
  );
};

export default NotificationModal;
