"use client";
import React, { useState, useEffect, useMemo } from "react";
import Card from "./Card";
import FilterOptions from "./FilterOptions";
import ProfileDetails from "./roomate_details/ProfileDetails";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Fetchroommate,
  selectAllFetchroommatedata,
  setroommateData,
} from "@/lib/features/Roommates/RoommateSlice";
import { Endpoints } from "@/services/Api/endpoints";
import { urlGenerator } from "@/utils/urlGenerator";
import {
  selectAllLocationFilter,
  selectAllQueryFilter,
} from "@/lib/features/Filters/filterSlice";
import { selectAllAuthenticated } from "@/lib/features/Login/signinSlice";
import GallerySkeleton from "@/components/Skeletons/cardsSkeleton";
import AOS from "aos";

function BrowseRoommates() {

  const cache = new Map<string, any>();

  const [showFiltersModal, setShowFiltersModal] = useState(false);
  //  (useless for now) const [filters, setFilters] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const RoommatesData = useAppSelector(selectAllFetchroommatedata);
  const dispatch = useAppDispatch();
  const storequery = useAppSelector(selectAllQueryFilter);
  const storelocation = useAppSelector(selectAllLocationFilter);
  const isAuth = useAppSelector(selectAllAuthenticated);
  const param = {
    query: storequery,
    location: storelocation,
  };
  const [selectedRoommate, setSelectedRoommate] = useState< null>(
    null
  );
  const isSearchTriggered = "";

  const GetToken = async () => {
    const localStorageToken = localStorage.getItem("token");
    if (!localStorageToken) {
      return null;
    }
    const parsedToken = JSON.parse(localStorageToken);
    return parsedToken;
  };
  const handleCardClick = (roommate: any) => {
    setSelectedRoommate(roommate);
  };
  // fetching Services data
  /**
   * useEffect hook that fetches data based on authentication status and token availability.
   * @returns None
   */
  console.log(RoommatesData)

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  },[]); 
  useEffect(() => {
   
    const fetchData = async () => {
      const token = await GetToken();
      let fetchUrl;
      if (isAuth && token) {
        // this will be uncommented when db is updated
        // fetchUrl= Endpoints.getPrivateServices + urlGenerator(param);
        // this will be deleted when db is updated
        fetchUrl = Endpoints.getPublicRoommates + urlGenerator(param);
      } else if (!token) {
        fetchUrl = Endpoints.getPublicRoommates + urlGenerator(param);
      }
      console.log(fetchUrl);
      // nullify fetch
      if (!fetchUrl) {
        return;
      }
      // Check if the data is in the cache
      if (cache.has(fetchUrl)) {
        // console.log('Using cached data');
        const cacheData = cache.get(fetchUrl);
        dispatch(setroommateData(cacheData.payload));
        setisLoading(false);
        return;
      }
      const abortController = new AbortController();
      try {
        const response = await dispatch(Fetchroommate(fetchUrl));
        cache.set(fetchUrl, response);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
        }
      } finally {
        setisLoading(false);
        return () => abortController.abort();
      }
    };
    fetchData();
  }, [dispatch, storequery, storelocation]);

  /**
   * Function to handle the action of showing more content.
   * Sets the state variable 'showMore' to true.
   */
  const handleShowMore = () => {
    setShowMore(true);
  };
  /**
   * Handles the click event on the modal element and closes the filters modal if the click target is the modal itself.
   * @param {React.MouseEvent<HTMLDivElement>} e - The click event object
   * @returns None
   */
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowFiltersModal(false);
    }
  };

  //  useless for now
  const handleResetFilters = () => {
    //   setFilters({});
    //   setFilteredProducts(products); // Resetting to all products
  };

  //  useless for now
  const handleApplyFilters = (appliedFilters: any) => {
    //   setFilters(appliedFilters);
    //   // Logic to filter the product list based on appliedFilters
    //   const filtered = products.filter((product) => {
    //     const matchesPrice =
    //       (!appliedFilters.minPrice ||
    //         product.price >= appliedFilters.minPrice) &&
    //       (!appliedFilters.maxPrice || product.price <= appliedFilters.maxPrice);
    //     const matchesType =
    //       !appliedFilters.accommodationType.length ||
    //       appliedFilters.accommodationType.includes(product.accommodationType);
    //     const matchesRooms =
    //       !appliedFilters.rooms.length ||
    //       appliedFilters.rooms.includes(String(product.numberOfRooms));
    //     const matchesOccupants =
    //       !appliedFilters.occupants.length ||
    //       appliedFilters.occupants.includes(String(product.numberOfRooms));
    //     const matchesFeatures =
    //       !appliedFilters.features.length ||
    //       appliedFilters.features.every((feature: string) =>
    //         product.features.map((f) => f.name).includes(feature)
    //       );
    //     return (
    //       matchesPrice &&
    //       matchesType &&
    //       matchesRooms &&
    //       matchesOccupants &&
    //       matchesFeatures
    //     );
    //   });
    //   // setFilteredProducts(filtered);
    //   setShowFiltersModal(false); // Close modal after applying filters
  };
  const MappedRoommates = useMemo(() => (
    RoommatesData?.data?.roommates.slice(0, showMore ? RoommatesData.data.roommates.length : 2).map((roommate, index) => (
      <Card
        {...roommate}
        key={index}
        imageUrl={roommate.postedBy.profilePicture}
        name={roommate.postedBy.firstName}
        location={roommate.address_text}
        nearbyUniversity={roommate.subAdministrativeArea}
        onClick={() => handleCardClick(roommate)}
        sex={roommate.postedBy.gender}
      />
    ))
  ), [RoommatesData, showMore, handleCardClick]);
  return (
    <div className="px-4 sm:px-[100px] mt-[50px] text-[14px] sm:text-[16px]">
      {selectedRoommate && (
        <div>
          <ProfileDetails
            roommate={selectedRoommate}
            onClose={() => setSelectedRoommate(null)}
          />
        </div>
      )}
      <div className="flex justify-between gap-8 items-center text-lgray mb-[24px]">
        <h1 className=" flex flex-wrap  text-lgray ">
          {isSearchTriggered
            ? `Showing results for "${storequery}"`
            : "Showing available roommates around"}
        </h1>

        <button
          onClick={() => setShowFiltersModal(true)}
          className={`${
            isSearchTriggered ? "flex" : "hidden"
          } border-2 border-black border-opacity-[40%] items-center gap-4 rounded-[8px] px-[16px] py-[10px]`}
        >
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717408109/utilities/LodgeMate_File/page_info_y6jhz3.svg"
            alt="filter"
          />
          Filter
        </button>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      
      {
              !RoommatesData?
              <GallerySkeleton/>
             : MappedRoommates
            } 
      </div>
      {!showMore && (
        <div className="mt-10 flex flex-col justify-center items-center text-lgray font-medium pb-[200px]">
          <p className="text-[16px] pb-[16px] ">Continue exploring Services</p>
          <button
            className="border px-4 py-2 rounded-[12px]"
            onClick={handleShowMore}
          >
            Show more
          </button>
        </div>
      )}
      {/* Filters Modal */}
      {showFiltersModal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 px-1 bg-black bg-opacity-25 flex justify-center z-50"
          onClick={handleModalClick}
        >
          <div className="bg-white  rounded-[20px]  w-[768px] mt-6 max-h-[80vh] no-scrollbar overflow-y-auto">
            {/* Header */}
            <div className="flex relative justify-center p-2 items-center mb- border-b bor">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="text-gray-500  absolute right-4 top-2 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <FilterOptions
              onResetFilters={handleResetFilters}
              onApplyFilters={handleApplyFilters}
              onClose={() => setShowFiltersModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default BrowseRoommates;
