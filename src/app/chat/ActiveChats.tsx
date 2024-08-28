import { Endpoints } from '@/services/Api/endpoints'
import { FetchApi } from '@/utils/Fetchdata'
import { extractDate } from '@/utils/utils'
import React, { useEffect, useState } from 'react'

const ActiveChats = ({activeChat, setActiveChat}) => {
    const [data, seData] = useState(null)

    useEffect(()=>{
      const localStorageToken = localStorage.getItem("token");
      const parseToken = localStorageToken && JSON.parse(localStorageToken);
        const url=Endpoints.getAllMessages 
        console.log(parseToken)
       const body = {
         headers: {
           Authorization: `Bearer ${parseToken}`,
         },
       };
        const fetchData=async()=>{
        
            try {
                const res= await FetchApi(url, body)
                 seData(res.data.latestRoomsMessage)
                console.log(res)
            } catch (error) {
                
            }
        }
        fetchData()
    },[activeChat])
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
            src={chat.latestMessage.participants[0].profilePicture}
            alt={`${chat.latestMessage.participants[0].firstName}'s profile`}
            className="w-[45px] h-[45px] rounded-full"
          />
          <div className="ml-4">
            <div className="font-semibold">{chat.latestMessage.participants[0].firstName}</div>
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