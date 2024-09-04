import { ApiResponse, user } from "@/lib/Types";
import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { IoPencil } from "react-icons/io5";
import EditReviewBtn from "./ReviewActions/EditReviewBtn";
import DeleteReviewbtn from "./ReviewActions/DeleteReviewbtn";
import WriteReview from "../../../modals/WriteReview";
import { Endpoints } from "@/services/Api/endpoints";
import { extractDate } from "@/utils/utils";
interface Review {
  id: number;
  profilePicture: string;
  firstName: string;
  date: string;
  rating: number;
  text: string;
}

interface LodgeReviewsProps {
  data: Review[];
  showReplies: (param: any) => {} | any;
  replycomment: (param: any) => {} | any;
  currentUserData: ApiResponse | null;
  LodgeData: any;
}
const LodgeReviews: React.FC<LodgeReviewsProps> = React.memo(
  ({ data, showReplies, replycomment, currentUserData, LodgeData }) => {
    const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    };

    const handleOpenWriteReview = () => {
      setIsWriteReviewOpen(true);
    };
    const handleCloseWriteReview = () => {
      setIsWriteReviewOpen(false);
    };
    return (
      <div className=" w-full grid md:grid-cols-2 gap-10">
        {data.map((review: any, index: number) => {
          return (
            <div className=" bg-slate-50-  p-3 rounded-[8px]">
              <div className="flex justify-between items-start">
                <div key={index} className="flex items-start gap-4 mb-[15px]">
                  <div>
                    <img
                      src={review.postedBy.profilePicture}
                      alt={review.postedBy.firstName}
                      className="w-14 h-14 rounded-full border border-lblue"
                    />
                  </div>
                  <div>
                    <p className="font-medium z-10">
                      {review.postedBy.firstName}
                    </p>
                    <p className=" text-gray-600 text-[12px]">
                      {extractDate(review.dateCreated)}
                    </p>
                    <div className="flex items-center gap-1 mt- text-[12px] ">
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

                <div className="relative">
                  <button
                    onClick={togglePopup}
                    className=" text-black px-4 py-2 "
                  >
                    <span>•••</span>
                  </button>

                  {isOpen && (
                    <div className="absolute -bottom-[60px] -left-8 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
                      <div className="bg-white p-2  shadow-lg min-w-[100px] border rounded-[8px]">
                        <button
                          onClick={togglePopup}
                          className=" text-end flex justify-end text-[16px] w-full rounded "
                        >
                          x{" "}
                        </button>
                        {currentUserData?.data.user._id ===
                          review.postedBy._id && (
                          <div>
                            <button onClick={handleOpenWriteReview}>
                              <EditReviewBtn
                                isWriteReviewOpen={isWriteReviewOpen}
                                handleCloseWriteReview={handleCloseWriteReview}
                                LodgeDataId={LodgeData.id}
                                data={review}
                              />
                            </button>
                          </div>
                          )}
                        <hr className="my-1" />
                        {currentUserData?.data.user._id ===
                          review.postedBy._id && (
                          <div>
                            <button>
                              <DeleteReviewbtn
                                LodgeDataId={LodgeData.id}
                                data={review}
                              />
                            </button>
                          </div>
                        )}{" "}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex justify-between">
                <div className="text-[14px] ">
                  <p>{review.comment}</p>
                </div>
              </div>
              <p></p>

              <div className="flex text-dgray font- items-center mt-[24px] gap-2">
                {/* <p className='text-[12px] underline'>Read more</p> */}
                <p
                  className="text-[12px] underline cursor-pointer hover:text-lblue"
                  onClick={() => showReplies(review)}
                >
                  See all replies {review.repliesCount}
                </p>
                <p
                  className="text-[12px] underline cursor-pointer hover:text-lblue"
                  onClick={() => replycomment(review)}
                >
                  Reply comment
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default LodgeReviews;
