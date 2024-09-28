import React, { useState, useEffect, useMemo } from "react";
import Card from "./Card";
import FilterOptions from "./FilterOptions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  FetchLodges,
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
import { selectAllAuthenticated } from "@/lib/features/Login/signinSlice";
import GallerySkeleton from "../../components/Skeletons/cardsSkeleton";


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

const LocationDisplay: React.FC = () => {
  const { location, error } = useGeolocation();

  if (error) return <div>Error: {error}</div>;
  if (!location) return <div>Loading...</div>;

  return (
    <div>
      <p>Local Government Area: {location.localGovernmentArea}</p>
      <p>State: {location.state}</p>
      <p>Country: {location.country}</p>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
};


interface BrowseLodgesProps {
  isSearchTriggered: boolean;
}
const cache = new Map<string, any>();



const BrowseLodges: React.FC<BrowseLodgesProps> = ({
  isSearchTriggered,
}) => {
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //  (useless for now) const [filters, setFilters] = useState({});
  const [showMore, setShowMore] = useState(false);
  const LodgesData = useAppSelector(selectAllFetchLodgesdata);
  const dispatch = useAppDispatch();
  const storequery = useAppSelector(selectAllQueryFilter);
  const storelocation = useAppSelector(selectAllLocationFilter);
  const isAuth = useAppSelector(selectAllAuthenticated);
  const param = {
    query: storequery !== 'Not Found' && storequery,
    location: storelocation,
  };
  
  const optimizeImageUrl = (url: string) => {
    if (url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/w_300,f_auto/");
    }
    return url;
  };

  const { location } = useGeolocation();

  //  useless for now
  // useEffect(() => {
  //   if (isSearchTriggered) {
  //     const lowercaseQuery = query.toLowerCase();
  //     const newFilteredProducts = products.filter((product) => {
  //       return (
  //         product.type === "lodge" &&
  //         (product.name.toLowerCase().includes(lowercaseQuery) ||
  //           product.address.toLowerCase().includes(lowercaseQuery) ||
  //           product.university.toLowerCase().includes(lowercaseQuery))
  //       );
  //     });
  //     setFilteredProducts(newFilteredProducts);
  //   } else {
  //     setFilteredProducts(products);
  //   }
  // }, [query, isSearchTriggered]);

  //  useless for now ( more optimised version of useeffect above)
  // const filteredProducts = useMemo(() => {
  //   if (isSearchTriggered) {
  //     const lowercaseQuery = query.toLowerCase();
  //     return products.filter((product) => {
  //       return (
  //         product.type === "lodge" &&
  //         (product.name.toLowerCase().includes(lowercaseQuery) ||
  //           product.address.toLowerCase().includes(lowercaseQuery) ||
  //           product.university.toLowerCase().includes(lowercaseQuery))
  //       );
  //     });
  //   }
  //   return products;
  // }, [query, isSearchTriggered]);

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

  const GetToken = async () => {
    const localStorageToken = localStorage.getItem("token");
    if (!localStorageToken) {
      return null;
    }
    const parsedToken = JSON.parse(localStorageToken);
    return parsedToken;
  };

  // fetching lodges data
 useEffect(() => {
   setIsLoading(true);
   const fetchData = async () => {
     const token = await GetToken();
     let fetchUrl;

     if (isAuth && token) {
       fetchUrl = Endpoints.getPublicLodges + urlGenerator(param);
     } else if (!token) {
       fetchUrl = Endpoints.getPublicLodges + urlGenerator(param);
     }

     if (!fetchUrl) return;

     try {
       dispatch(setSearchQuery(null));
       await dispatch(FetchLodges(fetchUrl));
     } catch (error: any) {
       console.error("Error fetching data:", error);
     } finally {
       setIsLoading(false);
     }
   };
   fetchData();
 }, [dispatch, storelocation]);

 // Lodges sorting function
  const sortedLodges = useMemo(() => {
      setIsLoading(true);

    if (!LodgesData || !location) return [];
           setIsLoading(false);


 return [...LodgesData.data?.lodges].sort((a: any, b: any) => {
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


 }, [LodgesData, location]);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowFiltersModal(false);
    }
  };
  const MappedLodges = useMemo(() => {
    return (
      <>
        {sortedLodges
          .slice(0, showMore ? sortedLodges.length : 12)
          .map((product: any) => (
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
    );
  }, [sortedLodges, showMore]);
  return (
    <div className='px-4 sm:px-[100px] mt-[50px] text-[12px] sm:text-[14px] -z-99 '>
      {/* Filters Modal */}
      {showFiltersModal && (
        <div
          className='fixed text-[14px] inset-0  h-screen -top-[50px] bottom-0 px-1 items-center bg-black bg-opacity-25 flex justify-center z-[999]'
          onClick={handleModalClick}
        >
          <div className='bg-white border shadow-lg  rounded-[20px]  w-[768px] mt-6 max-h-[80vh] no-scrollbar overflow-y-auto'>
            {/* Header */}
            <div className='flex relative justify-center p-2 items-center mb- border-b bor'>
              <h2 className='text-[16px] font-bold'>Filters</h2>
              <button
                onClick={() => setShowFiltersModal(false)}
                className='text-gray-500  absolute right-4 top-2 hover:text-gray-800'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
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

      {/* <LocationDisplay /> */}
      <div className='flex justify-between gap-8 items-center text-lgray mb-[24px]'>
        <h1 className=' flex flex-wrap  text-lgray '>
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
          } border-2 border-black border-opacity-[40%] items-center gap-4 rounded-[8px] px-[16px] py-[10px]`}
        >
          <img
            src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717408109/utilities/LodgeMate_File/page_info_y6jhz3.svg'
            alt='filter'
          />
          Filter
        </button>
      </div>

      <div>
        {/* Move to another component and laxzy load it with suspense */}
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 '>
          {isLoading ? <GallerySkeleton /> : MappedLodges}
        </div>

        {!showMore && (
          <div className='mt-10 text-[12px] flex flex-col justify-center items-center text-lgray font-medium pb-[200px]'>
            <p className=' pb-[16px] '>Continue exploring lodges</p>
            <button
              className='border px-4 py-2 rounded-[12px]'
              onClick={handleShowMore}
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseLodges;
