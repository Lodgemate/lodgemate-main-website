import { showDeleteModal } from '@/lib/features/Modal/ModalSlice'
import { useAppDispatch } from '@/lib/hooks'
import { ApiResponse } from '@/lib/Types'
import { Endpoints } from '@/services/Api/endpoints'
import { FetchApi } from '@/utils/Fetchdata'
import React from 'react'
import { FaTrashCan } from 'react-icons/fa6'

interface DeleteReviewbtProps{
  data: any,
   LodgeDataId: any
}

const DeleteReviewbtn: React.FC<DeleteReviewbtProps> = ({data, LodgeDataId}) => {
  const dispatch= useAppDispatch()
  console.log(data.comment);

  console.log(data._id)
  console.log(LodgeDataId)
   const handleDelete=async()=>{
    const localStorageToken = localStorage.getItem("token");
    const parseToken =localStorageToken && JSON.parse(localStorageToken)
    const Url = `${Endpoints.getPrivateLodgesbyId}${LodgeDataId}/reviews/${data._id}`;
    console.log(Url)
    const body={
      method: "DELETE",
      headers:{
        'content-type': 'application/json',
      Authorization: `Bearer ${parseToken}`

      }
    }
    const res = await FetchApi(Url,body)
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