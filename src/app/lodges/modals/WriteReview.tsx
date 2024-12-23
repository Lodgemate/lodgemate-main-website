import React, { useState, useEffect, useCallback } from "react";
import AOS from "aos";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/Auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface WriteReviewProps {
  show: boolean;
  onClose: () => void;
  data?: any;
  handlePost: (param: any) => void;
}

const WriteReview: React.FC<WriteReviewProps> = ({
  show,
  onClose,
  handlePost,
  data,
}) => {
  const currentUserData = useAppSelector(selectUser);
  console.log({ currentUserData });
  console.log("writing review");

  const [starSources, setStarSources] = useState<string[]>([
    "/icons/star_black.svg",
    "/icons/star_black.svg",
    "/icons/star_black.svg",
    "/icons/star_black.svg",
    "/icons/star_black.svg",
  ]);

  const [clicked, setClicked] = useState(false);
  const [review, setReview] = useState({
    comment: data?.comment || "", // Use default value if data is undefined
    rating: data?.rating || 0, // Use default value if data is undefined
  });
  const [remainingChars, setRemainingChars] = useState(500);

  const getStars = useCallback(() => {
    const newArr = starSources.filter((ent) => ent === "/icons/star_gold.svg");
    return newArr;
  }, [starSources]);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
    }
  }, [show]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    setReview((prevReview) => ({
      ...prevReview,
      rating: getStars().length,
    }));
  }, [starSources]);

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

  const handleStarClick = (index: number) => {
    const newStarSources = starSources.map((src, i) =>
      i <= index ? "/icons/star_gold.svg" : "/icons/star_black.svg"
    );
    setStarSources(newStarSources);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.target.value;
    setReview({ ...review, comment });
    setRemainingChars(500 - comment.length);
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black z-[999] bg-opacity-50 flex items-start pt-[100px] justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 z-[999] rounded-[12px] shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in-up"
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <img src="/icons/close.svg" alt="" />
        </button>
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 rounded-lg">
              <AvatarImage
                src={currentUserData?.profilePicture}
                alt={currentUserData?.firstName}
              />
              <AvatarFallback className="rounded-lg">
                {currentUserData?.firstName.charAt(0).toUpperCase()}
                {currentUserData?.lastName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">{currentUserData?.firstName}</h1>
              <p className="text-sm text-stone-500">
                {format(new Date(), "PPP")}
              </p>
            </div>
          </div>
        </div>
        <div className="text-gray-700">
          <div className="flex w-full justify-center gap-3">
            {starSources.map((src, index) => (
              <img
                key={index}
                src={src}
                alt=""
                onClick={() => handleStarClick(index)}
                className="cursor-pointer"
              />
            ))}
          </div>
          <textarea
            name="review"
            placeholder="Write something here..."
            value={review.comment}
            onChange={handleCommentChange}
            maxLength={500}
            className="border w-[350px] sm:w-[700px] resize-none mt-4 h-24 p-2 rounded-lg outline-none"
          ></textarea>
          <div className="w-full flex pt-2 justify-between items-center">
            <p className="text-end text-stone-500">
              {remainingChars}/500 remaining
            </p>
            <button
              onClick={() => {
                handlePost(review);
                setClicked(true);
              }}
              className="bg-lblue px-6 py-2 text-white rounded cursor-pointer flex items-center gap-2"
            >
              {clicked ? (
                <>
                  Posting <div className="circularLoader" />
                </>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
