import WriteReview from '@/app/lodges/modals/WriteReview'
import { ApiResponse } from '@/lib/Types'
import { Endpoints } from '@/services/Api/endpoints'
import { FetchApi } from '@/utils/Fetchdata'
import React from 'react'
import { IoPencil } from 'react-icons/io5'
interface DeleteReviewbtProps{
  data: any,
  LodgeDataId: any
  isWriteReviewOpen: any
  handleCloseWriteReview:any
}
const EditReviewBtn:React.FC<DeleteReviewbtProps> = ({isWriteReviewOpen, handleCloseWriteReview, data, LodgeDataId}) => {
  console.log("data.comment");

  console.log(data._id)
  console.log(LodgeDataId)

   const handleEditReview=async(param: any)=>{
    const localStorageToken = localStorage.getItem("token");
    const parseToken =localStorageToken && JSON.parse(localStorageToken)
    const Url = `${Endpoints.getPrivateLodgesbyId}${LodgeDataId}/reviews/${data._id}`;
    console.log(Url)
    const body={
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parseToken}`,
      },
      body: JSON.stringify(param),
    }
        const res = await FetchApi(Url,body)
      console.log(res)
   }
  return (
      <>
      <WriteReview
                show={isWriteReviewOpen}
                onClose={handleCloseWriteReview}
                handlePost={handleEditReview}
              />
       <IoPencil/>
      </>
  )
}

export default EditReviewBtn