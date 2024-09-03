import React, { useState } from "react";
import MoreRepliesModal from "./modals/MoreRepliesModal";
import WriteMessageModal from "./modals/WriteReplyModal";

// Dummy review data
const reviews = [
  {
    id: 1,
    reviewerName: "McGreggor",
    reviewText:
      "Lörem ipsum radiotopi triplastisk att radioitet mede, polimeter. Neometer konitet, cynosmos termometer entotal. Heterotropi androtes. Dessocial primatos postcism. Operafaktisk perform tritet.",
    rating: 3.5,
    date: "05/05/23",
    avatarUrl: "https://example.com/path/to/avatar1.jpg",
    repliesCount: 17,
  },
  // Add more reviews as needed
];

interface ReviewCardProps {
  reviewerName: string;
  reviewText: string;
  rating: number;
  date: string;
  avatarUrl: string;
  repliesCount: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewerName,
  reviewText,
  rating,
  date,
  avatarUrl,
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
          src={avatarUrl}
          alt={reviewerName}
        />
        <div className="ml-4">
          <div className="font-bold">{reviewerName}</div>
          <div className="text-gray-500 text-sm">{date}</div>
        </div>
        <div className="ml-auto">
          <button>
            <span>•••</span>
          </button>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <span className="font-semibold text-yellow-500">{rating}</span>
        <span className="ml-2 text-sm text-gray-500">★ ★ ★ ★ ☆</span>
      </div>
      <p className="text-gray-700 text-sm mb-4">{reviewText}</p>
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
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            reviewerName={review.reviewerName}
            reviewText={review.reviewText}
            rating={review.rating}
            date={review.date}
            avatarUrl={review.avatarUrl}
            repliesCount={review.repliesCount}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsListed;
