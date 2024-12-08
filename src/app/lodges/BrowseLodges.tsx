import React, { useState, useEffect, useMemo } from "react";
import Card from "./Card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectAllFetchLodgesdata,
  setLodgesData,
} from "@/lib/features/Lodges/lodgesSlice";
import { Endpoints } from "@/services/Api/endpoints";
import {
  selectAllLocationFilter,
  selectAllQueryFilter,
} from "@/lib/features/Filters/filterSlice";
import GallerySkeleton from "../../components/Skeletons/cardsSkeleton";
import { selectToken } from "@/lib/features/Auth//tokenSlice";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { optimizeImageUrl } from "@/utils/utils";
import { MdOutlineSearchOff } from "react-icons/md";
import { selectLoading } from "@/lib/features/Loading/loadingSlice";
import { CiLocationOff } from "react-icons/ci";
import { useToast } from "@/hooks/use-toast";

const useGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLocation({ latitude, longitude });
        } catch (error) {
          console.error("Error fetching location data:", error);
          setError("Failed to fetch location data.");
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        if (err.message == "User denied Geolocation") {
        }
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
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
  const { loading, description } = useAppSelector(selectLoading);
  const [useLocation, setUseLocation] = useState<boolean | undefined>(true);
  const [fetchingResentLodges, setFetchingResentLodges] = useState(false);
  const [lodgesBasedOnCurrentLocation, setLodgesBasedOnCurrentLocation] =
    useState<[] | null>(null);
  const { location, error } = useGeolocation();
  const { toast } = useToast();

  useEffect(() => {
    if (loading) {
      setUseLocation(false);
    }
  }, [loading]);

  const fetchLodgesBasedOnCurrentLocation = async () => {
    try {
      if (!location?.latitude) {
        return;
      }

      setIsLoading(true);
      const token = parsedToken;

      const res = await axios.get(
        `https://api.lodgemate.com.ng/v1/lodges?lng=${location.longitude}&lat=${location.latitude}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setLodgesBasedOnCurrentLocation(res.data.data.lodges);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLodgesBasedOnCurrentLocation();
  }, [dispatch, storelocation, location]);

  const MappedLodges = useMemo(() => {
    return (
      <>
        {useLocation ? (
          <>
            {error == "User denied Geolocation" ? (
              <div className="flex flex-col col-span-2 md:col-span-4 mt-10 items-center w-full self-center">
                <CiLocationOff className="h-10 w-10 text-red-500" />
                <>
                  <p className="text-stone-800 text-lg font-semibold">
                    Location denied
                  </p>
                  <p className="text-stone-600">
                    Please turn on your location and reload the page
                  </p>
                </>
              </div>
            ) : lodgesBasedOnCurrentLocation ? (
              <>
                {lodgesBasedOnCurrentLocation?.map(
                  (product: any, i: number) => (
                    <Card
                      {...product}
                      key={`${product.lodgeName}${i}`}
                      imageUrl={optimizeImageUrl(product.coverphoto)}
                      name={product.lodgeName}
                      location={product.address_text}
                      nearbyUniversity={product.subAdministrativeArea}
                      state={product.administrativeArea}
                      price={product.price || 0}
                    />
                  )
                )}
              </>
            ) : (
              <div className="flex flex-col col-span-2 md:col-span-4 mt-10 items-center w-full self-center text-gray-500">
                <MdOutlineSearchOff size={50} />
                <p className="mt-4 text-lgray">
                  Oops! no result found at this location
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {LodgesData?.lodges ? (
              <>
                {LodgesData?.lodges.map((product: any, i: number) => {
                  if (!product.coverphoto) return;

                  return (
                    <Card
                      {...product}
                      key={`${product.lodgeName}${i}`}
                      imageUrl={optimizeImageUrl(product.coverphoto)}
                      name={product.lodgeName}
                      location={product.address_text}
                      nearbyUniversity={product.subAdministrativeArea}
                      state={product.administrativeArea}
                      price={product.price || 0}
                    />
                  );
                })}
              </>
            ) : (
              <div className="flex flex-col col-span-2 md:col-span-4 mt-10 items-center w-full self-center text-gray-500">
                <MdOutlineSearchOff size={50} />
                <p className="mt-4 text-lgray">
                  Oops! no result found at this location
                </p>
              </div>
            )}
          </>
        )}
      </>
    );
  }, [
    showMore,
    useLocation,
    LodgesData,
    loading,
    lodgesBasedOnCurrentLocation,
  ]);

  useEffect(() => {
    const fetchLodges = async () => {
      try {
        setFetchingResentLodges(true);
        const res = await axios.get(Endpoints.getCurrentPublicLodges);
        dispatch(setLodgesData(res.data.data));
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
            defaultChecked
            onCheckedChange={(mode) => setUseLocation(mode)}
            checked={useLocation}
          />
        </div>
      </div>

      <div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ||
          fetchingResentLodges ||
          (loading && description == "fetching lodges from google places") ? (
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
