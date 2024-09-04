import WriteReview from "@/app/lodges/modals/WriteReview";
import { setReviews } from "@/lib/features/Reviews/ReviewsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import React, { useCallback } from "react";
import { IoPencil } from "react-icons/io5";
interface DeleteReviewbtProps {
  data: any;
  LodgeDataId: any;
  isWriteReviewOpen: any;
  handleCloseWriteReview: any;
}

const EditReviewBtn: React.FC<DeleteReviewbtProps> = ({
  isWriteReviewOpen,
  handleCloseWriteReview,
  data,
  LodgeDataId,
}) => {
  const dispatch = useAppDispatch();

  const reFetchReviews = useCallback(async () => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    try {
      // getting reviews
      const Url = `${Endpoints.getPrivateLodgesbyId + LodgeDataId}/reviews`;
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
  }, []);
  const handleEditReview = async (param: any) => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    const Url = `${Endpoints.getPrivateLodgesbyId}${LodgeDataId}/reviews/${data._id}`;
    const body = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parseToken}`,
      },
      body: JSON.stringify(param),
    };
    const res: any = await FetchApi(Url, body);
    if (res.status === "success") {
      await reFetchReviews();
      handleCloseWriteReview();
    } else {
      console.log("failed");
    }
  };

  return (
    <>
      
      <WriteReview
        show={isWriteReviewOpen}
        onClose={handleCloseWriteReview}
        handlePost={handleEditReview}
      />
<p className="text-[13px] font-medium">Edit</p>    </>
  );
};

export default EditReviewBtn;
