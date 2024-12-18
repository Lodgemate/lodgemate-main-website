"use client";

import { selectToken } from "@/lib/features/Auth/tokenSlice";
import { useAppSelector } from "@/lib/hooks";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import { useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function HeartIcon({ type, id, wishlisted, name }: any) {
  const [isRed, setIsRed] = useState(wishlisted);
  const [openDialog, setOpenDialog] = useState(false);
  const parseToken = useAppSelector(selectToken);

  const handleClick = async () => {
    setIsRed(() => (isRed ? isRed : !isRed));
    if (!isRed) {
      await AddToWhishlist();
    } else {
      setOpenDialog(true);
    }
  };
  const DelfromoWhishlist = async () => {
    setIsRed(false);
    setOpenDialog(false);
    const url = `${Endpoints.addToWishlist}${id}`;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
    };

    try {
      const res: any = await FetchApi(url, options);
      if (res.status === "success") {
      } else {
        setIsRed(true);

        throw res;
      }
    } catch (error: any) {
      alert(error.message);
      setIsRed(true);
    }
  };

  const AddToWhishlist = async () => {
    const url = Endpoints.addToWishlist;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parseToken}`,
      },
      body: JSON.stringify({
        type: type,
        id: id,
      }),
    };

    try {
      const res: any = await FetchApi(url, options);
      console.log(res);

      if (res.status === "success") {
      } else {
        setIsRed((prev: any) => !prev);

        throw res;
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      {
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Remove from wishlist</DialogTitle>
              <DialogDescription className="text-stone-700">
                Are you sure you want to remove{" "}
                <span className="font-bold">{name}</span> from your wishlist?
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4"></div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => setOpenDialog(false)}
                className="text-stone-800  shadow-none hover:bg-transparent hover:text-stone-800 border-none bg-transparent"
              >
                cancle
              </Button>
              <Button
                type="submit"
                onClick={async () => await DelfromoWhishlist()}
                className="bg-red-500  hover:text-white hover:bg-red-500"
              >
                Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
      {isRed ? (
        <img
          src="/icons/heart-red.svg"
          alt=""
          className="absolute top-2 right-2 text-xl cursor-pointer"
          onClick={handleClick}
        />
      ) : (
        <img
          src="/icons/heart-gray.svg"
          alt=""
          className="absolute top-2 right-2 text-xl cursor-pointer"
          onClick={handleClick}
        />
      )}
    </>
  );
}

export default HeartIcon;
