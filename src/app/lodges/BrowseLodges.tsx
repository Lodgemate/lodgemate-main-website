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
} from "@/lib/features/Filters/filterSlice";
import { selectAllAuthenticated } from "@/lib/features/Login/signinSlice";
interface BrowseLodgesProps {
  isSearchTriggered: boolean;
}
const cache = new Map<string, any>();
const BrowseLodges: React.FC<BrowseLodgesProps> = ({
  isSearchTriggered,
}) => {
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  //  (useless for now) const [filters, setFilters] = useState({});
  const [showMore, setShowMore] = useState(false);
  const LodgesData = useAppSelector(selectAllFetchLodgesdata);
  const dispatch = useAppDispatch();
  const storequery = useAppSelector(selectAllQueryFilter);
  const storelocation = useAppSelector(selectAllLocationFilter);
  const isAuth = useAppSelector(selectAllAuthenticated);
  const param = {
    query: storequery,
    location: storelocation,
  };
  
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
   console.log(isAuth)
 const GetToken =async()=>{
  const localStorageToken= localStorage.getItem("token")
  if (!localStorageToken) {
    return null
  }
      const parsedToken=  JSON.parse(localStorageToken)
      return (parsedToken)
 }

  // fetching lodges data
  useEffect(() => {
    const fetchData = async () => {
      const token= await GetToken()
      let fetchUrl;
      if (isAuth && token) {
        // this will be uncommented when db is updated
      // fetchUrl= Endpoints.getPrivateLodges + urlGenerator(param); 
        // this will be deleted when db is updated
      fetchUrl = Endpoints.getPublicLodges + urlGenerator(param);
      }else if( !token){
        fetchUrl = Endpoints.getPublicLodges + urlGenerator(param);
      }
      console.log(fetchUrl);
    // nullify fetch
      if (!fetchUrl) {
      return
     } 
 // Check if the data is in the cache
 if (cache.has(fetchUrl)) {
  // console.log('Using cached data');
  const cacheData=cache.get(fetchUrl)
  dispatch(setLodgesData(cacheData.payload));
  return;
}
      
      const abortController = new AbortController();
      try {
        const response =await dispatch(FetchLodges(fetchUrl));
        cache.set(fetchUrl, response);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
        }
      } finally {
        return () => abortController.abort();
      }
    };
    fetchData();
  }, [dispatch, storequery, storelocation]);

  const handleShowMore = () => {
    setShowMore(true);
  };
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowFiltersModal(false);
    }
  };
  return (
    <div className='px-4 sm:px-[100px] mt-[50px]'>
      <div className='flex justify-between gap-8 items-center text-lgray mb-[24px]'>
        <h1 className='text-[18px] flex flex-wrap sm:text-[24px] text-lgray '>
          {isSearchTriggered
            ? `Showing results for "${storequery}"`
            : "Showing lodges based on your location"}
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
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {LodgesData &&
            LodgesData.data?.lodges
              .slice(0, showMore ? LodgesData.data.lodges.length : 2)
              .map((product: any) => (
                ///@ts-ignore
                <Card
                  {...product}
                  key={product._id}
                  imageUrl={product.coverphoto} // Using the first image
                  name={product.lodgeName}
                  location={product.address_text}
                  nearbyUniversity={product.administrativeArea}
                  price={product.price || 0}
                />
              ))}
        </div>

        {!showMore && (
          <div className='mt-10 flex flex-col justify-center items-center text-lgray font-medium pb-[200px]'>
            <p className='text-[16px] pb-[16px] '>Continue exploring lodges</p>
            <button
              className='border px-4 py-2 rounded-[12px]'
              onClick={handleShowMore}
            >
              Show more
            </button>
          </div>
        )}
      </div>

      {/* Filters Modal */}
      {showFiltersModal && (
        <div
          className='fixed top-0 left-0 right-0 bottom-0 px-1 bg-black bg-opacity-25 flex justify-center z-50'
          onClick={handleModalClick}
        >
          <div className='bg-white  rounded-[20px]  w-[768px] mt-6 max-h-[80vh] no-scrollbar overflow-y-auto'>
            {/* Header */}
            <div className='flex relative justify-center p-2 items-center mb- border-b bor'>
              <h2 className='text-xl font-bold'>Filters</h2>
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
    </div>
  );
};

export default BrowseLodges;
