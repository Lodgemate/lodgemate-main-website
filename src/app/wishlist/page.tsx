"use client"

import React, { useEffect, useState } from "react";
import Lodges from "./Lodges";
import Roommates from "./Roommates";
import Services from "./Services";
import TourCart from "./TourCart";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import { Lodge, Roommate, Service } from "@/lib/Types";

interface TabData {
  message: string;
  content: JSX.Element;
}


function Wishlist() {
  const [activeTab, setActiveTab] = useState<string>("Lodges");
  const [wishList, setwishList] = useState<(Service|Lodge| Roommate)[]>([])
  useEffect(()=>{
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    const AddToWhishlist = async () => {
      const url = Endpoints.addToWishlist;

      const options = {
        headers: {
          Authorization: `Bearer ${parseToken}`,
        },
      };
      try {
        const res: any= await FetchApi(url, options)
        if (res.status === 'success') {
          setwishList(res.data.wishlists)
        }else{
          throw res
        }
      } catch (error) {
        
      }
      
    };
    AddToWhishlist()


  },[])
  // console.log(wishList);
  const filteredLodges: any= wishList.filter(ent=> ent.type === 'lodge')
  const filteredRoommates: any= wishList.filter(ent=> ent.type === 'roommate')
  const filteredServices: any= wishList.filter(ent=> ent.type === 'service')
  const tabData: { [key: string]: TabData } = {
    Lodges: {
      message:`You have ${filteredLodges.length} lodges in your wishlist`,
      content: (
        <div>
          <Lodges lodges={filteredLodges}/>
        </div>
      ),
    },
    Roommates: {
      message:`You have ${filteredRoommates.length} roomies in your wishlist`,
      content: <div><Roommates roommates={filteredRoommates}/></div>,
    },
    Serivices: {
      message:`You have ${filteredServices.length} services in your wishlist`,
      content: (
        <div>
          <Services services={filteredServices}/>
        </div>
      ),
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
