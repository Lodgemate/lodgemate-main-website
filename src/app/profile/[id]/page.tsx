"use client";
import React, { useEffect, useState } from "react";
import UserDetailas from "./UserDetaile";
import LodgeListed from "./LodgesListed";
import ServicesListed from "./ServicesList";
import DeleteModal from "@/components/modals/DeleteModal";
import { useAppSelector } from "@/lib/hooks";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";
import { FetchApi } from "@/utils/Fetchdata";
import { Endpoints } from "@/services/Api/endpoints";
import { useParams } from "next/navigation";
import EditLodgeModal from "./modals/EditLodgeModal";
const cache = new Map<string, any>();

const MyProfile = () => {
  // const data= useAppSelector(selectAllUsersdata)
  const [currentUserData, setcurrentUserData] = useState<any>(null);
  const params = useParams();
  const { id } = params || {};
  const [activeTab, setActiveTab] = useState("Lodges listed");
  const [isLoading, setIsLoading] = useState(false);
  const [tabData, setTabData] = useState({
    lodgesdata: "" as any,
    Servicesdata: "" as any,
  });
  //  console.log(currentUserData?.data.user._id)

  useEffect(() => {
    const url = `${Endpoints.getUserById}${id}`;
    const body = {
      headers: {
        "content-type": "Application-json",
      },
    };
    const fetchUserData = async () => {
      setIsLoading(true);
      const res: any = await FetchApi(url, body);
      console.log(res);
      if (res.status === "success") {
        setIsLoading(false);
        setcurrentUserData(res);
      } else {
        setIsLoading(false);
        console.log(res);
      }
    };
    fetchUserData();
  }, [id]);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    const body = {
      headers: {
        "content-type": "Application-json",
        Authorization: `Bearer ${parseToken}`,
      },
    };

    const fetchData = async () => {
      try {
        // p-ut a cache here
        if (activeTab === "Lodges listed") {
          const res = await FetchApi(
            `${Endpoints.getPrivateLodges}postedBy=${currentUserData?.data.user._id}`,
            body
          );
          console.log(res);
          setTabData({ ...tabData, lodgesdata: res });
        } else if (activeTab === "Services listed") {
          const res = await FetchApi(
            `${Endpoints.getPrivateServices}vendor=${currentUserData?.data.user._id}`,
            body
          );
          console.log(res);
          setTabData({ ...tabData, Servicesdata: res });
        }
      } catch (error) {}
    };
    if (currentUserData) {
      fetchData();
    }
  }, [currentUserData, activeTab]);
  console.log(tabData.lodgesdata);
  return (
    <div className=' min-h-[1000px] p-'>
      <div className='w-full h-[270px] hidden sm:block border-b bg-[#F9F9F9]'></div>
      <div className='grid grid-cols-1 sm:grid-cols-4 sm:-mt-[55px]  sm:px-[80px]  gap-4 sm:gap-4'>
        {/* User Detail Column */}
        <div className='col-span-1'>
          <div className='sm:relative p-4 bg- rounded border- bg-[CCCCCC]'>
            <p className='hidden sm:flex'>user</p>
            <div className='flex w-full sm:absolute -top-10'>
              <UserDetailas data={currentUserData} />
            </div>
          </div>
        </div>
        {/* Tab Header and Content Column */}
        <div className='sm:col-span-3'>
          <div className='py-4 bg- rounded'>
            <div className='flex sm:space-x-4 space-x-2 sm:border-b-0 overflow-x-auto whitespace-nowrap'>
              {["Lodges listed", "Services listed", "Ratings & reviews"].map(
                (tab) => (
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
                )
              )}
            </div>
            <div className='mt-4'>
              {activeTab === "Lodges listed" && (
                <div>
                  {tabData.lodgesdata && (
                    <LodgeListed data={tabData.lodgesdata} />
                  )}
                </div>
              )}
              {activeTab === "Services listed" && (
                <div>
                  {tabData.Servicesdata && (
                    <ServicesListed data={tabData.Servicesdata} />
                  )}
                </div>
              )}
              {activeTab === "Ratings & reviews" && (
                <div>Ratings & reviews content</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <DeleteModal />

    </div>
  );
};

export default MyProfile;
