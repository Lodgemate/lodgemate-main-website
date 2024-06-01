"use client";


import Link from "next/link";
import React, { useRef } from "react";
import data from "../../../data/data";

interface LodgeInfoProps {
  id: number;
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

function LodgeInfo({ id }: LodgeInfoProps) {
  const LodgeData = data.find((item) => item.id === id);

  if (!LodgeData) {
    return <div>Product not found</div>;
  }

  // Ensure LodgeData.features is defined and of correct type
  const lodgeFeatures = LodgeData.features || [];

  // Function to get icon URL based on feature name
  const getFeatureIcon = (featureName: string) => {
    const feature = features.find(
      (f) => f.name.toLowerCase() === featureName.toLowerCase()
    );
    return feature ? feature.icon : "";
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="px-[100px] mt-[51px]">
        {/* the Name of the Product */}
        <h1 className="text-[24px] font-semibold text-dgray">
          {LodgeData.name}
        </h1>

        <div className="flex justify-between">
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
                <p>{LodgeData.address}</p>
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
                  {LodgeData.averageReview} • {LodgeData.reviewCount} reviews
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
                ₦{LodgeData.price} /yr
              </p>
              {LodgeData.negotiable && (
                <div className="bg-lskyblue px-2 mt-2 font-bold text-lblue rounded-lg text-[15px]">
                  {/* this only displays when the product is Negotiable */}
                  <p>Negotiable</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <button className="border- border-opacity-[8%] border-2 flex rounded-lg py-[10px] gap-2 px-[16px]">
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716817967/utilities/LodgeMate_File/ph_heart-fill_cidon6.svg"
                alt=""
              />
              <p>Save</p>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[24px] relative">
        <div className="w-full absolute bottom-[40%]">
          <div className="flex justify-between px-[20px]">
            {/* scroll forward and backward buttons */}
            <button
              className="absolute left- top-1/2 transform -translate-y-1/2 p-4 border-lgray border-2 border-opacity-[10%] rounded-full bg-white shadow-lg"
              onClick={() => scroll(-500)}
            >
              {" "}
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716822310/utilities/LodgeMate_File/Polygon_1_1_qouf70.svg"
                alt="back"
              />
            </button>
            <button
              className="absolute right-20 top-1/2 transform -translate-y-1/2 p-4 border-lgray border-2 border-opacity-[10%] rounded-full bg-white shadow-lg"
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
        <div className="flex h-[400px] gap-1 rounded-l-[20px] overflow-hidden ml-[100px]">
          {/* maping can be used to dispay the images */}
          <div
            className="flex gap-4 overflow-x-scroll scroll-smooth no-scrollbar"
            style={{ scrollBehavior: "smooth" }}
            ref={scrollContainerRef}
          >
            {" "}
            {LodgeData.images.map((image, index) => (
              <div key={index} className="flex-none">
                <img
                  src={image}
                  alt={`image ${index + 1}`}
                  className="h-[400px] w-[500px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[70px] px-[100px]">
        <div className=" justify-start grid grid-cols-3 gap-[100px]">
          <div className="col-span-2">
            <div className="pb-[40px] mb-[40px] border-lgray border-b-2 border-opacity-[10%]">
              <h2 className="pb-[28-px] text-[24px] mb-[28px]">Description</h2>

              {/* this p tag should display the description of the product */}
              <p>{LodgeData.description}</p>
            </div>

            <div className="pb-[40px] mb-[40px] border-lgray border-b-2 border-opacity-[10%]">
              <h2 className="pb-[28-px] text-[24px] text-dgray">
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
                        typeof feature === "string" ? feature : feature.name
                      )}
                      alt={typeof feature === "string" ? feature : feature.name}
                    />
                    <p>
                      {typeof feature === "string" ? feature : feature.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pb-[40px] mb-[40px] border-lgray border-b-2 border-opacity-[10%]">
              <div className="grid grid-cols-2 ">
                <div className="col-span-1 border-r border-lgray border-opacity-[20%]">
                  <div>
                    <h2 className="text-[24px] text-dgray pb-[28px]">
                      Accommodation type
                    </h2>
                    <div className="flex justify-start ">
                      <div className="flex w-fit flex-col justify-center items-center px-[24px] py-[10px] border-2 rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716924895/utilities/LodgeMate_File/House_ovdfkw.svg"
                          alt=""
                        />
                        <p className="pt-[8px]">
                          {LodgeData.accommodationType}
                        </p>
                      </div>{" "}
                    </div>
                  </div>
                </div>
                <div className="col-span-1  ">
                  <div>
                    <h2 className="text-[24px] text-end text-dgray pb-[28px]">
                      Number of rooms
                    </h2>
                    <div className="flex justify-end ">
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

            <div className="pb-[40px] mb-[40px] border-lgray border-b-2 border-opacity-[10%]">
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
                        {LodgeData.averageReview} • {LodgeData.reviewCount}{" "}
                        reviews
                      </p>
                    </div>
                  </div>

                  <div>
                    <button className="flex items-center gap-2 px-[24px] py-[12px] border-2 rounded-lg border-opacity-[30%] ">
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
                <div className="grid gap-10 grid-cols-2">
                  {/* use maping here too for the reviwes */}
                  {(LodgeData.reviews || []).map((review, index) => (
                    <div>
                      <div className="flex justify-between items-start">
                        <div
                          key={index}
                          className="flex items-start gap-4 px-[24px] mb-[24px]"
                        >
                          <div>
                            <img
                              src={review.userAvatar}
                              alt={review.userName}
                              className="w-10 h-10 rounded-full"
                            />
                          </div>
                          <div>
                            <p className="font-bold">{review.userName}</p>
                            <p className="text-sm text-gray-600">
                              {review.date}
                            </p>
                            <div className="flex items-center gap-1 mt-">
                              <p>{review.rating}.0</p> •
                              {[...Array(review.rating)].map((_, starIndex) => (
                                <img
                                  key={starIndex}
                                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717204625/utilities/LodgeMate_File/Star_1_mygzqr.svg"
                                  alt="rating"
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <button>
                            <img
                              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929511/utilities/LodgeMate_File/ri_more-fill_isbcab.svg"
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                      <p>{review.text}</p>

                     <div className="flex text-dgray font-bold items-center mt-[24px] gap-2">
                      <p className="text-[15px] underline">Read more</p>
                      <div className="h-[16px] w-[1px] bg-black"></div>
                      <p className="text-[15px] underline">
                        See all replies (17)
                      </p>
                      <div className="h-[16px] w-[1px] bg-black"></div>

                      <p className="text-[15px] underline text-[#2271B2]">
                        Reply comment
                      </p>
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex w-[300px] flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center w-full p-[20px] border-2 border-opacity-[40%] rounded-[20px] py-[28px] shadow-lg">
                <h2 className="text-[20px] font-bold mb-[18px]">
                  Contact owner
                </h2>

                <button className="w-full border-2 rounded-lg border-opacity-[20px] py-[12px] mb-[18px]">
                  View profile
                </button>

                <div className="h-[3px] w-full mb-[18px] bg-black opacity-[10%] "></div>
                <button className="w-full border-2 rounded-lg border-opacity-[20px] py-[12px] mb-[18px]">
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
                <button className="flex justify-center rounded-lg py-[12px] items-center gap-4 bg-primary text-white w-full ">
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939371/utilities/LodgeMate_File/Vector_iozdjc.svg"
                    alt=""
                  />
                  Save lodge for visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LodgeInfo;
