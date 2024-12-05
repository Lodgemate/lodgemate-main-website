import React, { useState, useEffect, useMemo } from "react";
import Card from "./Card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectAllFetchLodgesdata,
  setLodgesData,
} from "@/lib/features/Lodges/lodgesSlice";
import { Endpoints } from "@/services/Api/endpoints";
import { urlGenerator } from "@/utils/urlGenerator";
import {
  selectAllLocationFilter,
  selectAllQueryFilter,
  setSearchQuery,
} from "@/lib/features/Filters/filterSlice";
import GallerySkeleton from "../../components/Skeletons/cardsSkeleton";
import { selectToken } from "@/lib/features/Auth//tokenSlice";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { optimizeImageUrl } from "@/utils/utils";

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

const BrowseLodges: React.FC<BrowseLodgesProps> = ({ isSearchTriggered }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const LodgesData = useAppSelector(selectAllFetchLodgesdata);
  const dispatch = useAppDispatch();
  const storequery = useAppSelector(selectAllQueryFilter);
  const storelocation = useAppSelector(selectAllLocationFilter);
  const parsedToken = useAppSelector(selectToken);
  const [resentLodges, setResentLodges] = useState<any>();
  const [displayRecent, setDisplayRecent] = useState<boolean | null>(null);
  const [fetchingResentLodges, setFetchingResentLodges] = useState(false);

  const param = {
    query: storequery !== "Not Found" && storequery,
    location: storelocation,
  };

  const { location } = useGeolocation();
  console.log({ location });

  // fetching lodges data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = parsedToken;
        let fetchUrl;

        if (token) {
          fetchUrl = Endpoints.getPublicLodges;
        }

        if (!fetchUrl) return;
        const lodges = await axios.get(fetchUrl);
        dispatch(setLodgesData(lodges.data.data));
        console.log({ lodges });
      } catch (error: any) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, storelocation]);

  // Lodges sorting function
  // const sortedLodges = useMemo(() => {
  //   setIsLoading(true);

  //   if (!LodgesData || !location) return [];
  //   setIsLoading(false);

  //   return [...LodgesData?.data?.lodges].sort((a: any, b: any) => {
  //     // Compare function to check if values are the same, returning a boolean score
  //     const isSame = (x: string, y: string) => (x === y ? 1 : 0);

  //     // Step 1: Sort by nearbyUniversity similarity with localGovernmentArea
  //     const nearbyUniversityA = isSame(
  //       a.nearbyUniversity,
  //       location.localGovernmentArea
  //     );
  //     const nearbyUniversityB = isSame(
  //       b.nearbyUniversity,
  //       location.localGovernmentArea
  //     );
  //     if (nearbyUniversityA !== nearbyUniversityB) {
  //       return nearbyUniversityB - nearbyUniversityA; // Sort lodges where nearbyUniversity matches first
  //     }

  //     // Step 2: Sort by state similarity
  //     const stateA = isSame(a.state, location.state);
  //     const stateB = isSame(b.state, location.state);
  //     if (stateA !== stateB) {
  //       return stateB - stateA; // Sort lodges where state matches next
  //     }

  //     // Step 3: Sort by country similarity
  //     const countryA = isSame(a.country, location.country);
  //     const countryB = isSame(b.country, location.country);
  //     return countryB - countryA; // Finally, sort lodges where country matches
  //   });
  // }, [LodgesData, location]);

  console.log({ LodgesData });

  const handleShowMore = () => {
    setShowMore(true);
  };

  console.log({ displayRecent });
  const MappedLodges = useMemo(() => {
    return (
      <>
        {displayRecent ? (
          <>
            {resentLodges?.lodges?.map((product: any) => (
              <Card
                {...product}
                key={product._id}
                imageUrl={optimizeImageUrl(product.coverphoto)}
                name={product.lodgeName}
                location={product.address_text}
                nearbyUniversity={product.subAdministrativeArea}
                state={product.administrativeArea}
                price={product.price || 0}
              />
            ))}
          </>
        ) : (
          <>
            {LodgesData && (
              <>
                {LodgesData?.lodges.map((product: any) => (
                  <Card
                    {...product}
                    key={product._id}
                    imageUrl={optimizeImageUrl(product.coverphoto)}
                    name={product.lodgeName}
                    location={product.address_text}
                    nearbyUniversity={product.subAdministrativeArea}
                    state={product.administrativeArea}
                    price={product.price || 0}
                  />
                ))}
              </>
            )}
          </>
        )}
      </>
    );
  }, [showMore, displayRecent, LodgesData]);

  useEffect(() => {
    const fetchLodges = async () => {
      try {
        setFetchingResentLodges(true);
        const res = await axios.get(Endpoints.getCurrentPublicLodges);
        setResentLodges(res.data.data);
        console.log({ res });
      } catch (error) {
        console.log({ error });
      } finally {
        setFetchingResentLodges(false);
      }
    };

    fetchLodges();
  }, []);

  return (
    <div className="px-4 sm:px-[100px] mt-[50px] te xt-[12px] sm:text-[14px] -z-99 ">
      <div className="flex justify-between gap-8 items-center text-lgray mb-[24px]">
        <div className="flex w-full justify-between">
          <h1 className=" flex flex-wrap  text-lgray max-md:hidden">
            {isSearchTriggered
              ? storequery !== "Not Found" &&
                `Showing results for "${storequery}"`
              : "Showing available roommates around"}
            {storequery == "Not Found" && "No result found"}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="airplane-mode" className="truncate text-sm">
            Current Location
          </Label>
          <Switch
            id="airplane-mode"
            onCheckedChange={(mode) => setDisplayRecent(mode)}
          />
        </div>
      </div>

      <div>
        {/* Move to another component and laxzy load it with suspense */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {isLoading || fetchingResentLodges ? (
            <GallerySkeleton />
          ) : (
            MappedLodges
          )}
        </div>
        {/* 
        {!showMore && (
          <div className="mt-10 text-[12px] flex flex-col justify-center items-center text-lgray font-medium pb-[200px]">
            <p className=" pb-[16px] ">Continue exploring lodges</p>
            <button
              className="border px-4 py-2 rounded-[12px]"
              onClick={handleShowMore}
            >
              Show more
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default BrowseLodges;
