import React, { useState, useEffect, useCallback } from "react";
import AOS from "aos";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import DeleteReplyBtn from "../RepliesAction/DeleteReplyBtn";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";
import { useAppSelector } from "@/lib/hooks";
import EditReplyBtn from "../RepliesAction/EditReplyBtn";
import { extractDate } from "@/utils/utils";

interface WriteRepliesProps {
  show: boolean;
  onClose: () => void;
  currentLodge: any;
  data: any;
}

const Replies: React.FC<WriteRepliesProps> = React.memo(
  ({ show, onClose, currentLodge, data }) => {
  const currentUserData= useAppSelector(selectAllUsersdata)
    const currentlodgeId = currentLodge._id;
    const currentReviewId = data?._id;
    const [replies, setReplies] = useState(null);
    console.log(data);

    useEffect(() => {
      if (currentlodgeId && currentReviewId) {
        handlePost();
      }
    }, [currentlodgeId, currentReviewId,show]);

    const handlePost = useCallback(async () => {
      const localStorageToken = localStorage.getItem("token");
      const parseToken = localStorageToken && JSON.parse(localStorageToken);
      const Url = `${Endpoints.getPrivateLodgesbyId}${currentlodgeId}/reviews/${currentReviewId}/replies`;
      const body = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${parseToken}`,
        },
      };

      const res = await FetchApi(Url, body);
      const parsedRes: any = await res;
      if (parsedRes.status === "success") {
        setReplies(parsedRes);
      }
    }, [currentlodgeId, currentReviewId]);

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

    console.log(replies);
    const MainComment = ({ content }: any) => {
      return (
        <div className=''>
          {/* comment are her */}
          <div className='flex justify-between items-start'>
            <div
              // key={index}
              className='flex  w-full gap-x-4 items-start gap-4 mb-[10px]'
            >
              <div>
                <img
                  src={content.postedBy.profilePicture}
                  alt={content.postedBy.firstName}
                  className='w-10 h-10 rounded-full border border-lblue'
                />
              </div>
              <div>
                <p className='font-medium text-sm '>{content.postedBy.firstName}</p>
                <p className=' text-gray-600 text-sm'>{extractDate(content.dateCreated)}</p>
                <div className='flex items-center gap-1 mt-'>
                  <p className="text-sm">{content.rating}.0</p> •
                  {[...Array(content.rating)].map((_, starIndex) => (
                    <img
                      key={starIndex}
                      src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717204625/utilities/LodgeMate_File/Star_1_mygzqr.svg'
                      alt='rating'
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm font-medium max-w-60 ml-auto pr-2">{content.comment}</p>
        </div>
      );
    };
    const RepliesUi = ({ content }: any) => {
      return (
        <div className='pl-5 py-2 my-4 border-t border-t-lblue text-sm'>
          {/* replies are her */}
          <div className='flex justify-between items-start'>
            <div
              // key={index}
              className='flex items-start gap-4 mb-[15px]'
            >
              <div>
                <img
                  src={content.postedBy.profilePicture}
                  alt={content.postedBy.firstName}
                  className='w-10 h-10 rounded-full border border-primary'
                />
              </div>
              <div className='text-sm'>
                <p className='font-medium '>{content.postedBy.firstName}</p>
                <p className=' text-gray-600 text-sm'>{extractDate(content.dateCreated)}</p>
              </div>
            </div>
          </div>
          <p className='text-sm font-medium ml-auto max-w-60'>{content.comment}</p>
          <div className=" flex justify-end items-center gap-4 px-2 ">
               {currentUserData?.data.user._id === content.postedBy._id &&
            <DeleteReplyBtn
          LodgeDataId={currentLodge._id}
          ReviewDataId={currentReviewId}
          ReplyDataId={content._id}
          onClose={onClose}
          />
          }
            {currentUserData?.data.user._id === content.postedBy._id &&
            <EditReplyBtn
            LodgeDataId={currentLodge._id}
            ReviewData={data}
            ReplyDataId={content._id}
          />
          }
          </div>
       
        
        
        </div>
      );
    };

    return (
      <div
        className="fixed inset-0 z-[99] bg-black bg-opacity-50 flex items-start pt-[100px]  justify-center"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-[12px]   shadow-lg relative"
          onClick={(e) => e.stopPropagation()}
          data-aos="zoom-in-up"
        >
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <img src="/icons/close.svg" alt="" />
          </button>
          {/* replies are her */}
          <div className="main_container min-w-[300px] max-h-[400px] overflow-y-scroll no-scrollbar h-full w-full  ">
            <MainComment content={data} />
            {/* @ts-ignore */}
            {replies &&
              replies.data.replies.map((data: any, index) => {
                return (
                  <>
                    <RepliesUi content={data} key={index} />
                  </>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
);

export default Replies;
