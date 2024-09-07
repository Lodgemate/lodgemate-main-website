import { selectAlldeleteModalModalMssg, showDeleteModal } from '@/lib/features/Modal/ModalSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Blurbg from '@/Ui/shared/Blurbg'
import React, { useEffect, useState } from 'react'

const DeleteModal:React.FC= () => {
    const dispatch = useAppDispatch();
    const deleteData = useAppSelector(selectAlldeleteModalModalMssg);
    const [Clicked, setClicked] = useState(false)
    const handleDelete=deleteData.deleteFunction? deleteData.deleteFunction :()=>{} 
    const reset={
      deleteFunction: null,
      message:""
    }
    useEffect(() => {
      if (Clicked) {
        setClicked(false);
      }
    }, [deleteData]);
  return (
    <>
      {deleteData.deleteFunction && (
        <Blurbg>
          <div className="w-screeen p-5 py-10 gap-y-5 rounded-lg flex flex-col items-center min-w-[300px] bg-white h-fit relative">
            <p className=" text-center text- font-medium text-slate-800">
              {deleteData.message}
            </p>
            <button
              onClick={() => {
                handleDelete();
                setClicked(true);
              }}
              disabled={Clicked}
              className="bg-primary px-4 py-2 text-white rounded hover:scale-95 hover:text-slate-300"
            >
              {Clicked ? (
                <>
                  Deleting... <div className="circularLoader" />
                </>
              ) : (
                "Delete"
              )}
            </button>
            <p
              onClick={() => dispatch(showDeleteModal(reset))}
              className=" cursor-pointer m-1 text-black absolute z-50 top-0 right-0 "
            >
              <img src="/icons/close.svg" alt="" />
            </p>
          </div>
        </Blurbg>
      )}
    </>
  );
}

export default DeleteModal