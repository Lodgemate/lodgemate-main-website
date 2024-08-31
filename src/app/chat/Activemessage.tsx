"use client"
import { selectAllUsersdata } from '@/lib/features/Users/usersSlice';
import { useAppSelector } from '@/lib/hooks';
import { Endpoints } from '@/services/Api/endpoints';
import { FetchApi } from '@/utils/Fetchdata';
import { useEffect, useRef } from 'react';
interface ActivemessageProps {
  setMessages: any;
  messages: any;
  roomId: any;
}

const cache = new Map<string,any>();
const Activemessage:React.FC<ActivemessageProps> = ({setMessages, roomId, messages}) => {
    const currentUser = useAppSelector(selectAllUsersdata)
    const messagesEndRef = useRef(null);

    useEffect(() => {
      if (messagesEndRef.current) {
        //@ts-ignore
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [messages]); 

    useEffect(()=>{
      const localStorageToken = localStorage.getItem("token");
      const parseToken = localStorageToken && JSON.parse(localStorageToken);
        const url=Endpoints.getAllRecentMessages+roomId+'/most-recent-messages'
        if (cache.has(url)) {
          const cacheData= cache.get(url)
          setMessages(cacheData)
        }
       const body = {
         headers: {
           Authorization: `Bearer ${parseToken}`,
         },
       };
        const fetchData=async()=>{
        
            try {
                const res: any= await FetchApi(url, body)
                setMessages(res.data.messages)
                cache.set(url, res.data.messages)
                console.log(res)
            } catch (error) {
                
            }
        }
        if (roomId) {
        fetchData()
            
        }
    },[roomId])
    
  return (
    <>
   {messages && messages.slice().reverse().map((msg: any) => (
            <div
            ref={messagesEndRef} 
              key={msg._id}
              className={`flex mb-2 ${
                currentUser?.data.user.id !== msg.sentBy ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-xs p-3  ${
                    currentUser?.data.user.id !== msg.sentBy 
                    ? "bg-[#30a2ff28] text-[#093576] rounded-r-[12px] rounded-t-[12px]"
                    : "bg-primary text-white rounded-l-[12px] rounded-t-[12px]"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
    </>

)}

export default Activemessage