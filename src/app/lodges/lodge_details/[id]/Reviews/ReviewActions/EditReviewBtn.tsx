import { ApiResponse } from '@/lib/Types'
import React from 'react'
import { IoPencil } from 'react-icons/io5'
interface DeleteReviewbtProps{
  data: any,
  LodgeDataId: any
}
const EditReviewBtn:React.FC<DeleteReviewbtProps> = (data,) => {
  return (
      <>
       <IoPencil/>
      </>
  )
}

export default EditReviewBtn