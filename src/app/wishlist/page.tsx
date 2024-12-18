"use client";

import React, { useEffect, useState } from "react";
import Lodges from "./Lodges";
import Roommates from "./Roommates";
import Services from "./Services";
import TourCart from "./TourCart";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import { Lodge, Roommate, Service } from "@/lib/Types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectToken } from "@/lib/features/Auth/tokenSlice";
import axios from "axios";

interface TabData {
  message: string;
  content: JSX.Element;
}

interface Wishlist {
  service: Service[];
  wishlist: { lodge: Lodge }[];
  roommate: Roommate[];
}

function Wishlist() {
  const [activeTab, setActiveTab] = useState<string>("Lodges");
  const [wishlist, setWishlist] = useState<Wishlist>();
  const [fectchingWishes, setFetchingWishes] = useState(false);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setFetchingWishes(true);
        const res = await axios.get(Endpoints.getWishlist, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log({ res });
        const wishlists: { lodge: Lodge }[] = res?.data?.data?.wishlists ?? [];
        const services: Service[] = res?.data?.data?.services ?? [];
        const roommates: Roommate[] = res?.data?.data?.roommates ?? [];
        setWishlist({
          ...wishlist,
          wishlist: wishlists,
          service: services,
          roommate: roommates,
        });
      } catch (error) {
      } finally {
        setFetchingWishes(false);
      }
    };
    fetchWishlist();
  }, []);

  const tabData: { [key: string]: TabData } = {
    Lodges: {
      message: `You have ${wishlist?.wishlist.length} lodges in your wishlist`,
      content: (
        <div>
          <Lodges wishlist={wishlist?.wishlist} loading={fectchingWishes} />
        </div>
      ),
    },
    Roommates: {
      message: `You have ${wishlist?.roommate.length} roomies in your wishlist`,
      content: <div>{/* <Roommates roommates={wishlist?.roommate} /> */}</div>,
    },
    Serivices: {
      message: `You have ${wishlist?.service.length} services in your wishlist`,
      content: <div>{/* <Services services={wishlist?.service} /> */}</div>,
    },
    // "Tour cart": {
    //   message: "You saved 3 lodges for tour/visiting",
    //   content: <div><TourCart /></div>,
    // },
  };

  return (
    <div className="p-4 mt-[100px] min-h-screen sm:px-[100px] text-[14px] text-lblack ">
      <h1 className="text-[14px] pb-4 sm:hidden block">
        {tabData[activeTab].message}
      </h1>

      <div className="flex justify-between items-center">
        <h1 className="text-[16px] sm:block hidden">
          {tabData[activeTab].message}
        </h1>
        <div className="flex  bg-[#F8F8F8] p-1 rounded overflow-x-auto  no-scrollbar">
          <div className="flex items-center -min-w-[400px]">
            {Object.keys(tabData).map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded ${
                  activeTab === tab ? "bg-primary text-white" : " text-lblack"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">{tabData[activeTab].content}</div>
    </div>
  );
}

export default Wishlist;
