import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import { useEffect, useState } from "react";

function HeartIcon({type, id, wishlisted}:any) {
  const [isRed, setIsRed] = useState(wishlisted);
  const [clicked, setclicked] = useState(false);
  console.log(wishlisted)
  const handleClick = () => {
    setIsRed(!isRed);
    setclicked(true)
  console.log(isRed)

  };
  useEffect(()=>{
    const localStorageToken = localStorage.getItem("token");
    const parseToken = localStorageToken && JSON.parse(localStorageToken);

    const AddToWhishlist = async () => {
      const url = Endpoints.addToWishlist;

      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parseToken}`,
        },
        body:JSON.stringify ({
          type: type,
          id: id,
        }),
      };

      try{
      const res: any= await FetchApi(url, options)
  console.log(res)

      if (res.status === 'success') {
      }else{
        setIsRed((prev: any)=>!prev)

        throw res
      }
    } catch (error:any) {
      alert(error.message)
      
    }finally{
      setclicked(false)
    }
      
    };

    const DelfromoWhishlist = async () => {
      const url = `${Endpoints.addToWishlist}${id}`;

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${parseToken}`,
        },
      };

      try{
        const res: any= await FetchApi(url, options)
        if (res.status === 'success') {
        }else{
          setIsRed(true)

          throw res
        }
      } catch (error:any) {
        alert(error.message)
      }finally{
        setclicked(false)
      }
    };
    if (clicked) {
      isRed? AddToWhishlist():DelfromoWhishlist()
    }


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
