"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import WriteReview from "../../modals/WriteReview";
import DeleteYourReview from "../../modals/DeleteYourReview";
import CallAgent from "../../modals/CallAgent";
import LodgeSaved from "../../modals/LodgeSaved";
import { Endpoints } from "@/services/Api/endpoints";
import { useParams } from "next/navigation";
import { Lodge } from "@/lib/Types";
import Replies from "./Reviews/Modals/RepliesModal";
import LodgeReviews from "./Reviews/LodgeReviews";
import ReviewComments from "./Reviews/Modals/ReplyComment";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";
import DeleteModal from "@/components/modals/DeleteModal";
import { LoadingSkeleton } from "../../../../components/Skeletons/DetalsSkeleton";
import NotFoundPage from "@/app/not-found";
import {
  selectAllReviews,
  setReviews,
} from "@/lib/features/Reviews/ReviewsSlice";
import ChatBtn from "@/components/Shared/chatBtn";
import { selectToken } from "@/lib/features/Auth/tokenSlice";
import Image from "next/image";
import { optimizeImageUrl, removeFromLink } from "@/utils/utils";

interface LodgeInfoProps {
  id: string;
}

interface Feature {
  name: string;
  icon: string;
}

interface Review {
  userAvatar: string;
  userName: string;
  date: string;
  text: string;
  rating: number;
}

const features: Feature[] = [
  {
    name: "Water",
    icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201088/utilities/LodgeMate_File/Vector_1_njk9ml.svg",
  },
  {
    name: "Water heater",
    icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201087/utilities/LodgeMate_File/Vector_2_iqvt3t.svg",
  },
  {
    name: "WiFi",
    icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201086/utilities/LodgeMate_File/Vector_6_vamzbw.svg",
  },
  {
    name: "Proximity to school",
    icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201232/utilities/LodgeMate_File/pro_iztpun.svg",
  },
  {
    name: "Electricity",
    icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201521/utilities/LodgeMate_File/Vector_8_tz6xyw.svg",
  },
  {
    name: "Security",
    icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201086/utilities/LodgeMate_File/Vector_7_rcxtti.svg",
  },
  {
    name: "Parking space",
    icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201086/utilities/LodgeMate_File/Vector_5_ppfwpx.svg",
  },
  {
    name: "Recreation center",
    icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201087/utilities/LodgeMate_File/Vector_4_kjhg0c.svg",
  },
  {
    name: "Provision shop",
    icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201086/utilities/LodgeMate_File/Vector_3_uyvtoc.svg",
  },
];

