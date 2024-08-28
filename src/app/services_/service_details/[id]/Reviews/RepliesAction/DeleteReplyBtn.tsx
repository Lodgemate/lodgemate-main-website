import { showDeleteModal } from '@/lib/features/Modal/ModalSlice';
import { useAppDispatch } from '@/lib/hooks';
import { Endpoints } from '@/services/Api/endpoints';
import { FetchApi } from '@/utils/Fetchdata';
import React from 'react'
import { FaTrashCan } from 'react-icons/fa6';
interface DeleteReviewbtProps{
  LodgeDataId?: string | number
  ReviewDataId?: string | number
  ReplyDataId?: string | number
  onClose:()=>void
}
const DeleteReplyBtn : React.FC<DeleteReviewbtProps> = ({LodgeDataId,ReviewDataId,ReplyDataId, onClose}) => {
  const dispatch= useAppDispatch()
  const reset = {
    deleteFunction: null,
    message: "",
  };

  const handleDelete = async () => {
  const localStorageToken = localStorage.getItem("token");
  const parseToken = localStorageToken && JSON.parse(localStorageToken);
  const Url = `${Endpoints.getPrivateLodgesbyId}${LodgeDataId}/reviews/${ReviewDataId}/replies/${ReplyDataId}`;
  console.log(Url);
  const body = {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${parseToken}`,
    },
  };
  const res: any = await FetchApi(Url, body);
  if (res.status === "success") {
    onClose();
    dispatch(showDeleteModal(reset));
  } else {
  }
  console.log(res);
  };

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

export default DeleteReplyBtn