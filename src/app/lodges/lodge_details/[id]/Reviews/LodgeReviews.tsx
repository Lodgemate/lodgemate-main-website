import { ApiResponse, user } from '@/lib/Types';
import React from 'react'
import { FaTrashCan } from 'react-icons/fa6';
import { IoPencil } from 'react-icons/io5';
import EditReviewBtn from './ReviewActions/EditReviewBtn';
import DeleteReviewbtn from './ReviewActions/DeleteReviewbtn';
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
    showReplies:(param: any)=>{} | any
    replycomment:(param: any)=>{} | any
    currentUserData: ApiResponse | null
    LodgeData: any
  }
const LodgeReviews:React.FC<LodgeReviewsProps> = React.memo(({ data, showReplies ,replycomment, currentUserData, LodgeData}) => {
console.log(data)
  return (
     <div className=' w-full grid md:grid-cols-2 gap-10'>
       {data.map((review: any, index: number) => (
        <div className=' bg-slate-50 p-3 rounded'>
          <div className='flex justify-between items-start'>
            <div
              key={index}
              className='flex items-start gap-4 mb-[24px]'
            >
              <div>
                <img
                  src={review.profilePicture}
                  alt={review.firstName}
                  className='w-10 h-10 rounded-full border border-lblue'
                />
              </div>
              <div>
                <p className='font-bold'>{review.firstName}</p>
                <p className=' text-gray-600'>{"review.date"}</p>
                <div className='flex items-center gap-1 mt-'>
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

            {currentUserData?.data.user._id === review.postedBy._id  && <div>
              <button>
                <DeleteReviewbtn LodgeDataId={LodgeData.id} data={review} />
              </button>
            </div>}
          </div>
          <div className=" flex justify-between">
            <p>{review.comment}</p>
            {currentUserData?.data.user._id === review.postedBy._id  && <div>
              <button>
                <EditReviewBtn LodgeDataId={LodgeData.id} data={review} />
              </button>
            </div>}
          </div>
          <p></p>

          <div className='flex text-dgray font-bold items-center mt-[24px] gap-2'>
            {/* <p className='text-[12px] underline'>Read more</p> */}
          
            <p className='text-[12px] underline cursor-pointer hover:text-lblue' onClick={()=>showReplies(review)}>
              See all replies {review.repliesCount}
            </p>
          

            <p className='text-[12px] underline cursor-pointer hover:text-lblue' onClick={()=>replycomment(review)}>
              Reply comment
            </p>
          </div>
        </div>
      ))}
     </div>
  
  )
});

export default LodgeReviews