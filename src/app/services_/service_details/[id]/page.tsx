"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import WriteReview from "../../modals/WriteReview";
import CallAgent from "../../modals/CallAgent";
import LodgeSaved from "../../modals/LodgeSaved";
import { Endpoints } from "@/services/Api/endpoints";
import { useParams } from "next/navigation";
import {  Service } from "@/lib/Types";
import { LoadingSkeleton } from "@/components/Skeletons/DetalsSkeleton";
import DeleteYourReview from "../../modals/DeleteYourReview";
import { Lodge } from "@/lib/Types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";
import DeleteModal from "@/components/modals/DeleteModal";
import NotFoundPage from "@/app/not-found";
import {
  selectAllReviews,
  setReviews,
} from "@/lib/features/Reviews/ReviewsSlice";
// location: Coordinates;
// ratings: Ratings;
// _id: string;
// verifiedService: boolean;
// vendor: string;
// coverphoto: string;
// photos: string[];
// serviceName: string;
// serviceCategories: string[];
// otherServiceCategories: string[];
// address_text: string;
// latitude: number;
// longitude: number;
// country: string;
// administrativeArea: string;
// subAdministrativeArea: string;
// minPrice: number;
// maxPrice: number;
// contactForPrice: boolean;
// description: string;
// dateCreated: string;
// id: string;

