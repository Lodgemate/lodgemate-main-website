import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import { useEffect, useState } from "react";

function HeartIcon({type, id}:any) {
  const [isRed, setIsRed] = useState(false);

  const handleClick = () => {
    setIsRed(!isRed);
  };
  useEffect(()=>{
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);
    const AddToWhishlist = async () => {
      const url = Endpoints.addToWishlist;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parseToken}`,
        },
        body: {
          type: "lodge",
          id: "66c244a951815292833c97f4",
        },
      };

      console.log(url);
      console.log(type)
         console.log(await FetchApi(url, options));
    };
    AddToWhishlist()


  },[isRed])

  return (
    <img
      src={isRed ? "/icons/heart-red.svg" : "/icons/heart-gray.svg"}
      alt=""
      className="absolute top-2 right-2 text-xl cursor-pointer"
      onClick={handleClick}
    />
  );
}

export default HeartIcon;
