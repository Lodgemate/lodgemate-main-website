import React, { useState, useEffect } from "react";
import AOS from "aos";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import { showFailedModal, showSuccessfulModal } from "@/lib/features/Modal/ModalSlice";
import { useAppDispatch } from "@/lib/hooks";

interface ReportProfileProps {
  type: string,
  roommateId:string
  show: boolean;
  onClose: () => void;
}

const ReportProfile: React.FC<ReportProfileProps> = ({
  type,
  roommateId,
  show,
  onClose,
}) => {
  const dispatch = useAppDispatch()
  const [ReportNote, setReportNote] = useState("")
  const [Clicked, setClicked] = useState(false)
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

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
  const handleReport=async()=>{
    setClicked(true)
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
      const url = Endpoints.report;

      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parseToken}`,
        },
        body:JSON.stringify( {
          "type": type,
          "id": roommateId,
          "reason": ReportNote
      })
      };
 try {
   const res: any = await FetchApi(url, options)
   if (res.status === 'success') {
    dispatch(showSuccessfulModal(res.message))
    setTimeout(() => {
    dispatch(showSuccessfulModal(null))
    onClose()
    }, 1000);
   }else{
    throw res
   }
 } catch (error: any) {
   dispatch(showFailedModal(error.message))
 } finally{
  setClicked(false)
 }
  }

  return (
    <div
      className="fixed  z-[999] inset-0 bg-black bg-opacity-50 flex pt-[100px] justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-[12px] shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in-up"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <div className="mb-0"></div>
        <div className="text-gray-700">
          <textarea
            name="review"
            onChange={(e)=>setReportNote(e.target.value)}
            placeholder="Enter a reason for reporting this profile..."
            className="border w-[350px] sm:w-[700px] mb-[50px] resize-none mt-4 h-[200px] p-2 rounded-lg outline-none"
          ></textarea>
          <p className="text-end">500/500 remaining</p>
          <button onClick={handleReport} className=" mb-4 py-4 bg-red-600 font-semibold  w-full rounded-[12px] text-white flex justify-center ">
            {Clicked? 'Reporting profile ':" Report profile"}

          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportProfile;
