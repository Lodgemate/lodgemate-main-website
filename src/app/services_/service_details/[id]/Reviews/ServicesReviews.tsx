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

interface ServicesReviewsProps {
  data: Review[];
  showReplies: (param: any) => {} | any;
  replycomment: (param: any) => {} | any;
  currentUserData: ApiResponse | null;
  LodgeData: any;
}
const ServicesReviews: React.FC<ServicesReviewsProps> = React.memo(
  ({ data, showReplies, replycomment, currentUserData, LodgeData }) => {

    const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

    const handleOpenWriteReview = () => {
      setIsWriteReviewOpen(true);
    };
    const handleCloseWriteReview = () => {
      setIsWriteReviewOpen(false);
    };
    return (
      <div className=' w-full grid md:grid-cols-2 gap-10'>
        {data.map((review: any, index: number) => {
          return (
            <div className=' bg-slate-50 p-3 rounded'>
              <div className='flex justify-between items-start'>
                <div key={index} className='flex items-start gap-4 mb-[15px]'>
                  <div>
                    <img
                      src={review.postedBy.profilePicture}
                      alt={review.postedBy.firstName}
                      className='w-10 h-10 rounded-full border border-lblue'
                    />
                  </div>
                  <div>
                    <p className='font-medium z-10'>{review.postedBy.firstName}</p>
                    <p className=' text-gray-600 text-sm'>
                      {extractDate(review.dateCreated)}
                    </p>
                    <div className='flex items-center gap-1 mt- text-sm '>
                      <p>{review.rating}.0</p> •
                      {[...Array(review.rating)].map((_, starIndex) => (
                        <img
                          key={starIndex}
                          src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717204625/utilities/LodgeMate_File/Star_1_mygzqr.svg'
                          alt='rating'
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {currentUserData?.data.user._id === review.postedBy._id && (
                  <div>
                    <button>
                      <DeleteReviewbtn
                        LodgeDataId={LodgeData.id}
                        data={review}
                      />
                    </button>
                  </div>
                )}
              </div>
              <div className=' flex justify-between'>
                <div className='text-sm font-medium'>
                  <p>{review.comment}</p>
                </div>

                {currentUserData?.data.user._id === review.postedBy._id && (
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
              </div>
              <p></p>

              <div className='flex text-dgray font-bold items-center mt-[24px] gap-2'>
                {/* <p className='text-[12px] underline'>Read more</p> */}
                <p
                  className='text-[12px] underline cursor-pointer hover:text-lblue'
                  onClick={() => showReplies(review)}
                >
                  See all replies {review.repliesCount}
                </p>
                <p
                  className='text-[12px] underline cursor-pointer hover:text-lblue'
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

export default ServicesReviews;
