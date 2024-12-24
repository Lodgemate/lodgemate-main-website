"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistance, subDays } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { IoNotificationsOffOutline } from "react-icons/io5";
import { useAppSelector } from "@/lib/hooks";
import { selectToken } from "@/lib/features/Auth/tokenSlice";
import axios from "axios";
import { Endpoints } from "@/services/Api/endpoints";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Notification {
  _id: string;
  userId: string;
  title: string;
  body: string;
  resource: string;
  resourceId: any;
  read: boolean;
  dateCreated: string;
}

const SideNotification = ({
  setShowNotifications,
  showNotifications,
}: {
  setShowNotifications: any;
  showNotifications: boolean;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useAppSelector(selectToken);
  console.log(notifications);

  const directTo = (key: string, resource: any) => {
    switch (key) {
      case "lodges/comment":
      case "lodges/review":
        return `http://localhost:3000/lodges/lodge_details/${
          JSON.parse(resource).lodgeId
        }`;

      case "chat":
        return "http://localhost:3000/chat";
      default:
        return "#";
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const data = await axios.post(
        `${Endpoints.getNotification}/${"6769b7804f509f8a7aa1a20a"}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);
    } catch (error) {
      console.log("Error marking as read", error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await axios.get(`${Endpoints.getNotification}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(data);
        setNotifications(data.data.data.notifications);
      } catch (error) {
        console.error("Error fetching notications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Sheet onOpenChange={setShowNotifications} open={showNotifications}>
      <SheetContent className="p-0" side="left">
        <SheetHeader className="bg-white p-5 py-7">
          <SheetTitle className="font-semibold text-lg">
            Notifications
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-screen pb-4">
          {loading ? (
            <>
              <div className={`w-full flex gap-1 items-start p-5`}>
                <div className=" ">
                  <Skeleton className="h-8 bg-stone-200 w-8 rounded-lg" />
                </div>
                <div>
                  <div>
                    <Skeleton className="h-3 bg-stone-200 w-60" />
                    <Skeleton className="h-2 w-40 mt-1 bg-stone-200" />
                  </div>
                  <div>
                    <Skeleton className="h-1 w-60 mt-5 bg-stone-200" />
                    <Skeleton className="h-1 w-[14rem] mt-1 bg-stone-200" />
                    <Skeleton className="h-1 w-60 mt-1 bg-stone-200" />
                  </div>
                </div>
              </div>
              <div className={`w-full flex gap-1 items-start p-5`}>
                <div className=" ">
                  <Skeleton className="h-8 bg-stone-200 w-8 rounded-lg" />
                </div>
                <div>
                  <div>
                    <Skeleton className="h-3 bg-stone-200 w-60" />
                    <Skeleton className="h-2 w-40 mt-1 bg-stone-200" />
                  </div>
                  <div>
                    <Skeleton className="h-1 w-60 mt-5 bg-stone-200" />
                    <Skeleton className="h-1 w-[14rem] mt-1 bg-stone-200" />
                    <Skeleton className="h-1 w-60 mt-1 bg-stone-200" />
                  </div>
                </div>
              </div>
              <div className={`w-full flex gap-1 items-start p-5`}>
                <div className=" ">
                  <Skeleton className="h-8 bg-stone-200 w-8 rounded-lg" />
                </div>
                <div>
                  <div>
                    <Skeleton className="h-3 bg-stone-200 w-60" />
                    <Skeleton className="h-2 w-40 mt-1 bg-stone-200" />
                  </div>
                  <div>
                    <Skeleton className="h-1 w-60 mt-5 bg-stone-200" />
                    <Skeleton className="h-1 w-[14rem] mt-1 bg-stone-200" />
                    <Skeleton className="h-1 w-60 mt-1 bg-stone-200" />
                  </div>
                </div>
              </div>
              <div className={`w-full flex gap-1 items-start p-5`}>
                <div className=" ">
                  <Skeleton className="h-8 bg-stone-200 w-8 rounded-lg" />
                </div>
                <div>
                  <div>
                    <Skeleton className="h-3 bg-stone-200 w-60" />
                    <Skeleton className="h-2 w-40 mt-1 bg-stone-200" />
                  </div>
                  <div>
                    <Skeleton className="h-1 w-60 mt-5 bg-stone-200" />
                    <Skeleton className="h-1 w-[14rem] mt-1 bg-stone-200" />
                    <Skeleton className="h-1 w-60 mt-1 bg-stone-200" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {notifications.length <= 0 ? (
                <div className="w-full mt-10 flex flex-col items-center justify-center">
                  <IoNotificationsOffOutline className="h-10 w-10 mb-" />
                  <p>You dont have any notifications yet</p>
                </div>
              ) : (
                notifications.map((notif: Notification, i) => (
                  <Link
                    href={directTo(notif.resource, notif.resourceId)}
                    className=""
                    key={notif.dateCreated}
                    onClick={() => markAsRead(notif._id)}
                  >
                    <SheetClose asChild>
                      <div
                        className={`${
                          !notif.read && "bg-blue-50/45 hover:bg-blue-100"
                        } border-b-[1px] w-full flex gap-1 items-start p-5 border-gray-200`}
                      >
                        <div className=" ">
                          {!notif.read && (
                            <div className="h-2 w-2 relative top-[0.28rem] right-1 z-10 rounded-full bg-blue-600" />
                          )}
                          <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={""} alt={""} />
                            <AvatarFallback className="rounded-lg">
                              AB
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <div>
                            <p className="text-xs text-gray-800 font-semibold">
                              {notif.title}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {formatDistance(
                                subDays(new Date(notif.dateCreated), 0),
                                new Date(),
                                { addSuffix: true }
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm max-sm:text-xs text-gray-700 mt-2 w-80 truncate">
                              {notif.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SheetClose>
                  </Link>
                ))
              )}
            </>
          )}
        </ScrollArea>

        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideNotification;
