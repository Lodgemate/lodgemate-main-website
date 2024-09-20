"use client"; // Use client

import Image from "next/image"; // Import Image from Next.js
import React, { useState, useEffect, useCallback } from "react"; // Import React, useState, useEffect from React
import Link from "next/link"; // Import Link from Next.js
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSearchQuery } from "@/lib/features/Filters/filterSlice";
import { selectAllFetchservicesdata, setservicesData } from "@/lib/features/Services/servicesSlice";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Endpoints } from "@/services/Api/endpoints";
import { debounceFetch } from "@/utils/Fetchdata";
import { showFailedModal } from "@/lib/features/Modal/ModalSlice";

interface SearchResult {
  // Define SearchResult interface
  services: { id: number | string; name: string }[];
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
const SearchBar: React.FC<SearchBarProps> = ({ onSearch })=> {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllFetchservicesdata);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q');
  const [searching, setsearching] = useState(false)
  // Define SearchBar component
  const [query, setQuery] = useState<string>(""); // State for query string
  const [results, setResults] = useState<SearchResult>({
    // State for search results
    services: [],
    cities: [],
  });

  useEffect(() => {
    const fetchSuggestion = async () => {
      setsearching(true);

      const localStorageToken = localStorage.getItem("token");
      const parseToken = localStorageToken && JSON.parse(localStorageToken);
  
        const options = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parseToken}`,
          },}
      if (query) {
        const url = `${Endpoints.getPublicServices}query=${query}`;
        console.log(url)
        try {
        const res:any = await debounceFetch(url, options);
        if (res.status === 'success') {
          const filteredResults = filterResults(query, res);
        setResults(filteredResults);
          
        }else if(res.status === 'fail'){
          dispatch(showFailedModal(res.message))
        }
      } catch (error: any) {
          console.log(error.message)
        }finally{
        setsearching(false); 

        }
      } else {
        setsearching(false);
        setResults({ services: [],
          cities: [],});
      }
    };


    
    const fetchDataFromQuery = async () => {
      setsearching(true);
      if (searchTerm) {
        const url = `${Endpoints.getPublicServices}query=${searchTerm}`;
        onSearch();
        const res: any = await debounceFetch(url);
        dispatch(setservicesData(res));
        if (res.status === "success" && res.data.services.length === 0) {
          dispatch(setSearchQuery("Not Found"));
        }
        setsearching(false);
      } else {
        setsearching(false);
        setResults({ services: [],
          cities: [], });
      }
    };

    if (query) {
      fetchSuggestion();
    } else if (searchTerm) {
      fetchDataFromQuery();
    }
  }, [query, searchTerm]);

  const filterResults =(query: string, data: any): SearchResult => {
  
    console.log(data)

    // Function to filter results
    const lowercaseQuery = query.toLowerCase(); // Convert query to lowercase
    const services: { id: number | string; name: string }[] = [];
    const cities: { id: number | string; address: string }[] = [];
    // const schools: { id: number; university: string }[] = [];
    if (!data) {
      return { services, cities };
    }
    data.data.services.forEach((product: any) => {
      // Iterate through products data
      if (
        product.serviceName.toLowerCase().includes(lowercaseQuery) && 
        services.length < 3
      ) {
        services.push({
          name: product.serviceName,
          id: product._id,
        }); // Add service to services array
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


    return { services, cities }; // Return filtered results
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


  return (
    <div className='flex flex-col relative justify-center w-full items-center mt-[20px] z-[990]'>
      <div className='border-2 pl-[24px] p-1 flex justify-between border-stroke rounded-full w-full sm:w-[510px] text-[14px] h-[53px] shadow-md'>
        <input
          type='text'
          placeholder='Enter a service, e.g electrician...'
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
          {searching ? "Searching" : " Search"}
        </button>
      </div>
      <div className='flex mt-6 sm:gap-2 '>
        {/* <p className='text-[12px]'>
      <div className='flex- hidden mt-6 sm:gap-2 '>
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
        </p>{" "} */}
      </div>
      {query && ( // Render results if query is not empty
        <div className='absolute w-full text-[14px] z-20 top-20 sm:w-[510px] bg-white border border-stroke shadow-lg rounded-lg'>
          <div>
            <h3 className='bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold'>
              services
            </h3>
            {results.services.length > 0 ? ( // Render services if found
              results.services.map((services) => (
                <Link
                  key={services.id}
                  href={`/services/service_details/${services.id}`}
                  className='flex items-center gap-2 py-[7px]  px-4'
                >
                  <img
                    src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_9_qyn75o.svg'
                    alt={services.name}
                  />
                  <p>{services.name}</p>
                </Link>
              ))
            ) : (
              <p className='px-4'>{searching ? "Searching" : "No"} similar services found.</p>
            )}
          </div>

          <div className="text-[12px]">
            <h3 className='bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold'>
              Cities
            </h3>
            {results.cities.length > 0 ? ( // Render cities if found
              results.cities.map((city) => (
                <p
                  key={city.id}
                  onClick={() => {
                    setQuery(city.address);
                    handleSearchClick();
                  }}
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
              <p className='px-4'>{searching ? "Searching" : "No"} similar cities found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar; // Export SearchBar component
