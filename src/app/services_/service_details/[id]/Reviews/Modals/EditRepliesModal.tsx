import React, { useState, useEffect, useCallback, useMemo } from "react";
import AOS from "aos";
import { FetchApi } from "@/utils/Fetchdata";
import { Endpoints } from "@/services/Api/endpoints";

interface EditRepliesModalProps {
  show: boolean;
  onClose: () => void;
  LodgeDataId: any;
  ReviewData: any;
  ReplyDataId: any;
}

const EditRepliesModal: React.FC<EditRepliesModalProps> = React.memo(
  ({ show, onClose, LodgeDataId, ReviewData, ReplyDataId }) => {
    const ReviewDataId = ReviewData._id;
    useEffect(() => {
      AOS.init({
        duration: 1000,
      });
    }, []);
    console.log(LodgeDataId);
    useEffect(() => {
      if (show) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }

      return () => {
        document.body.style.overflow = "unset";
      };
    }, [show]);

    if (!show) {
      return null;
    }

    // const handlePost = useCallback(async () => {
    //   const localStorageToken = localStorage.getItem("token");
    //   const parseToken = localStorageToken && JSON.parse(localStorageToken);
    //   const Url = `${Endpoints.getPrivateLodgesbyId}${currentlodgeId}/reviews/${currentReviewId}/replies`;
    //   const body = {
    //     method: "GET",
    //     headers: {
    //       "content-type": "application/json",
    //       Authorization: `Bearer ${parseToken}`,
    //     },
    //   };

    //   const res = await FetchApi(Url, body);
    //   const parsedRes: any = await res;
    //   if (parsedRes.status === "success") {
    //     setReplies(parsedRes);
    //   }
    // }, [currentlodgeId, currentReviewId]);
    const handleEditReview = async (param: any) => {
      const localStorageToken = localStorage.getItem("token");
      const parseToken = localStorageToken && JSON.parse(localStorageToken);
      const Url = `${Endpoints.getPrivateLodgesbyId}${LodgeDataId}/reviews/${ReviewDataId}/replies/${ReplyDataId}`;
      console.log(Url);
      console.log(param);
      const body = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parseToken}`,
        },
        body: JSON.stringify({
          comment: param,
        }),
      };
      const res: any = await FetchApi(Url, body);
      console.log(res);
      if (res.status === "success") {
        onClose();
      } else {
      }
    };

    const ReplyFormUi = () => {
      const [Review, setReview] = useState("");
      console.log(Review);
      return (
        <>
          <div className='ml-5 pt-3 border-t border-t-lblue text-sm'>
            <div className='flex gap-2'>
              <img
                src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1720745689/utilities/LodgeMate_File/Img_jccfin.svg'
                alt=''
              />
              <div>
                <h1 className='font-semibold'>McGreggor</h1>
                <p>05/05/23</p>
              </div>
            </div>
          </div>
          <div className='pl-5 text-gray-700'>
            <textarea
              name='review'
              placeholder='Write something here...'
              value={Review} // Bound to state
              onChange={(e) => setReview(e.target.value)}
              className='border w-[350px]  resize-none mt-4 h-24 p-2 rounded-lg outline-none'
            ></textarea>
            <div className='w-full flex justify-between items-center'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEditReview(Review);
                }}
                className='bg-primary px-2 py-1 text-white rounded cursor-pointer'
              >
                Reply
              </button>
              <p className='text-end text-[12px]'>500/500 remaining</p>
            </div>
          </div>
        </>
      );
    };

    // const MainComment = () => {
    //   return (
    //     <div className='text-sm mb-3'>
    //       <div className='flex justify-between items-start'>
    //         <div
    //           // key={index}
    //           className='flex  w-full gap-x-4 items-start gap-4 mb-[15px]'
    //         >
    //           <div>
    //             <img
    //               src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1720745689/utilities/LodgeMate_File/Img_jccfin.svg'
    //               alt={ReviewData.postedBy.firstName}
    //               className='w-10 h-10 rounded-full'
    //             />
    //           </div>
    //           <div>
    //             <p className='font-bold'>{ReviewData.postedBy.firstName}</p>
    //             <p className=' text-gray-600'>{"review.date"}</p>
    //             <div className='flex items-center gap-1 '>
    //               <p>{ReviewData.rating}.0</p> •
    //               {[...Array(ReviewData.rating)].map((_, starIndex) => (
    //                 <img
    //                   key={starIndex}
    //                   src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717204625/utilities/LodgeMate_File/Star_1_mygzqr.svg'
    //                   alt='rating'
    //                 />
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <p>{ReviewData.comment}</p>
    //     </div>
    //   );
    // };

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-start pt-[100px]  justify-center"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-[12px]  shadow-lg relative"
          onClick={(e) => e.stopPropagation()}
          data-aos="zoom-in-up"
        >
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <img src="/icons/close.svg" alt="" />
          </button>
          {/* <MainComment /> */}
          <ReplyFormUi />
        </div>
      </div>
    );
  }
);

export default EditRepliesModal;
