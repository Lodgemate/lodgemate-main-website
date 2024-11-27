import { selectToken } from "@/lib/features/Auth/tokenSlice";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";
import { useAppSelector } from "@/lib/hooks";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import { useEffect, useRef } from "react";

interface ActivemessageProps {
  setMessages: any;
  messages: any;
  roomId: any;
}

const cache = new Map<string, any>();

const Activemessage: React.FC<ActivemessageProps> = ({
  setMessages,
  roomId,
  messages,
}) => {
  const currentUser = useAppSelector(selectAllUsersdata);
  const messagesEndRef = useRef(null);
  const parseToken = useAppSelector(selectToken);

  // Scroll to the latest message when messages are updated
  useEffect(() => {
    if (messagesEndRef.current) {
      //@ts-ignore
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Fetch messages for the active room periodically (every 5 seconds)
  useEffect(() => {
    const url =
      Endpoints.getAllRecentMessages + roomId + "/most-recent-messages";

    if (cache.has(url)) {
      const cacheData = cache.get(url);
      setMessages(cacheData);
    }

    const body = {
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
    };

    const fetchData = async () => {
      try {
        const res: any = await FetchApi(url, body);
        setMessages(res.data.messages);
        cache.set(url, res.data.messages);
      } catch (error) {
        console.error(error);
      }
    };

    if (roomId) {
      // Fetch messages initially
      fetchData();

      // Set up interval to fetch messages every 5 seconds
      const intervalId = setInterval(() => {
        fetchData();
      }, 1000);

      // Clear interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [roomId, setMessages]);

  // Function to format the timestamp
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

  return (
    <>
      {messages &&
        messages
          .slice()
          .reverse()
          .map((msg: any) => (
            <div
              ref={messagesEndRef}
              key={msg._id}
              className={`flex mb-2 ${
                currentUser?.data.user.id !== msg.sentBy
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div>
                <div
                  className={`max-w-xs p-3  ${
                    currentUser?.data.user.id !== msg.sentBy
                      ? "bg-[#30a2ff28] text-[#093576] rounded-r-[12px] rounded-t-[12px]"
                      : "bg-primary text-white rounded-l-[12px] rounded-t-[12px]"
                  }`}
                >
                  {msg.type === "audio" ? (
                    <audio controls>
                      <source src={msg.audio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <div>{msg.message}</div>
                  )}
                </div>
                {/* Timestamp */}
                <div className="text-[8px] text-end text-gray-500 mt-1">
                  {formatDate(msg.dateCreated)}
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default Activemessage;
