import React, { useState, useEffect } from "react";
import Card from "./Card";
import roommates, { Roommate } from "./data";
import FilterOptions from "./FilterOptions";
import ProfileDetails from "./roomate_details/ProfileDetails";
import Link from "next/link";

interface BrowseRoommatesProps {
  selectedCity: string | null;
  selectedSchool: string | null;
  query: string;
  isSearchTriggered: boolean;
}

const BrowseRoommates: React.FC<BrowseRoommatesProps> = ({
  selectedCity,
  selectedSchool,
  query,
  isSearchTriggered,
}) => {
  const [filteredRoommates, setFilteredRoommates] =
    useState<Roommate[]>(roommates);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filters, setFilters] = useState<any>({
    gender: [],
    apartmentOnly: false,
  });
  const [showMore, setShowMore] = useState(false);
    const [selectedRoommate, setSelectedRoommate] = useState<Roommate | null>(
      null
    );


  useEffect(() => {
    if (isSearchTriggered) {
      const lowercaseQuery = query.toLowerCase();
      const newFilteredProducts = roommates.filter((roommate) => {
        return (
          roommate.type === "roommate" &&
          (roommate.name.toLowerCase().includes(lowercaseQuery) ||
            roommate.address.toLowerCase().includes(lowercaseQuery) ||
            roommate.university.toLowerCase().includes(lowercaseQuery))
        );
      });
      setFilteredRoommates(newFilteredProducts);
    } else {
      setFilteredRoommates(roommates);
    }
  }, [query, isSearchTriggered]);

  // Filter roommates based on selected city or school
  useEffect(() => {
    if (selectedCity) {
      setFilteredRoommates(
        roommates.filter((roommate) => roommate.address.includes(selectedCity))
      );
    } else if (selectedSchool) {
      setFilteredRoommates(
        roommates.filter((roommate) =>
          roommate.university.includes(selectedSchool)
        )
      );
    } else {
      setFilteredRoommates(roommates);
    }
  }, [selectedCity, selectedSchool]);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleResetFilters = () => {
    setFilters({
      gender: [],
      apartmentOnly: false,
    });
    setFilteredRoommates(roommates); // Resetting to all products
  };

  const handleApplyFilters = (appliedFilters: any) => {
    setFilters(appliedFilters);
    // Logic to filter the product list based on appliedFilters
    let filtered = roommates.filter((roommate) => {
      const matchesGender =
        appliedFilters.gender.length === 0 ||
        appliedFilters.gender.includes(roommate.sex);
      const matchesApartment =
        !appliedFilters.apartmentOnly || roommate.availableSpace;

      return matchesGender && matchesApartment;
    });
    setFilteredRoommates(filtered);
    setShowFiltersModal(false); // Close modal after applying filters
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowFiltersModal(false);
    }
  };

   const handleCardClick = (roommate: Roommate) => {
     setSelectedRoommate(roommate);
   };











  //  const [showFiltersModal, setShowFiltersModal] = useState(false);
  //  //  (useless for now) const [filters, setFilters] = useState({});
  //  const [showMore, setShowMore] = useState(false);
  //  const LodgesData = useAppSelector(selectAllFetchLodgesdata);
  //  const dispatch = useAppDispatch();
  //  const storequery = useAppSelector(selectAllQueryFilter);
  //  const storelocation = useAppSelector(selectAllLocationFilter);
  //  const isAuth = useAppSelector(selectAllAuthenticated);
  //  const param = {
  //    query: storequery,
  //    location: storelocation,
  //  };
   
 
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
 

  const GetToken =async()=>{
   const localStorageToken= localStorage.getItem("token")
   if (!localStorageToken) {
     return null
   }
       const parsedToken=  JSON.parse(localStorageToken)
       return (parsedToken)
  }
 
   // fetching lodges data
