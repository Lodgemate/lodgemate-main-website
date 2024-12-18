"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLodgesData } from "@/lib/features/Lodges/lodgesSlice";
import { setSearchQuery } from "@/lib/features/Filters/filterSlice";
import { Endpoints } from "@/services/Api/endpoints";
import { useSearchParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useJsApiLoader } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import axios from "axios";
import { selectToken } from "@/lib/features/Auth/tokenSlice";
import { setLoader } from "@/lib/features/Loading/loadingSlice";
import { CiLocationOn } from "react-icons/ci";
import { Loader2 } from "lucide-react";

interface SearchResult {
  lodges: { id: number | string; lodgeName: string }[];
  cities: { id: number | string; address: string }[];
}

interface SearchBarProps {
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const [buttonSearch, setButtonSearch] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [searching, setSearching] = useState(false);
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [results, setResults] = useState<SearchResult>({
    lodges: [],
    cities: [],
  });

  const libraries: ["places"] = ["places"];

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
    libraries,
  });

  // Initialize Places Service
  const [placesService, setPlacesService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    if (isLoaded && !placesService) {
      setPlacesService(new google.maps.places.AutocompleteService());
    }
  }, [isLoaded]);

  const handleSearch = async (searchTerm: string, isQuery: boolean) => {
    setQuery(searchTerm);
    if (!searchTerm) {
      setPredictions([]);
      setResults({ lodges: [], cities: [] });
      return;
    }

    setSearching(true);

    try {
      if (placesService) {
        const { predictions } = await placesService.getPlacePredictions({
          input: searchTerm,
          types: ["geocode"],
        });
        setPredictions(predictions || []);
      }

      if (isQuery) {
        dispatch(
          setLoader({
            loading: true,
            description: "fetching location details",
          })
        );
        dispatch(setSearchQuery(query));
        setQuery("");
        setButtonSearch(true);
      }

      // Fetch custom API results
      const url = `${Endpoints.getPublicLodges}query=${searchTerm}`;
      const res = await axios.get(url);
      if (isQuery) {
        dispatch(setLodgesData(res.data.data));
      }
      setResults(res.data.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
      if (isQuery) {
        dispatch(
          setLoader({
            loading: false,
            description: "",
          })
        );
        setButtonSearch(false);
      }
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query, false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handlePlaceSelect = async (placeId: string, description: string) => {
    try {
      dispatch(
        setLoader({
          loading: true,
          description: "fetching location details",
        })
      );

      const results = await getGeocode({ placeId });
      const { lat, lng } = await getLatLng(results[0]);

      // Extract country from address components
      const addressComponents = results[0].address_components;
      const country =
        addressComponents.find((component) =>
          component.types.includes("country")
        )?.long_name || "";

      console.log({ description });

      dispatch(setSearchQuery(description));
      onSearch();

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
      setQuery("");
      setPredictions([]);
      setResults({ lodges: [], cities: [] });
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

  const renderPredictionIcon = (types: string[]) => {
    // Choose icon based on place type
    if (
      types.includes("locality") ||
      types.includes("administrative_area_level_1")
    ) {
      return "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_10_z9suod.svg";
    } else if (types.includes("establishment")) {
      return "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_9_qyn75o.svg";
    }
    return "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_10_z9suod.svg";
  };

  const formatPredictionLabel = (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    const mainText = prediction.structured_formatting.main_text;
    const secondaryText = prediction.structured_formatting.secondary_text;
    return (
      <div>
        <span className="font-medium">{mainText}</span>
        <span className="text-gray-500 text-xs ml-1">{secondaryText}</span>
      </div>
    );
  };

  return (
    <div className="flex relative justify-center w-full items-center mt-[20px] z-[999]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query, true);
        }}
        className="border-2 p-1 flex justify-between border-stroke rounded-full w-full sm:w-[510px] text-[14px] h-[53px] shadow-md"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full h-full p-2 outline-none"
          placeholder={!isLoaded ? "Loading..." : "Search anywhere..."}
          disabled={!isLoaded || !!loadError}
        />
        <button
          className="bg-primary rounded-full flex justify-center items-center text-white px-6"
          onClick={() => handleSearch(query, true)}
          type="submit"
          disabled={buttonSearch}
        >
          {buttonSearch ? (
            <Loader2 className="h-5 w-5 animate-spin mr-1" />
          ) : (
            <Image
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961596/utilities/LodgeMate_File/Search_1_tf10cm.svg"
              width={30}
              height={40}
              alt="Search"
            />
          )}
          <span>Search</span>
        </button>
      </form>

      {query && (
        <div className="absolute w-full text-[12px] z-20 top-20 sm:w-[510px] bg-white border border-stroke shadow-lg rounded-lg">
          <h3 className="bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold">
            Locations Worldwide
          </h3>
          {predictions.length > 0 ? (
            <div>
              {predictions.map((prediction) => (
                <div
                  key={prediction.place_id}
                  onClick={() =>
                    handlePlaceSelect(
                      prediction.place_id,
                      prediction.description
                    )
                  }
                  className="flex items-center gap-2 py-[7px] px-4 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={renderPredictionIcon(prediction.types)}
                    alt="location"
                    className="w-4 h-4"
                  />
                  {formatPredictionLabel(prediction)}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 w-full my-2 px-4">
              <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
              <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
              <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
            </div>
          )}

          {/* Custom API Results */}
          <div>
            <h3 className="bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold">
              Lodges
            </h3>
            {searching ? (
              <div className="space-y-2 w-full my-2 px-4">
                <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
                <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
                <Skeleton className="w-full h-[18px] rounded-full bg-gray-200" />
              </div>
            ) : results.lodges.length > 0 ? (
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
                  <p>{lodge.lodgeName}</p>
                </Link>
              ))
            ) : (
              <p className="px-4">No similar lodges found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
