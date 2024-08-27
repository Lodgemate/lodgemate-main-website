import { useState } from "react";

function HeartIcon() {
  const [isRed, setIsRed] = useState(false);

  const handleClick = () => {
    setIsRed(!isRed);
  };

  return (
    <img
      src={isRed ? "/icons/heart-red.svg" : "/icons/heart-gray.svg"}
      alt=""
      className="absolute top-2 right-2 text-xl"
      onClick={handleClick}
    />
  );
}

export default HeartIcon;