function ServicesDetails() {
  const params = useParams();
  const { id } = params || {};
  const dispatch = useAppDispatch();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [ServiceData, setServiceData]= useState<Service | null>(null);

  const currentUserData = useAppSelector(selectAllUsersdata);
  const RevieweData: any = useAppSelector(selectAllReviews);
  const [showReplies, setshowReplies] = useState(false);
  const [writereply, setwritereply] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isCallAgentOpen, setIsCallAgentOpen] = useState(false);
  const [isServiceSavedOpen, setIsServiceSavedOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [commentsOrReplies, setcommentsOrReplies] = useState(null);

  const reFetchReviews = async () => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    try {
      // getting reviews
      const Url = `${Endpoints.getPrivateLodgesbyId + id}/reviews`;
      const resReviews = await fetch(Url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parseToken}`,
        },
      });
      // these are all the reviews
      const reviewdata: any = await resReviews.json();
      if (reviewdata.status === "success") {
        dispatch(setReviews(reviewdata.data.reviews));
      }
      // setRevieweData(reviewdata)
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const fetchUrl = `${Endpoints.getPrivateServicesbyId + id}`;
      const abortController = new AbortController();
      const localStorageToken = localStorage.getItem("token");
      const parseToken = localStorageToken && JSON.parse(localStorageToken);
      console.log(fetchUrl)
      try {
        const res = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parseToken}`
          },
        });
        const parsedRes = await res.json();
        console.log(parsedRes)
        if (parsedRes.status === "success") {
          setisLoading(false);
          setServiceData(parsedRes.data.services)
          try {
            // getting reviews
            const Url = `${Endpoints.getPublicServicesbyId + id}/reviews`;
            const resReviews = await fetch(Url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${parseToken}`,
              },
            });
            // these are all the reviews
            const reviewdata: any = await resReviews.json();

            if (reviewdata.status === "success") {
              dispatch(setReviews(reviewdata.data.reviews));
            }

            // setRevieweData(reviewdata)
          } catch (error) {}
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Request aborted");
        } else {
          console.error("Error fetching data:", error.message);
        }
      }
      setisLoading(false);
      return () => {
        abortController.abort(); // Cleanup on unmount
      };
    };

    fetchData();
  }, []);

  const handleOpenCallAgent = () => {
    setIsCallAgentOpen(true);
  };
  const handleOpenLodgeSaved = () => {
    setIsServiceSavedOpen(true);
  };
  const handleOpenWriteReview = () => {
    setIsWriteReviewOpen(true);
  };
  const handleCloseWriteReview = () => {
    setIsWriteReviewOpen(false);
  };
  const handleCloseCallAgent = () => {
    setIsCallAgentOpen(false);
  };
  const handleCloseLodgeSaved = () => {
    setIsServiceSavedOpen(false);
  };

  if (isLoading) {
    return (
      <>
        <LoadingSkeleton />
      </>
    );
  }
  if (!ServiceData) {
    return (
      <div className='h-fit'>
        {/* <NotFoundPage/> */}
        Searching....
      </div>
    );
  }

  // Ensure LodgeData.features is defined and of correct type
  // const lodgeFeatures = ServiceData. || [];

  // Function to get icon URL based on feature name
  // const getFeatureIcon = (featureName: string) => {
  //   const feature = features.find(
  //     (f) => f.name.toLowerCase() === featureName.toLowerCase()
  //   );
  //   return feature ? feature.icon : "";
  // };

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const handleReview = async (param: any) => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    const Url = `${Endpoints.getPrivateLodgesbyId}${id}/reviews`;
    const resReviews = await fetch(Url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parseToken}`,
      },
      body: JSON.stringify(param),
    });
    const parsedRes = await resReviews.json();
    if (parsedRes.status === "success") {
      await reFetchReviews();
      setIsWriteReviewOpen(false);
    } else {
      console.log("failed");
    }
  };
  const handleReplies = (data: any) => {
    setwritereply(true);
    setcommentsOrReplies(data);
  };
  const handleViewReplies = (data: any) => {
    setshowReplies(true);
    setcommentsOrReplies(data);
  };
  return (
    <div>
      <div className="sm:px-[100px] sm:mt-[51px]">
        {/* modals render */}
        <WriteReview
          show={isWriteReviewOpen}
          onClose={handleCloseWriteReview}
        />
        {/* <CallAgent show={isCallAgentOpen} phoneNo={ServiceData.} onClose={handleCloseCallAgent} />{" "} */}
        <LodgeSaved show={isServiceSavedOpen} onClose={handleCloseLodgeSaved} />
        {/* the Name of the Product */}
        <h1 className="sm:text-[24px] text-[20px] sm:block hidden font-semibold text-dgray">
          {ServiceData.serviceName}
        </h1>
        <div className="sm:flex justify-between hidden">
          <div className="flex gap-[24px] items-center">
            <div className="">
              <div className="flex gap-2 items-center">
                <div>
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
                    alt=""
                  />
                </div>

                {/* the address should be in this paragraph */}
                <p>{ServiceData.address_text}</p>
              </div>

              <div className="flex gap-2 items-center">
                <div>
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716817967/utilities/LodgeMate_File/Star_1_n1ombt.svg"
                    alt=""
                  />
                </div>

                {/* the avrage review and the number of reviews is suppused to be displayed in this paragraph */}
                <p>
                  {ServiceData.ratings.avgRating} • {ServiceData.ratings.totalRatings} reviews
                </p>
              </div>
            </div>

            <div className="h-[76px] w-[1px] bg-lgray opacity-[20%]"></div>

            <div className="flex items-start gap-4">
              <div>
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716818031/utilities/LodgeMate_File/entypo_price-tag_qrxul2.svg"
                  alt=""
                />
              </div>

              {/* the p tag displays the price of each product  */}
              <p className="text-[22px] text-dgray border-b pb-2 ">
                ₦{ServiceData.minPrice} /yr
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={handleOpenLodgeSaved}
              className="border- border-opacity-[8%] border-2 flex rounded-lg py-[10px] gap-2 px-[16px]"
            >
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716817967/utilities/LodgeMate_File/ph_heart-fill_cidon6.svg"
                alt=""
              />
              <p>Save</p>
            </button>
          </div>
        </div>
      </div>

      <div className="sm:mt-[24px] relative">
        <div className="w-full absolute bottom-[50%]">
          <div className="flex justify-between sm:px-[20px]">
            {/* scroll forward and backward buttons */}
            <button
              className="absolute left-4 transform -translate-y-1/2 p-4 border-lgray border-2 border-opacity-[10%] rounded-full bg-white shadow-lg"
              onClick={() => scroll(-500)}
            >
              {" "}
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716822310/utilities/LodgeMate_File/Polygon_1_1_qouf70.svg"
                alt="back"
              />
            </button>
            <button
              className="absolute right-4  transform -translate-y-1/2 p-4 border-lgray border-2 border-opacity-[10%] rounded-full bg-white shadow-lg"
              onClick={() => scroll(500)}
            >
              {" "}
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716822310/utilities/LodgeMate_File/Polygon_1_tmzlwn.svg"
                alt="next"
              />
            </button>
          </div>
        </div>

        {/* horizontal scroll div for displayiing the images horizolaly on one line the  */}
        <div className="flex sm:h-[400px] h-[360px] gap-1 sm:rounded-l-[20px] overflow-hidden sm:ml-[100px]">
          {/* maping can be used to dispay the images */}
          <div
            className="flex gap-4 overflow-x-scroll scroll-smooth no-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {ServiceData.photos.map((image, index) => (
              <div key={index} className="flex-none">
                <img
                  src={image}
                  alt={`image ${index + 1}`}
                  className="sm:h-[400px] h-[360px] w-[500px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <h1 className="text-[20px] mt-[24px] mb-[20px] px-4 sm:hidden font-semibold text-dgray">
        {ServiceData.serviceName}
      </h1>

      <div className="  sm:hidden">
        <div className="flex flex-col gap-[14px] px-4">
          <div className="">
            <div className="flex gap-2 pb-2 items-center">
              <div>
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
                  alt=""
                />
              </div>

              {/* the address should be in this paragraph */}
              <p>{ServiceData.address_text}</p>
            </div>

            <div className="flex gap-2 items-center">
              <div>
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716817967/utilities/LodgeMate_File/Star_1_n1ombt.svg"
                  alt=""
                />
              </div>

              {/* the avrage review and the number of reviews is suppused to be displayed in this paragraph */}
              <p>
                {ServiceData.ratings.avgRating} • {ServiceData.ratings.userCount} reviews
              </p>
            </div>
          </div>

          {/* <div className="h-[76px] w-[1px] bg-lgray opacity-[20%]"></div> */}

          <div className="flex items-start gap-1 ">
            <div>
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716818031/utilities/LodgeMate_File/entypo_price-tag_qrxul2.svg"
                alt=""
              />
            </div>

            {/* the p tag displays the price of each product  */}
            <p className="text-[18px] text-dgray font-semibold border-b pb-2 ">
              ₦{ServiceData.minPrice} /yr
            </p>
          </div>
        </div>
      </div>
      {/* <div className="flex px-4 mt-[18px]">
        <div className="h-[1px] w-full flex bg-black opacity-[8%]"></div>
      </div> */}

      <div className="sm:mt-[70px] mt-[24px] px-4 sm:px-[100px]">
        <div className=" justify-start grid grid-cols-1 sm:grid-cols-3 sm:gap-[100px]">
          <div className="col-span-2">
            <div className="py-[18px]  mb-[18px]- border-lgray border-t-2 border-b-2 border-opacity-[10%]">
              <h2 className="pb-[28-px] text-[20px] mb-[2px] sm:mb-[28px]">
                Description
              </h2>

              {/* this p tag should display the description of the product */}
              <p>{ServiceData.description}</p>
            </div>

            <div className="py-[18px] mb-[18px]- border-lgray border-b-2 border-opacity-[10%]">
              <h2 className="pb-2 sm:pb-[28px]  text-[20px] text-dgray font-semibold">
                Accommodation features
              </h2>
            </div>

            <div className="pb-[40px] mb-[40px] border-lgray border-b-2 border-opacity-[10%]">
              <div className="grid grid-cols-1 sm:grid-cols-2 ">
                <div className="col-span-1 sm:border-r border-b sm:border-b-0 pb-6 mb-4 border-lgray border-opacity-[20%]">
                  <div>
                    <h2 className="text-[20px] font-semibold text-dgray pb-2 sm:pb-[28px]">
                      Accommodation type
                    </h2>
                    <div className="flex justify-start ">
                      <div className="flex w-fit flex-col justify-center items-center px-[24px] py-[10px] border-2 rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716924895/utilities/LodgeMate_File/House_ovdfkw.svg"
                          alt=""
                        />
                        <p className="pt-[8px]">
                          {/* {ServiceData.} */}
                        </p>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-[40px] sm:block hidden mb-[40px] border-lgray border-b-2 border-opacity-[10%]">
              <div className="mb-[32px]">
                <div className="flex w-full justify-between">
                  <div className="flex w-fit items-center gap-4">
                    <h2 className="text-[24px]">Ratings & Reviews</h2>
                    <div className="h-[24px] w-[2px] bg-black opacity-[30%]"></div>
                    <div className="flex items-center ">
                      <img
                        src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716926291/utilities/LodgeMate_File/home_pin_v3bj7d.svg"
                        alt=""
                      />
                      <p>
                        {ServiceData.ratings.avgRating} • {ServiceData.ratings.userCount}{" "}
                        reviews
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={handleOpenWriteReview}
                      className="flex items-center gap-2 px-[24px] py-[12px] border-2 rounded-lg border-opacity-[30%] "
                    >
                      <img
                        src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716926488/utilities/LodgeMate_File/fluent_pen-28-regular_miqhhk.svg"
                        alt=""
                      />
                      Write a review
                    </button>
                  </div>
                </div>
              </div>

              <div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex sm:w-[300px] flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center w-full p-[20px] border-2 border-opacity-[40%] rounded-[20px] py-[28px] shadow-lg">
                <h2 className="text-[20px] font-bold mb-[18px]">
                  Contact owner
                </h2>

                <button className="w-full border-2 rounded-lg border-opacity-[20px] py-[12px] mb-[18px]">
                  View profile
                </button>

                <div className="h-[3px] w-full mb-[18px] bg-black opacity-[10%] "></div>
                <button
                  onClick={handleOpenCallAgent}
                  className="w-full border-2 rounded-lg border-opacity-[20px] py-[12px] mb-[18px]"
                >
                  Call
                </button>

                <button className="bg-pri w-full border-2 rounded-lg border-opacity-[20px] py-[12px] mb-[18px] bg-primary text-white">
                  Chat
                </button>
                <div className="flex items-center gap-4">
                  {" "}
                  <Link href="/">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Facebook_ryntge.svg"
                      alt=""
                    />
                  </Link>{" "}
                  <Link href="/">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Instagram_vwhjji.svg"
                      alt=""
                    />
                  </Link>{" "}
                  <Link href="/">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Twitter_ffgjak.svg"
                      alt=""
                    />
                  </Link>{" "}
                  <Link href="/">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/LinkedIn_a3gtp7.svg"
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="my-[40px] flex w-full">
                <button
                  onClick={handleOpenLodgeSaved}
                  className="flex justify-center rounded-lg py-[12px] items-center gap-4 bg-primary text-white w-full "
                >
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939371/utilities/LodgeMate_File/Vector_iozdjc.svg"
                    alt=""
                  />
                  Save lodge for visit
                </button>
              </div>
            </div>
            <div className="pb-[40px]  sm:hidden mb-[40px] border-lgray border-b-2 border-opacity-[10%]">
              <div className="mb-[32px]">
                <div className="flex flex-col w-full gap-4 justify-between">
                  <div className="flex flex-col w-fit  gap-2">
                    <h2 className="text-[24px]">Ratings & Reviews</h2>
                    <div className="flex items-center  ">
                      <img
                        src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716926291/utilities/LodgeMate_File/home_pin_v3bj7d.svg"
                        alt=""
                      />
                      <p>
                        {ServiceData.ratings.avgRating} • {ServiceData.ratings.userCount}{" "}
                        reviews
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={handleOpenWriteReview}
                      className="flex w-full justify-center items-center gap-2 px-[24px] py-[12px] border-2 rounded-lg border-opacity-[30%] "
                    >
                      <img
                        src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716926488/utilities/LodgeMate_File/fluent_pen-28-regular_miqhhk.svg"
                        alt=""
                      />
                      Write a review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default ServicesDetails;
