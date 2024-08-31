import React from "react";
import Link from "next/link";
interface chatBtnProps {
  details: {
    sender: any;
    reciver:any,
    roomId: any;
    profilePicture: string;
    area: string;
    gender: string;
    firstName: string;
    lastName: string;
  };
}
const ChatBtn: React.FC<chatBtnProps> = ({ details }) => {
  return (
    <Link
      href={{
        pathname: "/chat",
        query: {
          sender: details.sender,
          reciver:details.reciver,
          gender:details.gender,
          firstName:details.firstName,
          lastName:details.lastName,
          roomId: details.roomId,
          profilePicture: details.profilePicture,
          area: details.area,
        },
      }}
      className='bg-pri w-full border-2 text-center cursor-pointer rounded-lg border-opacity-[20px] py-[12px] mb-[18px] bg-primary text-white'
    >
      Chat
    </Link>
  );
};

export default ChatBtn;
