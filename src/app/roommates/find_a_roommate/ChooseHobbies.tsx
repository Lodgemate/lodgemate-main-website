import { appendStateItem, selectAllList_Listingdata } from "@/lib/features/Listing/ListingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";

const hobbyIcons: { [key: string]: string } = {
  Musician:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  Dancer:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/game-icons_party-hat_xrupol.svg",
  Artist:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407628/utilities/LodgeMate_File/streamline_interface-edit-magic-wand-design-magic-star-supplies-tool-wand_shufta.svg",
  "Book warm":
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407628/utilities/LodgeMate_File/gg_read_tptvwk.svg",
  "Football addict":
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  Gamer:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  Foodie:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  Evangelism:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  Volunteering:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  Fitness:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  "Party freak":
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  Neat: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  Fashionista:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  Techy:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  Gister:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  "Make-up artist":
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  Writer:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  Photography:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407628/utilities/LodgeMate_File/streamline_interface-edit-magic-wand-design-magic-star-supplies-tool-wand_shufta.svg",
};

function ChooseHobbies() {
  const dispatch = useAppDispatch();
  const data =useAppSelector(selectAllList_Listingdata)
  const hasKey = data.has('hobbiesAndTraits[]');
  console.log(hasKey); 
  const extractedData: any = hasKey && data.getAll('hobbiesAndTraits[]') || null
    console.log(extractedData)
  const [selectedHobbies, setSelectedHobbies] = useState<any>(extractedData && extractedData ||[]);
  console.log(selectedHobbies)
  const toggleHobby = (hobby: string) => {

    if (selectedHobbies.includes(hobby)) {
      let updatedArr = selectedHobbies.filter((h:string) => h !== hobby)
      setSelectedHobbies(updatedArr);
      data.delete("hobbiesAndTraits[]")
      updatedArr.forEach((element: string) => {
      dispatch(appendStateItem({ key: "hobbiesAndTraits[]", value: element }));
      })
    } else {

      let updatedArr = [...selectedHobbies, hobby];
      setSelectedHobbies(updatedArr);
     dispatch(appendStateItem({ key: "hobbiesAndTraits[]", value: hobby}));
    }
  };

  const isHobbySelected = (hobby: string) => selectedHobbies.some((selectedHobby: any) => selectedHobby.toLowerCase() === hobby.toLowerCase());

  return (
    <div>
      <label htmlFor="hobbies" className="font-bold text-[16px]">
        Choose your hobbies & traits
      </label>

      <div className="mt-[12px] gap-4 flex flex-wrap items-center sm:justify-center">
        {Object.keys(hobbyIcons).map((hobby) => (
          <div
            key={hobby}
            className={`flex items-center  border px-4 py-2 rounded-lg gap-2 cursor-pointer ${
              isHobbySelected(hobby)
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => toggleHobby(hobby.toLowerCase())}
          >
            <img src={hobbyIcons[hobby]} alt={hobby} />
            <p>{hobby}</p>
            {isHobbySelected(hobby) && <span className="ml-2">picked</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChooseHobbies;