//    useEffect(() => {
//      const fetchData = async () => {
//        const token= await GetToken()
//        let fetchUrl;
//        if (isAuth && token) {
//          // this will be uncommented when db is updated
//        // fetchUrl= Endpoints.getPrivateLodges + urlGenerator(param); 
//          // this will be deleted when db is updated
//        fetchUrl = Endpoints.getPublicLodges + urlGenerator(param);
//        }else if( !token){
//          fetchUrl = Endpoints.getPublicLodges + urlGenerator(param);
//        }
//        console.log(fetchUrl);
//      // nullify fetch
//        if (!fetchUrl) {
//        return
//       } 
//   // Check if the data is in the cache
//   if (cache.has(fetchUrl)) {
//    // console.log('Using cached data');
//    const cacheData=cache.get(fetchUrl)
//    dispatch(setLodgesData(cacheData.payload));
//    return;
//  }
       
//        const abortController = new AbortController();
//        try {
//          const response =await dispatch(FetchLodges(fetchUrl));
//          cache.set(fetchUrl, response);
//        } catch (error: any) {
//          if (error.name !== "AbortError") {
//            console.error("Error fetching data:", error);
//          }
//        } finally {
//          return () => abortController.abort();
//        }
//      };
//      fetchData();
//    }, [dispatch, query, storelocation]);
 
//    const handleShowMore = () => {
//      setShowMore(true);
//    };
//    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
//      if (e.target === e.currentTarget) {
//        setShowFiltersModal(false);
//      }
//    };
















  return (
    <div>
      {selectedRoommate && (
        <div>
          <ProfileDetails
            roommate={selectedRoommate}
            onClose={() => setSelectedRoommate(null)}
          />
        </div>
      )}
      <div className="px-4 sm:px-[100px] mt-[50px]">
        <div className="flex justify-between gap-8 items-center text-lgray mb-[24px]">
          <h1 className="text-[18px] sm:text-[24px] text-lgray mb-[24px]">
            {isSearchTriggered
              ? `Showing results for "${query}"`
              : "Showing available roommates around"}
          </h1>
          <button
            onClick={() => setShowFiltersModal(true)}
            className={`${
              isSearchTriggered ? "flex" : "hidden"
            } border-2 border-black border-opacity-[40%] items-center gap-4 rounded-[8px] px-[16px] py-[10px]`}
          >
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717408109/utilities/LodgeMate_File/page_info_y6jhz3.svg"
              alt="filter"
            />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredRoommates
            .filter((roommate) => roommate.type === "roommate") // Filtering to only show lodges
            .slice(0, showMore ? filteredRoommates.length : 8) // Show only the first 8 items initially, then all when showMore is true
            .map((roommate) => (
              <Card
                {...roommate}
                key={roommate.id}
                imageUrl={roommate.images}
                name={roommate.name}
                location={roommate.address}
                nearbyUniversity={roommate.university}
                onClick={() => handleCardClick(roommate)}
              />
            ))}
        </div>

        <div>
          {!showMore && (
            <div className="mt-10 flex flex-col justify-center items-center pb-[200px] text-lgray font-medium">
              <p className="text-[16px] pb-[16px] ">
                Continue exploring lodges
              </p>
              <button
                className="border px-4 py-2 rounded-[12px]"
                onClick={handleShowMore}
              >
                Show more
              </button>

              <Link href="/roommates/find_a_roommate" className="text-primary underline mt-[125px]">Can&apos;t find a roommate?</Link>
            </div>
          )}
        </div>
        {/* Filters Modal */}
        {showFiltersModal && (
          <div
            className="fixed top-0 left-0 right-0 bottom-0 px-1 bg-black bg-opacity-25 flex justify-center z-50"
            onClick={handleModalClick}
          >
            <div className="bg-white relative rounded-[20px]  w-[768px] mt-6 max-h-[80vh] no-scrollbar overflow-y-auto">
              {/* Header */}
              <div className="flex relative justify-center p-2 items-center mb- border-b bor">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setShowFiltersModal(false)}
                  className="text-gray-500  absolute right-4 top-2 hover:text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
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
      </div>{" "}
    </div>
  );
};

export default BrowseRoommates;

