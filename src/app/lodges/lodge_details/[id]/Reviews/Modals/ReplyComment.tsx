import React, { useState, useEffect, useCallback, useMemo } from "react";
import AOS from "aos";
import { FetchApi } from "@/utils/Fetchdata";
import { Endpoints } from "@/services/Api/endpoints";


interface ReviewCommentsProps {
  show: boolean;
  onClose: () => void;
  data: any,
  currentLodge:any 
}

const ReviewComments: React.FC<ReviewCommentsProps> = React.memo(({data, show, onClose,currentLodge }) => {
  const currentlodgeId= currentLodge._id
  const currentReviewId= data?._id
 
   
     useEffect(() => {
       AOS.init({
         duration: 1000,
       });
     }, []);
    console.log(currentLodge._id)
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
    
    const handlePost=async(reply: string)=>{
      console.log(reply)
      const localStorageToken = localStorage.getItem("token");
      const parseToken =localStorageToken && JSON.parse(localStorageToken)
      const Url = `${Endpoints.getPrivateLodgesbyId}${currentlodgeId}/reviews/${currentReviewId}/replies`;
      const body ={
        method: 'PUT',
        headers:{
          "content-type": "application/json",
          Authorization: `Bearer ${parseToken}`
        },
        body: JSON.stringify({"comment":reply})
      }
      console.log(reply)

      console.log(Url)

      const res = await FetchApi(Url, body)
      console.log(await res)
    }
    console.log(data)
    // {
    //   _id: '66bb622dff82c9f4fa2d85e0',
    //   postedBy: {
    //     _id: '669f08b917f07047b9fb6cc6',
    //     firstName: 'Danielsdsd',
    //     profilePicture: 'default.png',
    //     profileLink: 'https://lodgemate.com.ng/p/669f08b917f07047b9fb6cc6',
    //     id: '669f08b917f07047b9fb6cc6'
    //   },
    //   type: 'review',
    //   rating: 3,
    //   comment: 'testing this shii lets see if it works.....',
    //   repliesCount: 0,
    //   dateCreated: '2024-08-13T13:39:57.293Z'
    // }


    const ReplyFormUi = () => {
  const [Review, setReview] = useState('');
      console.log(Review)
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
                onClick={(e)=>{
                  e.preventDefault()
                  handlePost(Review)}}
                className='bg-lblue px-2 py-1 text-white rounded cursor-pointer'
              >
                Reply
              </button>
              <p className='text-end'>500/500 remaining</p>
            </div>
          </div>
        </>
      );
    };
    const MainComment = () => {
      return (
        <div className='text-sm mb-3'>
          <div className='flex justify-between items-start'>
            <div
              // key={index}
              className='flex  w-full gap-x-4 items-start gap-4 mb-[15px]'
            >
              <div>
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1720745689/utilities/LodgeMate_File/Img_jccfin.svg"
                  alt={data.postedBy.firstName}
                  className='w-10 h-10 rounded-full'
                />
              </div>
              <div>
                <p className='font-bold'>{data.postedBy.firstName}</p>
                <p className=' text-gray-600'>{"review.date"}</p>
                <div className='flex items-center gap-1 '>
                  <p>{data.rating}.0</p> •
                  {[...Array(data.rating)].map((_, starIndex) => (
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
          <p>{data.comment}</p>
        </div>
      );
    };
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
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <MainComment/>
        <ReplyFormUi/>
      </div>
    </div>
  );
});


export default ReviewComments;
