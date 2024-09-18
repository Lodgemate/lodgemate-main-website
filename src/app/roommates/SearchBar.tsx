"use client"; // Use client

import Image from "next/image"; // Import Image from Next.js
import React, { useState, useEffect, useCallback } from "react"; // Import React, useState, useEffect from React
import Link from "next/link"; // Import Link from Next.js
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSearchQuery } from "@/lib/features/Filters/filterSlice";
import { selectAllFetchroommatedata, setroommateData } from "@/lib/features/Roommates/RoommateSlice";
import ProfileDetails from "./roomate_details/ProfileDetails";
import { Roommate } from "@/lib/Types";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Endpoints } from "@/services/Api/endpoints";
import { debounceFetch } from "@/utils/Fetchdata";

interface SearchResult {
  // Define SearchResult interface
  roommates: { id: number | string; name: string }[];
  cities: { id: number | string; address: string }[];
}
/**
 * Functional component for a search bar in a React application.
 * @returns JSX element for the search bar component.
 */
interface SearchBarProps {
  // Define SearchBarProps interface
  onSearch: () => void; // onSearch prop function signature
}
const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllFetchroommatedata);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q');
  const [searching, setsearching] = useState(false)

  // Define SearchBar component
  const [query, setQuery] = useState<string>(""); // State for query string
  const [results, setResults] = useState<SearchResult>({
    // State for search results
    roommates: [],
    cities: [],
  });
  const [selectedRoommate, setSelectedRoommate] = useState<any>(
    null
  );
  const handleCardClick = (roommate: any) => {
    const res =data?.data.roommates.filter(items=>items._id === roommate)

    setSelectedRoommate(res);
  };
  useEffect(() => {
    
    const fetchSuggestion = async () => {
      setsearching(true)
      if (query) {
        const url = `${Endpoints.getPublicRoommates}query=${query}`;
        console.log(url);
        const res = await debounceFetch(url);
        console.log(res);
        const filteredResults = filterResults(query, res);
        console.log(filteredResults);

        setResults(filteredResults);
    setsearching(false)
      } else {
    setsearching(false)
        setResults({  roommates: [],
          cities: [],});
      }
    };

    const fetchDataFromQuery= async () => {
      setsearching(true)
      if (searchTerm) {

        const url = `${Endpoints.getPublicRoommates}query=${searchTerm}`;
        console.log(url);
        onSearch()
        const res:any = await debounceFetch(url);
        dispatch(setroommateData(res))
        console.log(res);
        if (res.status === 'success' && res.data.roommates.length === 0) {
          dispatch(setSearchQuery("Not Found"));

        }
    setsearching(false)
        
      } else {
    setsearching(false)

        setResults({  roommates: [],
          cities: [],});
      }
    };

    if (query) {
      fetchSuggestion()
    }else if (searchTerm) {
      fetchDataFromQuery()
    }
  }, [query,searchTerm]);

  const filterResults =useCallback((query: string, res: any): SearchResult => {
    // Function to filter results
    const lowercaseQuery = query.toLowerCase(); // Convert query to lowercase
    const roommates: { id: number | string; name: string }[] = [];
    const cities: { id: number | string; address: string }[] = [];
    // const schools: { id: number; university: string }[] = [];
    if (!data) {
      return { roommates, cities };
    }
    res.data.roommates.forEach((product: any) => {
      // Iterate through products data
      if (
        product.postedBy.firstName.toLowerCase().includes(lowercaseQuery) && // Filter by lodge name
        roommates.length < 3
      ) {
        roommates.push({
          name: product.postedBy.firstName,
          id: product._id,
        }); // Add service to roommates array
      }
      if (
        product.address_text.toLowerCase().includes(lowercaseQuery) && // Filter by address
        cities.length < 3
      ) {
        cities.push({
          id: product._id,
          address: product.address_text.split(" ")[1].trim(), // Extract city from address
        });
      }
    });

    return { roommates, cities }; // Return filtered results
  },[query]);

  const handleSearchClick = async () => {
    if (query) {
      dispatch(setSearchQuery(query));
      const paramsquery = new URLSearchParams(searchParams.toString());
      if (query) {
        paramsquery.set('q', query); // Set the search query param
      } else {
        paramsquery.delete('q'); // If no search term, remove the param
      }
      router.push(`?q=${query.toString()}`);
      // Function to handle search button click
      onSearch();
      setQuery(""); // Clear query after search
    }
  };

  return (
    <div className='flex flex-col relative justify-center w-full items-center mt-[20px] z-[990]'>
       {selectedRoommate && (
        <div>
          <ProfileDetails
            roommate={selectedRoommate[0]}
            onClose={() => setSelectedRoommate(null)}
          />
        </div>
      )}
      <div className='border-2 pl-[24px] p-1 flex justify-between border-stroke rounded-full w-full sm:w-[510px] text-[14px] h-[53px] shadow-md'>
        <input
          type='text'
          placeholder='Where do you want to live...?'
          className='rounded-full sm:w-[300px] w-[250px]- w-full bg-white outline-none mr-2'
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Handle input change
        />
        <button
          onClick={handleSearchClick} // Handle search button click
          className='bg-primary rounded-full flex justify-center items-center text-white px-6'
        >
          <Image
            src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961596/utilities/LodgeMate_File/Search_1_tf10cm.svg'
            width={30}
            height={40}
            alt='Search'
          />
          {searching? 'Searching':' Search'}
        </button>
      </div>
      <div className='flex mt-6 sm:gap-2 '>
        <p className='text-[12px]'>
          Your location is set to "Owerri".{" "}
          <span>
            {" "}
            <Link
              href='/'
              className='font-bold text-lblue border-b border-lblue'
            >
              {" "}
              Change location
            </Link>
          </span>{" "}
        </p>{" "}
      </div>
      {query && ( // Render results if query is not empty
        <div className='absolute w-full text-[14px] z-20 top-20 sm:w-[510px] bg-white border border-stroke shadow-lg rounded-lg'>
          <div>
            <h3 className='bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold'>
              roommates
            </h3>
            {results.roommates.length > 0 ? ( // Render roommates if found
              results.roommates.map((roommates) => (
                <div
                onClick={()=>handleCardClick(roommates.id)}
                  className='flex items-center gap-2 py-[7px]  px-4'
                >
                  <img
                    src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_9_qyn75o.svg'
                    alt={roommates.name}
                  />
                  <p>{roommates.name}</p>
                </div>
              ))
            ) : (
              <p className='px-4'>No similar roommates found.</p>
            )}
          </div>

          <div>
            <h3 className='bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold'>
              Cities
            </h3>
            {results.cities.length > 0 ? ( // Render cities if found
              results.cities.map((city) => (
                <p
                 onClick={()=>{
                    setQuery(city.address)
                    handleSearchClick()
                  }}     
                  key={city.id}
                  className='flex items-center gap-2 py-[7px]  px-4'
                >
                  <img
                    src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_10_z9suod.svg'
                    alt={city.address}
                  />
                  <p>{city.address}</p>
                </p>
              ))
            ) : (
              <p className='px-4'>No similar cities found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar; // Export SearchBar component
