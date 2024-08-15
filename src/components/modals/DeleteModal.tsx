import { selectAlldeleteModalModalMssg, showDeleteModal } from '@/lib/features/Modal/ModalSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Blurbg from '@/Ui/shared/Blurbg'
import React from 'react'
 interface deleteModalProps{
    handleDelete: ()=> void,
 }
const DeleteModal:React.FC<deleteModalProps> = ({handleDelete}) => {
    const dispatch = useAppDispatch();
    const failedStatus = useAppSelector(selectAlldeleteModalModalMssg);


    
  return (

    <>
    {
        failedStatus &&
    <Blurbg>
    <div className='w-screeen p-5 py-10 gap-y-5 rounded-lg flex flex-col items-center min-w-[300px] bg-white h-fit relative'>
       <p className=' text-center text-xl font-medium text-slate-800'>
         {failedStatus}
       </p>
       <button onClick={handleDelete} className='bg-lblue px-4 py-2 text-white rounded hover:scale-95 hover:text-slate-300'>
           Delete
       </button>
       <p onClick={()=>dispatch(showDeleteModal(null))} className=" cursor-pointer m-1 text-black absolute z-50 top-0 right-0 ">
       Close
     </p>
     </div>
   </Blurbg>
    }
    </>

  )
}

export default DeleteModal