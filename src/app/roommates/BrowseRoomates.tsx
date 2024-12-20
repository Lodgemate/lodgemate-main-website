"use client";
import React, { useState, useEffect, useMemo, useTransition } from "react";
import Card from "./Card";
import FilterOptions from "./FilterOptions";
import ProfileDetails from "./roomate_details/ProfileDetails";
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
  setSearchQuery,
} from "@/lib/features/Filters/filterSlice";
import { selectAllAuthenticated } from "@/lib/features/Login/signinSlice";
import GallerySkeleton from "@/components/Skeletons/cardsSkeleton";
import AOS from "aos";
import { selectToken } from "@/lib/features/Auth/tokenSlice";

const useGeolocation = () => {
  const [location, setLocation] = useState<{
    localGovernmentArea: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
          if (!apiKey) {
            throw new Error("API key is missing");
          }

          // Fetch location details from Google Geocoding API
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Geocode API Response:", data); // Log response here

          const addressComponents = data.results[0]?.address_components || [];
          console.log("Address Components:", addressComponents); // Log all components

          const localGovernmentArea =
            addressComponents.find((component: any) =>
              component.types.includes("administrative_area_level_3")
            )?.long_name || "N/A";
          const state =
            addressComponents.find((component: any) =>
              component.types.includes("administrative_area_level_1")
            )?.long_name || "N/A";
          const country =
            addressComponents.find((component: any) =>
              component.types.includes("country")
            )?.long_name || "N/A";

          setLocation({
            localGovernmentArea,
            state,
            country,
            latitude,
            longitude,
          });
        } catch (error) {
          console.error("Error fetching location data:", error);
          setError("Failed to fetch location data.");
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // Wait up to 10 seconds for a more accurate position
        maximumAge: 0, // Ensure that the location is always fresh
      }
    );

    // Cleanup function to clear the watch when the component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { location, error };
};

interface BrowseLodgesProps {
  isSearchTriggered: boolean;
}

