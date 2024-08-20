import React, { useState, useEffect, useCallback } from "react";
import AOS from "aos";


interface WriteReviewProps {
  show: boolean;
  onClose: () => void;
  data?: any,
  handlePost:(param: any)=>void
}

const WriteReview: React.FC<WriteReviewProps> = React.memo(({ show, onClose, handlePost }) => {
  const [starSources, setStarSources] = useState<string[]>([
    "/icons/star_black.svg",
    "/icons/star_black.svg",
    "/icons/star_black.svg",
    "/icons/star_black.svg",
    "/icons/star_black.svg",
  ]);
  const [Clicked, setClicked] = useState(false)
  const GetStars= useCallback(()=>{
   const newArr =starSources.filter((ent)=> ent === "/icons/star_gold.svg")
  return  newArr
  },[starSources])
  const [Review, setReview] = useState({
    comment:"",
    rating: 0
   })


     useEffect(() => {
       if (Clicked) {
         setClicked(false);
       }
     }, [show]);

     useEffect(() => {
       AOS.init({
         duration: 1000,
       });
     }, []);

     useEffect(() => {
       setReview({ ...Review, rating: GetStars().length });
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

  if (!show) {
    return null;
    }
  

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start pt-[100px]  justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-[12px]  shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in-up"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <div className="mb-4">
          <div className="flex gap-2">
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1720745689/utilities/LodgeMate_File/Img_jccfin.svg"
              alt=""
            />
            <div>
              <h1 className="font-semibold">McGreggor</h1>
              <p>05/05/23</p>
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
            value={Review.comment}
            onChange={(e)=>setReview({...Review, comment :e.target.value})}
            className="border w-[350px] sm:w-[700px] resize-none mt-4 h-24 p-2 rounded-lg outline-none"
          ></textarea>
          <div className="w-full flex justify-between items-center">
          <button onClick={()=>{
            handlePost(Review)
            setClicked(true)
            }} className="bg-lblue px-2 py-1 text-white rounded cursor-pointer flex items-center gap-2">
           {Clicked?<>Posting <div className="circularLoader"/></>:'Post'}
          </button>
          <p className="text-end">500/500 remaining</p>
          </div>
          
        </div>
      </div>
    </div>
  );
});

export default WriteReview;
