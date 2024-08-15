"use client";

import React, { useEffect, useState } from "react";
import UserDetailas from "./UserDetaile";
import LodgeListed from "./LodgesListed";
import ServicesListed from "./ServicesList";
import EditProfileModal from "./modals/EditProfileModal";
import DeleteModal from "@/components/modals/DeleteModal";
import { useAppSelector } from "@/lib/hooks";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";
import { FetchApi } from "@/utils/Fetchdata";
import { Endpoints } from "@/services/Api/endpoints";

const MyProfile: React.FC = () => {
  const data= useAppSelector(selectAllUsersdata)
console.log(data)
  const [activeTab, setActiveTab] = useState("Lodges listed");
    const [tabData, setTabData] = useState({
      lodgesdata:"" as any,
      Servicessdata:""as any,
    })
  let user;
 useEffect(()=>{
  const localStorageToken = localStorage.getItem("token");
  const parseToken =localStorageToken && JSON.parse(localStorageToken)
  const body= {
    headers:{
        "content-type": "Application-json",
        Authorization:`Bearer ${parseToken}`
    }
  }
      const fetchData= async()=>{
        try {
  console.log("Rendered")
          const res =await FetchApi(`${Endpoints.getPrivateLodges}postedBy=${data?.data.user._id}`, body)
  console.log(res)
  setTabData({...tabData, lodgesdata: res})
        } catch (error) {
          
        }
      }
      if (data) {
      fetchData()
      }
 },[data])
 console.log(tabData.lodgesdata)
  return (
    <div className=' min-h-[1000px] p-'>
      <div className='w-full h-[270px] hidden sm:block border-b bg-[#F9F9F9]'></div>
      <div className='grid grid-cols-1 sm:grid-cols-4 sm:-mt-[55px]  sm:px-[80px]  gap-4 sm:gap-4'>
        {/* User Detail Column */}
        <div className='col-span-1'>
          <div className='sm:relative p-4 bg- rounded border- bg-[CCCCCC]'>
            <p className='hidden sm:flex'>user</p>
            <div className='flex w-full sm:absolute -top-10'>
              <UserDetailas data={data}/>
            </div>
          </div>
        </div>
        {/* Tab Header and Content Column */}
        <div className='sm:col-span-3'>
          <div className='py-4 bg- rounded'>
            <div className='flex sm:space-x-4 space-x-2 sm:border-b-0 overflow-x-auto whitespace-nowrap'>
              {[
                "Lodges listed",
                "Services listed",
                "Ratings & reviews",
              ].map((tab) => (
                <div
                  key={tab}
                  className={`cursor-pointer p-2 ${
                    activeTab === tab
                      ? "border-b-primary border-b-4 text-primary"
                      : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className='mt-4'>
              {activeTab === "Lodges listed" && (
                <div>
                  <LodgeListed data={data}/>
                </div>
              )}
              {activeTab === "Services listed" && (
                <div>
                  <ServicesListed data={data}/>
                </div>
              )}
              {activeTab === "Ratings & reviews" && (
                <div>Ratings & reviews content</div>
              )}
            </div>
          </div>
        </div>
      </div>
              <EditProfileModal/>
              <DeleteModal/>
    </div>
  );
};

export default MyProfile;
