"use client"; // Use client

import Image from "next/image"; // Import Image from Next.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link"; // Import Link from Next.js
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectAllFetchLodgesdata,
  setLodgesData,
} from "@/lib/features/Lodges/lodgesSlice";
import { setSearchQuery } from "@/lib/features/Filters/filterSlice";
import { debounceFetch } from "@/utils/Fetchdata";
import { Endpoints } from "@/services/Api/endpoints";
import { urlGenerator } from "@/utils/urlGenerator";
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

interface PlaceDetails {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface SearchBarProps {
  // Define SearchBarProps interface
  onSearch: () => void; // onSearch prop function signature
}

interface SearchResult {
  // Define SearchResult interface
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
    debounce: 300,
    requestOptions: {
      types: ["geocode", "establishment"],
    },
  });

  console.log({ status, googlePlaces, value });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
    libraries,
  });

  const handleSelect = async (description: string) => {
    try {
      setValue(description, false);
      clearSuggestions();

      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      console.log({ lat, lng });

      setPlaceDetails({
        name: results[0].formatted_address,
        address: results[0].formatted_address,
        latitude: lat,
        longitude: lng,
      });

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
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

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
        paramsquery.set("q", query); // Set the search query param
      } else {
        paramsquery.delete("q"); // If no search term, remove the param
      }
      router.push(`?q=${query.toString()}`);
      // Function to handle search button click
      onSearch(); // Execute onSearch callback with query
      setQuery(""); // Clear query after search
    }
  };

  console.log({ results });

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
            disabled={!isLoaded}
            className="w-full rounded-full h-full p-2 outline-none"
            placeholder={`${
              isLoaded
                ? "Loading up google map in a bit"
                : loadError
                ? "Error loading maps"
                : "Enter a location"
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
                    setQuery("");
                  }}
                  className="flex items-center gap-2 py-[7px] px-4 hover:bg-gray-100"
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
