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
import axios from "axios";

interface PlaceDetails {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

// Define the libraries we need
const libraries: "places"[] = ["places"];

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

interface Product {
  // Define Product interface
  id: number;
  type: string;
  name: string;
  address: string;
  university: string;
}

interface SearchResult {
  // Define SearchResult interface
  lodges: { id: number | string; name: string }[];
  cities: { id: number | string; address: string }[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = useAppSelector(selectAllFetchLodgesdata);
  const searchTerm = searchParams.get("q");
  const [query, setQuery] = useState<string>("");
  const [searching, setsearching] = useState(false);
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const PlacesAutocomplete: React.FC = () => {
    const handleKeyDown = async () => {
      try {
        const res = await axios.get(
          `https://api.lodgemate.com.ng/v1/lodges?lng=${placeDetails?.longitude}&lat=${placeDetails?.latitude}`
        );
        console.log({ res });
      } catch (error) {}
    };

    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: "AIzaSyAT2e0pEJTw05c58G5VKux66rTOfd5EZLg",
      libraries,
    });

    const handlePlaceSelect = useCallback(() => {
      const autocomplete = autocompleteRef.current;

      if (!autocomplete) return;

      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        console.error("No details available for input: " + place.name);
        return;
      }

      // Safely extract latitude and longitude
      const location = place.geometry.location;
      console.log({ location });
      const lat = location.lat();
      const lng = location.lng();

      setPlaceDetails({
        name: place.name || "",
        address: place.formatted_address || "",
        latitude: lat,
        longitude: lng,
      });
    }, []);

    // Handle loading and error states
    if (loadError) {
      return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <div className="relative w-full">
        <input
          type="text"
          id="autocomplete"
          placeholder="Enter a location"
          className="w-full p-2 h-full rounded-full outline-none"
          onKeyDown={handleKeyDown}
          ref={(ref) => {
            if (ref) {
              const autocomplete = new window.google.maps.places.Autocomplete(
                ref,
                {
                  types: ["geocode"], // Limit to address types
                  fields: ["name", "geometry", "formatted_address"],
                }
              );

              autocomplete.addListener("place_changed", handlePlaceSelect);
              autocompleteRef.current = autocomplete;
            }
          }}
        />
      </div>
    );
  };

  const filterResults = (query: string, data: any): SearchResult => {
    // Function to filter results
    const lowercaseQuery = query.toLowerCase(); // Convert query to lowercase
    const lodges: { id: number | string; name: string }[] = [];
    const cities: { id: number | string; address: string }[] = [];

    if (!data) {
      return { lodges, cities };
    }
    data.data.lodges.forEach((product: any) => {
      // Iterate through products data
      // Check if product type is lodge
      if (product.lodgeName) {
        lodges.push({
          name: product.lodgeName,
          id: product._id,
        }); // Add lodge to lodges array
      }
      if (
        product.address_text.toLowerCase().includes(lowercaseQuery) && // Filter by address
        cities.length < 3
      ) {
        cities.push({
          id: product._id,
          address: product.address_text.split(",")[1].trim(), // Extract city from address
        });
      }
    });

    return { lodges, cities }; // Return filtered results
  };
  const [results, setResults] = useState<SearchResult>({
    lodges: [],
    cities: [],
  });

  useEffect(() => {
    const fetchSuggestion = async () => {
      setsearching(true);
      if (query) {
        const url = `${Endpoints.getPublicLodges}query=${query}`;
        console.log({ url, query });

        const res = await debounceFetch(url);
        console.log({ res });
        const filteredResults = filterResults(query, res);
        setResults(filteredResults);
        setsearching(false);
      } else {
        setsearching(false);
        setResults({ lodges: [], cities: [] });
      }
    };

    const fetchDataFromQuery = async () => {
      console.log({ searchTerm });
      setsearching(true);
      if (searchTerm) {
        const url = `${Endpoints.getPublicLodges}query=${searchTerm}`;
        onSearch();
        const res: any = await debounceFetch(url);
        dispatch(setLodgesData(res));
        if (res.status === "success" && res.data.lodges.length === 0) {
          dispatch(setSearchQuery("Not Found"));
        }
        setsearching(false);
      } else {
        setsearching(false);
        setResults({ lodges: [], cities: [] });
      }
    };

    if (query) {
      fetchSuggestion();
    } else if (searchTerm) {
      fetchDataFromQuery();
    }
  }, [query, searchTerm]);

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

  return (
    <div className="flex relative  justify-center w-full items-center mt-[20px] z-[999] ">
      <div className="border-2 p-1 flex justify-between border-stroke rounded-full w-full sm:w-[510px] text-[14px] h-[53px] shadow-md">
        <PlacesAutocomplete />
        <button
          onClick={handleSearchClick} // Handle search button click
          className="bg-primary rounded-full flex justify-center items-center text-white px-6"
        >
          <Image
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961596/utilities/LodgeMate_File/Search_1_tf10cm.svg"
            width={30}
            height={40}
            alt="Search"
          />
          {searching ? "Searching" : " Search"}
        </button>
      </div>
      {query && ( // Render results if query is not empty
        <div className="absolute w-full text-[12px] z-20 top-20 sm:w-[510px] bg-white border border-stroke shadow-lg rounded-lg ">
          <div className="">
            <h3 className="bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold ">
              Lodges
            </h3>
            {results.lodges.length > 0 ? (
              results.lodges.map((lodge) => (
                <Link
                  key={lodge.id}
                  href={`/lodges/lodge_details/${lodge.id}`}
                  className="flex items-center gap-2 py-[7px] px-4 hover:bg-gray-100"
                >
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_9_qyn75o.svg"
                    alt={lodge.name}
                  />
                  <p>{lodge.name}</p>
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
            {results.cities.length > 0 ? (
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
