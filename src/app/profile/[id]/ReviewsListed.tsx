"use client";

import React, { useState } from "react";
import MoreRepliesModal from "./modals/MoreRepliesModal";
import WriteMessageModal from "./modals/WriteReplyModal";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Endpoints } from "@/services/Api/endpoints";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import { selectToken } from "@/lib/features/Auth/tokenSlice";
import { LiaCommentSlashSolid } from "react-icons/lia";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface ReviewCardProps {
  comment: string;
  rating: number;
  dateCreated: string;
  postedBy: {
    profilePicture: string;
    firstName: string;
  };
  repliesCount: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  postedBy: { profilePicture, firstName },
  comment,
  rating,
  dateCreated,
  repliesCount,
}) => {
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick3 = () => {
    setIsModalVisible3(!isModalVisible3);
  };

  const closeModal3 = () => {
    setIsModalVisible3(false);
  };

  return (
    <div className="max-w-full rounded overflow-hidden p-4">
      <MoreRepliesModal isVisible={isModalVisible3} onClose={closeModal3} />
      <WriteMessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="flex items-center mb-2">
        <img
          className="w-12 h-12 rounded-full"
          src={profilePicture}
          alt={firstName}
        />
        <div className="ml-4">
          <div className="font-bold">{firstName}</div>
          <div className="text-gray-500 text-sm">
            {format(dateCreated, "MM/dd/yyyy")}
          </div>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <span className="font-semibold text-yellow-500">{rating}</span>
        <span className="ml-2 text-sm text-gray-500">★ ★ ★ ★ ☆</span>
      </div>
      <p className="text-gray-700 text-sm mb-4">{comment}</p>
      <div className="flex text-[11px] items-center text-blue-500">
        <button className="mr-4" onClick={handleButtonClick3}>
          Read more {">"}
        </button>
        <button className="mr-4" onClick={handleButtonClick3}>
          See all replies ({repliesCount})
        </button>
        <button onClick={() => setIsModalOpen(true)}>Reply comment</button>
      </div>
    </div>
  );
};

const ReviewsListed: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const token = useAppSelector(selectToken);
  console.log(reviews);

  useEffect(() => {
    if (id) {
      const fetchReviews = async () => {
        try {
          const data = await axios.get(
            `${Endpoints.base}/reviews?user=${id}&page=1`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setReviews(data.data.data.reviews);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }
  }, [id]);
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {reviews.length >= 1 ? (
          <>
            {reviews.map((review) => (
              <ReviewCard
                key={review.dateCreated}
                comment={review.comment}
                postedBy={review.postedBy}
                rating={review.rating}
                dateCreated={review.dateCreated}
                repliesCount={review.repliesCount}
              />
            ))}
          </>
        ) : loading ? (
          <>
            <div className="space-y-1">
              <div className="flex items-center mb-4 space-x-4">
                <Skeleton className="h-12 w-12 bg-slate-200 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 bg-slate-200 w-[200px]" />
                  <Skeleton className="h-4 bg-slate-200 w-[150px]" />
                </div>
              </div>
              <Skeleton className="h-4 bg-slate-200 w-full" />
              <Skeleton className="h-4 bg-slate-200 w-full" />
              <Skeleton className="h-4 bg-slate-200 w-full" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center mb-4 space-x-4">
                <Skeleton className="h-12 w-12 bg-slate-200 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 bg-slate-200 w-[200px]" />
                  <Skeleton className="h-4 bg-slate-200 w-[150px]" />
                </div>
              </div>
              <Skeleton className="h-4 bg-slate-200 w-full" />
              <Skeleton className="h-4 bg-slate-200 w-full" />
              <Skeleton className="h-4 bg-slate-200 w-full" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center mb-4 space-x-4">
                <Skeleton className="h-12 w-12 bg-slate-200 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 bg-slate-200 w-[200px]" />
                  <Skeleton className="h-4 bg-slate-200 w-[150px]" />
                </div>
              </div>
              <Skeleton className="h-4 bg-slate-200 w-full" />
              <Skeleton className="h-4 bg-slate-200 w-full" />
              <Skeleton className="h-4 bg-slate-200 w-full" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center mb-4 space-x-4">
                <Skeleton className="h-12 w-12 bg-slate-300 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 bg-slate-300 w-[200px]" />
                  <Skeleton className="h-4 bg-slate-300 w-[150px]" />
                </div>
              </div>
              <Skeleton className="h-4 bg-slate-300 w-full" />
              <Skeleton className="h-4 bg-slate-300 w-full" />
              <Skeleton className="h-4 bg-slate-300 w-full" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center w-fit mx-auto">
            <LiaCommentSlashSolid size={50} className="text-stone-600" />
            <p className="text-stone-500">You dont have any reviews yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsListed;