function LodgeInfo() {
  const params = useParams();
  const { id } = params || {};
  const dispatch = useAppDispatch();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentUserData = useAppSelector(selectAllUsersdata);
  const RevieweData: any = useAppSelector(selectAllReviews);
  const [LodgeData, setLodgeData] = useState<Lodge | null>(null);
  const [showReplies, setshowReplies] = useState(false);
  const [writereply, setwritereply] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isCallAgentOpen, setIsCallAgentOpen] = useState(false);
  const [isLodgeSavedOpen, setIsLodgeSavedOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [commentsOrReplies, setcommentsOrReplies] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const parseToken = useAppSelector(selectToken);

  console.log({ LodgeData });

  const reFetchReviews = async () => {
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
      const fetchUrl = `${Endpoints.getPublicLodgesbyId + id}`;
      const abortController = new AbortController();

      try {
        const res = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const parsedRes = await res.json();
        if (parsedRes.status === "success") {
          setisLoading(false);
          setLodgeData(parsedRes.data.lodge);
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
    setIsLodgeSavedOpen(true);
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
    setIsLodgeSavedOpen(false);
  };

  if (isLoading) {
    return (
      <>
        <LoadingSkeleton />
      </>
    );
  }
  if (!LodgeData) {
    return (
      <>
        <LoadingSkeleton />
      </>
    );
  }

  // Ensure LodgeData.features is defined and of correct type
  const lodgeFeatures = LodgeData.lodgeFeatures || [];

  // Function to get icon URL based on feature name
  const getFeatureIcon = (featureName: string) => {
    const feature = features.find(
      (f) => f.name.toLowerCase() === featureName.toLowerCase()
    );
    return feature ? feature.icon : "";
  };

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const handleReview = async (param: any) => {
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

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(LodgeData.price);

  const photosWithCover = [LodgeData.coverphoto, ...LodgeData.photos];

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photosWithCover.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + photosWithCover.length) % photosWithCover.length
    );
  };
  const chatDetails = {
    firstName: LodgeData.postedBy.firstName,
    lastName: LodgeData.postedBy.lastName,
    gender: LodgeData.postedBy.gender,
    sender: currentUserData?.data.user._id,
    reciver: LodgeData.postedBy._id,
    roomId: `${LodgeData.postedBy._id}-${currentUserData?.data.user._id}`,
    profilePicture: LodgeData.postedBy.profilePicture,
    area: LodgeData.postedBy.administrativeArea,
  };

  console.log({ RevieweData });

  return (
    <div className="text-[14px] capitalize">
      <div className="flex justify-center w-full ">
        <div className="w-full flex max-w-[1200px]">
          <div className="flex w-full flex-col sm:px-[20px] sm:mt-[51px]">
            {/* modals render */}
            <DeleteModal />
            <WriteReview
              show={isWriteReviewOpen}
              onClose={handleCloseWriteReview}
              handlePost={handleReview}
              data={currentUserData}
            />
            <ReviewComments
              show={writereply}
              onClose={() => setwritereply(false)}
              data={commentsOrReplies}
              currentLodge={LodgeData}
              userData={currentUserData}
            />
            <CallAgent
              show={isCallAgentOpen}
              phoneNo={LodgeData.postedBy.phoneNumber}
              onClose={handleCloseCallAgent}
            />{" "}
            <Replies
              show={showReplies}
              onClose={() => setshowReplies(false)}
              data={commentsOrReplies}
              currentLodge={LodgeData}
            />
            <LodgeSaved
              show={isLodgeSavedOpen}
              onClose={handleCloseLodgeSaved}
            />
            {/* the Name of the Product */}
            <h1 className="sm:text-[18px] text-[16px] sm:block hidden font-semibold text-dgray">
              {LodgeData.lodgeName}
            </h1>
            <div className="sm:flex justify-between w-full hidden">
              <div className="flex gap-[24px] items-center">
                <div className="sm:mt-[14px]">
                  <div className="flex gap-2 items-center">
                    <div>
                      <img
                        src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
                        alt=""
                      />
                    </div>

                    {/* the address should be in this paragraph */}
                    <p className=" capitalize">{LodgeData.address_text}</p>
                  </div>

                  <div className="flex gap-2 items-center mt-2">
                    <div>
                      <img
                        src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716817967/utilities/LodgeMate_File/Star_1_n1ombt.svg"
                        alt=""
                      />
                    </div>

                    {/* the avrage review and the number of reviews is suppused to be displayed in this paragraph */}
                    <p className=" capitalize">
                      {LodgeData.ratings.avgRating} •{" "}
                      {LodgeData.ratings.totalRatings} reviews
                    </p>
                  </div>
                </div>

                <div className="h-[50px] w-[1px] bg-lgray opacity-[20%]"></div>

                <div className="flex items-start gap-2">
                  <div>
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716818031/utilities/LodgeMate_File/entypo_price-tag_qrxul2.svg"
                      alt=""
                    />
                  </div>

                  {/* the p tag displays the price of each product  */}
                  <p className="text-[16px] text-dgray border-b pb-2 ">
                    {formattedPrice}.00 /yr
                  </p>
                  {LodgeData.negotiable && (
                    <div className="bg-lskyblue px-2 mt-2 font-bold text-lblue rounded-lg ">
                      {/* this only displays when the product is Negotiable */}
                      <p>Negotiable</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <button
                  onClick={handleOpenLodgeSaved}
                  className="border border-opacity-[8%]  flex rounded-lg py-[4px] gap-2 px-[8px]"
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
        </div>
      </div>
      <div className="sm:mt-[14px] relative">
        <div className="w-full absolute bottom-[50%]">
          <div className="flex justify-between sm:px-[20px]">
            {/* scroll forward and backward buttons */}
            <button
              className="absolute left-4 transform -translate-y-1/2 p-1 px-2 border-lgray border-2 border-opacity-[10%] rounded-full bg-white shadow-lg"
              onClick={() => scroll(-500)}
            >
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716822310/utilities/LodgeMate_File/Polygon_1_1_qouf70.svg"
                alt="back"
                className=" h-"
              />
            </button>
            <button
              className="absolute right-4  transform -translate-y-1/2 p-1 px-2 border-lgray border-2 border-opacity-[10%] rounded-full bg-white shadow-lg"
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
        <div className="flex sm:h-[400px] h-[400px] gap-1 sm:rounded-l-[20px] overflow-hidden sm:ml-[100px]">
          {/* maping can be used to dispay the images */}
          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-scroll scroll-smooth no-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {photosWithCover.map((image, index) => (
              <div key={index} className="flex-none w-[400px] overflow-hidden">
                <Image
                  src={removeFromLink(optimizeImageUrl(image), "w_300,f_auto")}
                  width={600}
                  height={600}
                  quality={100}
                  alt={`image ${index + 1}`}
                  className="object-cover sm:min-h-[400px] min-h-[400px] cursor-pointer"
                  onClick={() => openModal(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-85">
          <button
            className=" absolute sm:top-[80px] top-4 right-4 text-white text-3xl"
            onClick={closeModal}
          >
            &times;
          </button>
          <button
            className="absolute left-4 text-white text-2xl"
            onClick={goToPrevious}
          >
            &#10094;
          </button>
          <div className="max-w-4xl  ">
            <img
              src={photosWithCover[currentIndex]}
              alt={`image ${currentIndex + 1}`}
              className="w-auto sm:h-screen"
            />
          </div>
          <button
            className="absolute right-4 text-white text-2xl"
            onClick={goToNext}
          >
            &#10095;
          </button>
        </div>
      )}

      <h1 className="text-[16px] mt-[24px] mb-[20px] px-4 sm:hidden font-semibold text-dgray">
        {LodgeData.lodgeName}
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
              <p>{LodgeData.address_text}</p>
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
                {LodgeData.ratings.avgRating} • {LodgeData.ratings.userCount}{" "}
                reviews
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
            <p className="text-[16px] text-dgray font-semibold border-b pb-2 ">
              ₦{LodgeData.price} /yr
            </p>
            {LodgeData.negotiable && (
              <div className="bg-lskyblue px-2 ml-2 font-bold mt-3 text-lblue rounded-lg text-[12px]">
                {/* this only displays when the product is Negotiable */}
                <p>Negotiable</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full text-[14px] ">
        <div className="max-w-[1200px] sm:mt-[24px] mt-[24px] px-4 ">
          <div className=" justify-start grid grid-cols-1 sm:grid-cols-3 sm:gap-[100px]">
            <div className="col-span-2">
              <div className="py-[14px]  mb-[14px]- border-lgray border-t-2 sm:border-t-0 border-b-2 border-opacity-[10%]">
                <h2 className="pb-[28-px] text-[16px] mb-[2px] sm:mb-[12px] font-semibold">
                  Description
                </h2>

                {/* this p tag should display the description of the product */}
                <p>{LodgeData.lodgeDescription}</p>
              </div>

              <div className="py-[14px] mb-[14px]- border-lgray border-b-2 border-opacity-[10%]">
                <h2 className="pb-2 sm:pb-[12px]  text-[16px] text-dgray font-semibold">
                  Accommodation features
                </h2>

                {/* this div should use mapping to display all the Accommodation features  of the product */}
                <div className="flex flex-wrap gap-4">
                  {" "}
                  {lodgeFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center px-4 py-2 border-lgray border-2 border-opacity-[10%] rounded-lg"
                    >
                      <img
                        src={getFeatureIcon(
                          typeof feature === "string" ? feature : feature
                        )}
                        alt={typeof feature === "string" ? feature : feature}
                      />
                      <p>{typeof feature === "string" ? feature : feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pb-[1px] mb-[40px] border-lgray border-b-2 border-opacity-[10%]">
                <div className="grid grid-cols-1 sm:grid-cols-2 pt-4 ">
                  <div className="col-span-1 sm:border-r border-b sm:border-b-0 mb-4 border-lgray border-opacity-[20%]">
                    <div>
                      <h2 className="text-[16px] font-semibold text-dgray pb-2 sm:pb-[12px]">
                        Accommodation type
                      </h2>
                      <div className="flex justify-start ">
                        <div className="flex w-fit flex-col justify-center items-center px-[24px] py-[10px] border-2 rounded-lg">
                          <img
                            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716924895/utilities/LodgeMate_File/House_ovdfkw.svg"
                            alt=""
                          />
                          <p className="pt-[8px]">{LodgeData.type}</p>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 pb- ">
                    <div>
                      <h2 className="text-[16px] font-semibold sm:text-end text-dgray pb-2 sm:pb-[12px]">
                        Number of rooms
                      </h2>
                      <div className="flex justify-start sm:justify-end ">
                        <div className="flex w-fit flex-col justify-center items-center px-[24px] py-[10px] border-2 rounded-lg">
                          <img
                            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716924895/utilities/LodgeMate_File/House_ovdfkw.svg"
                            alt=""
                          />
                          <p className="pt-[8px]">
                            {LodgeData.numberOfRooms} bedroom
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
                      <h2 className="text-[16px]">Ratings & Reviews</h2>
                      <div className="h-[24px] w-[2px] bg-black opacity-[30%]"></div>
                      <div className="flex items-center ">
                        <img
                          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716926291/utilities/LodgeMate_File/home_pin_v3bj7d.svg"
                          alt=""
                        />
                        <p className="text-[12px]">
                          {LodgeData.ratings.avgRating} •{" "}
                          {LodgeData.ratings.userCount} reviews
                        </p>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={handleOpenWriteReview}
                        className="flex items-center text-[12px] gap-2 px-[6px] py-[6px] border-2 rounded-lg border-opacity-[30%] "
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
                  {/* /v1/lodges/reviews/:id */}
                  <div className=" gap-10 text-[15px]">
                    use maping here too for the reviwes
                    {RevieweData && (
                      <LodgeReviews
                        LodgeData={LodgeData}
                        currentUserData={currentUserData}
                        data={RevieweData}
                        showReplies={handleViewReplies}
                        replycomment={handleReplies}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex sm:w-[300px] flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center w-full p-[20px] border-2 border-opacity-[40%] rounded-[20px] py-[28px] shadow-lg">
                  <h2 className="text-[16px] font-bold mb-[18px]">
                    Contact owner
                  </h2>
                  <Link
                    href={`/profile/${LodgeData.postedBy._id}`}
                    className="w-full text-center cursor-pointer border-2 rounded-lg border-opacity-[20px] py-[12px] mb-[18px]"
                  >
                    View profile
                  </Link>

                  <div className="h-[3px] w-full mb-[18px] bg-black opacity-[10%] "></div>
                  <button
                    onClick={handleOpenCallAgent}
                    className="w-full border-2 rounded-lg border-opacity-[20px] py-[12px] mb-[18px]"
                  >
                    Call
                  </button>

                  <ChatBtn details={chatDetails} />
                  <div className="flex items-center gap-4">
                    {" "}
                    <Link href="#">
                      <img
                        src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Facebook_ryntge.svg"
                        alt=""
                      />
                    </Link>{" "}
                    <Link href="#">
                      <img
                        src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Instagram_vwhjji.svg"
                        alt=""
                      />
                    </Link>
                    <Link href="#">
                      <img
                        src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Twitter_ffgjak.svg"
                        alt=""
                      />
                    </Link>
                    <Link href="">
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
                          {LodgeData.ratings.avgRating} •{" "}
                          {LodgeData.ratings.userCount} reviews
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

                <div>
                  <div className="gap-10  text-[15px]">
                    {RevieweData && (
                      <LodgeReviews
                        LodgeData={LodgeData}
                        currentUserData={currentUserData}
                        data={RevieweData}
                        showReplies={handleViewReplies}
                        replycomment={handleReplies}
                      />
                    )}
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

export default LodgeInfo;
