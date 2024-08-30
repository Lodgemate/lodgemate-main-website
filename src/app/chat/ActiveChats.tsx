"use client"
import { Endpoints } from '@/services/Api/endpoints'
import { FetchApi } from '@/utils/Fetchdata'
import { extractDate } from '@/utils/utils'
import React, { useEffect, useState } from 'react'

interface ActiveChatsProps {
  currentUser: any;
  activeChat: any;
  setActiveChat: any;
}

const ActiveChats:React.FC<ActiveChatsProps> = ({currentUser, activeChat, setActiveChat}) => {
    const [data, seData] = useState<any[] | null>(null)

    useEffect(()=>{
      const localStorageToken = localStorage.getItem("token");
      const parseToken = localStorageToken && JSON.parse(localStorageToken);
        const url=Endpoints.getAllMessages 
       const body = {
         headers: {
           Authorization: `Bearer ${parseToken}`,
         },
       };
        const fetchData=async()=>{
        
            try {
                const res: any= await FetchApi(url, body)
                 seData(res.data.latestRoomsMessage)
            } catch (error) {
                
            }
        }
        fetchData()
    },[activeChat])

    const reciversData=(data :any[])=>{
      const newArr = data.filter((ent: any)=>ent?._id !== currentUser?.data.user._id )
      return newArr[0]
    }

  return (
    <>
    {data &&  data.map((chat)=>{
 
      return (
        <div
        key={chat.latestMessage._id}
        className={`flex justify-between items-start p-4 border-b border-gray-300 cursor-pointer ${
          activeChat?.id === chat.id ? "bg-[#F5F5F5]" : "bg-white"
        }`}
        onClick={() => setActiveChat(chat)}
      >
        <div className="flex items-center ">
          <img
            src={     reciversData(chat.latestMessage.participants).profilePicture}
            alt={`${     reciversData(chat.latestMessage.participants).firstName}'s profile`}
            className="w-[45px] h-[45px]  rounded-full"
          />
          <div className="ml-4">
            <div className="font-semibold">{     reciversData(chat.latestMessage.participants).firstName}</div>
            <div className="w-[150px] truncate text-[15px]">
              {chat.latestMessage.message}
            </div>
          </div>
        </div>
        <div className="text-[15px] text-gray-500 ">{extractDate(chat.latestMessage.dateCreated)}</div>
      </div>
             )
    })
   
    }
    </>

)}

export default ActiveChats