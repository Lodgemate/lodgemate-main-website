"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLodgesData } from "@/lib/features/Lodges/lodgesSlice";
import { setSearchQuery } from "@/lib/features/Filters/filterSlice";
import { Endpoints } from "@/services/Api/endpoints";
import { useSearchParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
import { selectToken } from "@/lib/features/Auth/tokenSlice";
import { setLoader } from "@/lib/features/Loading/loadingSlice";
import Script from "next/script";

interface PlaceDetails {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface SearchBarProps {
  onSearch: () => void;
}

interface SearchResult {
  lodges: { id: number | string; lodgeName: string }[];
  cities: { id: number | string; address: string }[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector(selectToken);
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>("");
  const [searching, setsearching] = useState(false);
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
  const [results, setResults] = useState<SearchResult>({
    lodges: [],
    cities: [],
  });

  const libraries: ["places"] = ["places"];
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data: googlePlaces },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 500,
    requestOptions: {
      types: ["geocode", "establishment"],
    },
    cache: 24 * 60 * 60,
    // initOnMount: true,
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAT2e0pEJTw05c58G5VKux66rTOfd5EZLg",
    libraries,
  });
  console.log({ status, googlePlaces, value, ready, isLoaded });

  const handleSelect = async (description: string) => {
    console.log({ description });
    try {
      dispatch(
        setLoader({
          loading: true,
          description: "fetching lodges from google places",
        })
      );

      setValue(description, false);
      clearSuggestions();

      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);

      setPlaceDetails({
        name: results[0].formatted_address,
        address: results[0].formatted_address,
        latitude: lat,
        longitude: lng,
      });

      dispatch(setSearchQuery(results[0].formatted_address));

      try {
        const res = await axios.get(
          `https://api.lodgemate.com.ng/v1/lodges?lng=${lng}&lat=${lat}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        dispatch(setLodgesData(res.data.data));
      } catch (error) {
        console.error("Error fetching lodges:", error);
      }
    } catch (error) {
      console.error("Error selecting place:", error);
    } finally {
      dispatch(
        setLoader({
          loading: false,
          description: "",
        })
      );
    }
  };

  const fetchDataFromQuery = async (searchTerm: string) => {
    try {
      setsearching(true);
      if (searchTerm) {
        const url = `${Endpoints.getPublicLodges}query=${searchTerm}`;
        onSearch();
        const res = await axios.get(url);
        setResults(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsearching(false);
    }
  };

  const handleSearchClick = async () => {
    if (query) {
      dispatch(setSearchQuery(query));
      const paramsquery = new URLSearchParams(searchParams.toString());
      if (query) {
        paramsquery.set("q", query);
      } else {
        paramsquery.delete("q");
      }
      router.push(`?q=${query.toString()}`);

      onSearch();
      setQuery("");
    }
  };

  useEffect(() => {
    <Script
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
      onLoad={() => console.log("loaded")}
    />;
  }, []);

  return (
    <div className="flex relative  justify-center w-full items-center mt-[20px] z-[999] ">
      <div className="border-2 p-1 flex justify-between border-stroke rounded-full w-full sm:w-[510px] text-[14px] h-[53px] shadow-md">
        <div className="relative w-full">
          <input
            onChange={async (e) => {
              setQuery(e.target.value);
              setValue(e.target.value);
              await fetchDataFromQuery(e.target.value);
            }}
            className="w-full rounded-full h-full p-2 outline-none"
            placeholder={`${
              !ready
                ? "Autocomplete not ready..."
                : !isLoaded
                ? "Loading up google map in a bit"
                : loadError
                ? "Error loading maps"
                : "Enter Location..."
            }`}
          />
        </div>
        <button className="bg-primary rounded-full flex justify-center items-center text-white px-6">
          <>
            <Image
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961596/utilities/LodgeMate_File/Search_1_tf10cm.svg"
              width={30}
              height={40}
              alt="Search"
            />
            <p>Search</p>
          </>
        </button>
      </div>
      {query && (
        <div className="absolute w-full text-[12px] z-20 top-20 sm:w-[510px] bg-white border border-stroke shadow-lg rounded-lg ">
          <div>
            <h3 className="bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold">
              Locations
            </h3>
            {googlePlaces.length > 0 ? (
              googlePlaces.map(({ place_id, description }) => (
                <p
                  key={place_id}
                  onClick={() => {
                    handleSelect(description);
                    clearSuggestions();
                    setQuery("");
                  }}
                  className="flex items-center gap-2 py-[7px] px-4 cursor-pointer hover:bg-gray-100"
                >
                  <CiLocationOn className="h-5 w-5 text-gray-700" />
                  <span className="w-[450px] truncate">{description}</span>
                </p>
              ))
            ) : (
              <p className="px-4 text-gray-700">
                {googlePlaces.length <= 0 ? (
                  <div className="space-y-2 w-full  my-2">
                    <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
                    <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
                    <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
                  </div>
                ) : (
                  "No similar locations found."
                )}
              </p>
            )}
          </div>

          <div className="">
            <h3 className="bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold ">
              Lodges
            </h3>
            {results?.lodges?.length > 0 ? (
              results.lodges.map((lodge) => (
                <Link
                  key={lodge.id}
                  href={`/lodges/lodge_details/${lodge.id}`}
                  className="flex items-center gap-2 py-[7px] px-4 hover:bg-gray-100"
                >
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_9_qyn75o.svg"
                    alt={lodge.lodgeName}
                  />
                  <p className="">{lodge.lodgeName}</p>
                </Link>
              ))
            ) : (
              <p className="px-4">
                {searching ? (
                  <div className="space-y-2 w-full  my-2">
                    <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
                    <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
                    <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
                  </div>
                ) : (
                  "No similar lodges found."
                )}
              </p>
            )}
          </div>

          <div>
            <h3 className="bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold">
              Cities
            </h3>
            {results?.cities?.length > 0 ? (
              results.cities.map((city) => (
                <p
                  key={city.id}
                  onClick={() => {
                    setQuery(city.address);
                    handleSearchClick();
                  }}
                  className="flex items-center gap-2 py-[7px] px-4 hover:bg-gray-100"
                >
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_10_z9suod.svg"
                    alt={city.address}
                  />
                  <p>{city.address}</p>
                </p>
              ))
            ) : (
              <p className="px-4">
                {searching ? (
                  <div className="space-y-2 w-full  my-2">
                    <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
                    <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
                    <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
                  </div>
                ) : (
                  "No similar cities found."
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
