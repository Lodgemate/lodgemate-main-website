import { showDeleteModal } from '@/lib/features/Modal/ModalSlice'
import { setReviews } from '@/lib/features/Reviews/ReviewsSlice'
import { useAppDispatch } from '@/lib/hooks'
import { ApiResponse } from '@/lib/Types'
import { Endpoints } from '@/services/Api/endpoints'
import { FetchApi } from '@/utils/Fetchdata'
import React, { useCallback } from 'react'
import { FaTrashCan } from 'react-icons/fa6'

interface DeleteReviewbtProps{
  data: any,
   ServicesDataId: any
}

const DeleteReviewbtn: React.FC<DeleteReviewbtProps> = ({data, ServicesDataId}) => {
  const dispatch= useAppDispatch()

  const fetchData =useCallback(async () => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    try {
      // getting reviews
      const Url = `${Endpoints.getPrivateServicesbyId + ServicesDataId}/reviews`;
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
,[]) 


   const handleDelete=async()=>{
    const localStorageToken = localStorage.getItem("token");
    const parseToken =localStorageToken && JSON.parse(localStorageToken)
    const Url = `${Endpoints.getPrivateServicesbyId}${ServicesDataId}/reviews/${data._id}`;
    console.log(Url)
    const body={
      method: "DELETE",
      headers:{
        'content-type': 'application/json',
      Authorization: `Bearer ${parseToken}`
      }
    }
    const res:any = await FetchApi(Url,body)
    if (res.status === 'success') {
      await fetchData()
      dispatch(showDeleteModal({
        deleteFunction: null,
        message: "",
      }))
    }

      console.log(res)
   }
   const deleteState = {
     deleteFunction: handleDelete,
     message: "You are deleting this review",
   };
  return (
    <>
      <FaTrashCan onClick={()=>dispatch(showDeleteModal(deleteState))}/>
    </>
  )
}

export default DeleteReviewbtn