const BrowseRoommates: React.FC<BrowseLodgesProps> = ({
  isSearchTriggered,
}) => {
  const cache = new Map<string, any>();

  const [showFiltersModal, setShowFiltersModal] = useState(false);
  //  (useless for now) const [filters, setFilters] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const RoommatesData = useAppSelector(selectAllFetchroommatedata);
  const dispatch = useAppDispatch();
  const storequery = useAppSelector(selectAllQueryFilter);
  const storelocation = useAppSelector(selectAllLocationFilter);
  const parsedToken = useAppSelector(selectToken);
  const isAuth = useAppSelector(selectAllAuthenticated);

  const param = {
    query: storequery !== "Not Found" && storequery,
    location: storelocation,
  };

  const [selectedRoommate, setSelectedRoommate] = useState<null>(null);

  const { location } = useGeolocation();

  const GetToken = async () => {
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
  const optimizeImageUrl = (url: string) => {
    if (url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/w_500,f_auto/");
    }
    return url;
  };

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = await GetToken();
      let fetchUrl;
      if (token) {
        // this will be uncommented when db is updated
        // fetchUrl= Endpoints.getPrivateServices + urlGenerator(param);
        // this will be deleted when db is updated
        fetchUrl = Endpoints.getPublicRoommates + urlGenerator(param);
      } else if (!token) {
        fetchUrl = Endpoints.getPublicRoommates + urlGenerator(param);
      }
      console.log({ fetchUrl });
      // nullify fetch
      if (!fetchUrl) {
        return;
      }
      // Check if the data is in the cache
      if (cache.has(fetchUrl)) {
        // console.log('Using cached data');
        const cacheData = cache.get(fetchUrl);
        console.log(cacheData);
        dispatch(setroommateData(cacheData.payload));
        setIsLoading(false);
        return;
      }
      const abortController = new AbortController();
      try {
        dispatch(setSearchQuery(null));
        const response = await dispatch(Fetchroommate(fetchUrl));
        cache.set(fetchUrl, response);
        console.log(response);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
        }
      } finally {
        setIsLoading(false);
        console.log(fetchUrl);
        return () => abortController.abort();
      }
    };
    fetchData();
  }, [dispatch, storelocation]);

  // roommate sorting function
  const sortedRoommates = useMemo(() => {
    setIsLoading(true);

    if (!RoommatesData || !location) return [];
    setIsLoading(false);

    return [...RoommatesData.data?.roommates].sort((a: any, b: any) => {
      // Compare function to check if values are the same, returning a boolean score
      const isSame = (x: string, y: string) => (x === y ? 1 : 0);

      // Step 1: Sort by nearbyUniversity similarity with localGovernmentArea
      const nearbyUniversityA = isSame(
        a.nearbyUniversity,
        location.localGovernmentArea
      );
      const nearbyUniversityB = isSame(
        b.nearbyUniversity,
        location.localGovernmentArea
      );
      if (nearbyUniversityA !== nearbyUniversityB) {
        return nearbyUniversityB - nearbyUniversityA; // Sort lodges where nearbyUniversity matches first
      }

      // Step 2: Sort by state similarity
      const stateA = isSame(a.state, location.state);
      const stateB = isSame(b.state, location.state);
      if (stateA !== stateB) {
        return stateB - stateA; // Sort lodges where state matches next
      }

      // Step 3: Sort by country similarity
      const countryA = isSame(a.country, location.country);
      const countryB = isSame(b.country, location.country);
      return countryB - countryA; // Finally, sort lodges where country matches
    });
  }, [RoommatesData, location]);

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

  const MappedRoommates = useMemo(() => {
    return (
      <>
        {sortedRoommates
          .slice(0, showMore ? sortedRoommates.length : 12)
          .map((roommate: any) => (
            <Card
              {...roommate}
              key={roommate._id} // Use roommate._id for consistency with MappedLodges
              imageUrl={optimizeImageUrl(roommate.postedBy.profilePicture)}
              name={roommate.postedBy.firstName} // Consistent property usage
              location={roommate.address_text} // Keep the same as MappedLodges
              nearbyUniversity={roommate.subAdministrativeArea}
              sex={roommate.postedBy.gender} // Additional property specific to roommates
              onClick={() => handleCardClick(roommate)} // Click handler for roommate
            />
          ))}
      </>
    );
  }, [sortedRoommates, showMore, handleCardClick]);

  console.log(RoommatesData);

  return (
    <div className="px-4 sm:px-[100px] mt-[50px] text-[14px] sm:text-[14px]">
      {selectedRoommate && (
        <div>
          <ProfileDetails
            roommate={selectedRoommate}
            onClose={() => setSelectedRoommate(null)}
          />
        </div>
      )}
      <div className="flex justify-between gap-8 text-[14px] items-center text-lgray mb-[24px]">
        <h1 className=" flex flex-wrap  text-lgray ">
          {isSearchTriggered
            ? storequery !== "Not Found" &&
              `Showing results for "${storequery}"`
            : "Showing available roommates around"}
          {storequery == "Not Found" && "No result found"}
        </h1>

        <button
          onClick={() => setShowFiltersModal(true)}
          className={`${
            isSearchTriggered ? "flex" : "hidden"
          } border-2 border-black border-opacity-[40%] items-center gap-4 rounded-full px-[16px] py-[10px]`}
        >
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717408109/utilities/LodgeMate_File/page_info_y6jhz3.svg"
            alt="filter"
          />
          Filter
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {!RoommatesData ? <GallerySkeleton /> : MappedRoommates}
      </div>
      {!showMore && (
        <div className="mt-10 text-[12px] flex flex-col justify-center items-center text-lgray font-medium pb-[200px]">
          <p className=" pb-[16px] ">Continue exploring Services</p>
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
};
export default BrowseRoommates;
