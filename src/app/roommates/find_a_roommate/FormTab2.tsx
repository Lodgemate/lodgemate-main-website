import GooglePlacesAutocomplete from "@/components/PlacesLocator";
import LocationSuggestion, {
  Result,
} from "@/components/Shared/locationSuggestion";
import {
  selectAllList_Listingdata,
  setStateItem,
} from "@/lib/features/Listing/ListingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import { calculateCenterLatLng } from "@/utils/utils";

function FormTab2() {
  const dispatch = useAppDispatch();
  const [loacation, setloacation] = useState("");
  const [onFocus, setonFocus] = useState(false);
  const data = useAppSelector(selectAllList_Listingdata);
  const hasKeyAccomodationTypes = data.has("otherAccomodationTypes[]");
  const hasKeyAccomodationPrefrence = data.has("preferredLivingArrangement");
  const extractedAccomodationTypes =
    (hasKeyAccomodationTypes && data.get("otherAccomodationTypes[]")) || null;
  const extractedAccomodationPrefrence =
    (hasKeyAccomodationPrefrence && data.get("preferredLivingArrangement")) ||
    null;
  const [AccomodationTypes, setAccomodationTypes] = useState<any>(
    (extractedAccomodationTypes && extractedAccomodationTypes) || null
  );
  const [AccomodationPrefrence, setAccomodationPrefrence] = useState<any>(
    (extractedAccomodationPrefrence && extractedAccomodationPrefrence) || null
  );

  const handlechangeAccomodationTypes = (param: string) => {
    setAccomodationTypes(param);
    dispatch(setStateItem({ key: "otherAccomodationTypes[]", value: param }));
    dispatch(
      setStateItem({ key: "preferredAccomodationTypes", value: "other" })
    );
  };
  const handlechangeAccomodationPrefrence = (param: string) => {
    setAccomodationPrefrence(param);
    dispatch(setStateItem({ key: "preferredLivingArrangement", value: param }));
  };

  const locationOnchange = (data: Result) => {
    //@ts-ignore
    const locate = data.geometry.location;
    //@ts-ignore
    const long = locate.lng();
    //@ts-ignore
    const lat = locate.lat();
    console.log(lat, long);
    dispatch(
      setStateItem({
        // its long Ik :)
        key: "location[administrativeArea]",
        value: data.address_components.filter(
          (each) => each.types[0] === "administrative_area_level_1"
        )[0].long_name,
      })
    );

    const filterdArr = data.address_components.filter(
      (each) => each.types[0] === "locality" || "administrative_area_level_1"
    );
    if (filterdArr) {
      dispatch(
        setStateItem({
          key: "location[subAdministrativeArea]",
          value: data.address_components.filter(
            (each) =>
              each.types[0] === "locality" || "administrative_area_level_1"
          )[0].long_name,
        })
      );
    }

    dispatch(
      setStateItem({
        key: "location[country]",
        value: data.address_components.filter(
          (each) => each.types[0] === "country"
        )[0].long_name,
      })
    );
    dispatch(
      setStateItem({
        key: "location[address_text]",
        value: data.formatted_address,
      })
    );
    dispatch(
      setStateItem({
        key: "location[latitude]",
        value: lat,
      })
    );
    dispatch(
      setStateItem({
        key: "location[longitude]",
        value: long,
      })
    );
  };
  return (
    <div className="mb-[100px]">
      <div className="pb-[16px] border-b">
        <label htmlFor="describeyou" className="font-bold mt-[32px]">
          What type of apartment are you looking to live in?{" "}
        </label>

        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded border h-[18px] w-[18px] flex justify-center items-center">
            <input
              name="apartment"
              type="radio"
              className=""
              value={"Self-contain"}
              checked={AccomodationTypes === "Self-contain"}
              onChange={(e) => handlechangeAccomodationTypes(e.target.value)}
            />
          </div>
          <p>Self-contained</p>
        </div>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded border h-[18px] w-[18px] flex justify-center items-center">
            <input
              name="apartment"
              type="radio"
              className=""
              value={"flat"}
              checked={AccomodationTypes === "flat"}
              onChange={(e) => handlechangeAccomodationTypes(e.target.value)}
            />
          </div>
          <p>Flat</p>{" "}
        </div>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded border h-[18px] w-[18px] flex justify-center items-center">
            <input
              name="apartment"
              type="radio"
              className=""
              value={"Single room"}
              checked={AccomodationTypes === "Single room"}
              onChange={(e) => handlechangeAccomodationTypes(e.target.value)}
            />
          </div>
          <p>Single room</p>{" "}
        </div>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded border h-[18px] w-[18px] flex justify-center items-center">
            <input
              name="apartment"
              type="radio"
              className=""
              value={"duplex"}
              checked={AccomodationTypes === "duplex"}
              onChange={(e) => handlechangeAccomodationTypes(e.target.value)}
            />
          </div>
          <p>Duplex</p>{" "}
        </div>

        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded border h-[18px] w-[18px] flex justify-center items-center">
            <input
              name="apartment"
              type="radio"
              className=""
              value={"Anyone avilable"}
              checked={AccomodationTypes === "Anyone avilable"}
              onChange={(e) => handlechangeAccomodationTypes(e.target.value)}
            />
          </div>
          <p>Anyone avilable</p>{" "}
        </div>
      </div>
      {/* How do you want to live? */}
      <div className="pb-[16px] ">
        <label htmlFor="describeyou" className="font-bold mt-[32px]">
          How do you want to live?{" "}
        </label>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded border h-[18px] w-[18px] flex justify-center items-center">
            <input
              type="radio"
              className=""
              value={"separate"}
              checked={AccomodationPrefrence === "separate"}
              onChange={(e) =>
                handlechangeAccomodationPrefrence(e.target.value)
              }
            />
          </div>
          <p>Separate</p>{" "}
        </div>
        <div className="flex mt-[15px] gap-2 items-center">
          <div className=" rounded border h-[18px] w-[18px] flex justify-center items-center">
            <input
              type="radio"
              className=""
              value={"together"}
              checked={AccomodationPrefrence === "together"}
              onChange={(e) =>
                handlechangeAccomodationPrefrence(e.target.value)
              }
            />
          </div>
          <p>Together</p>{" "}
        </div>
      </div>
      {/* Location*/}
      <div className=" ">
        {/* <div className='relative'>
          <input
            type='text'
            placeholder='Enter location of lodge'
            className='w-full p-2 border border-gray-300 rounded'
            onChange={(e) => setloacation(e.target.value)}
            onFocus={() => setonFocus(true)}
            onBlur={() => setonFocus(false)}
          />
          {onFocus && (
            <LocationSuggestion
              handleLocation={locationOnchange}
              input={loacation}
              setInput={setloacation}
            />
          )}
        </div> */}
        <div className="pb-[16px] border-b">
          <label htmlFor="describeyou" className="font-bold mt-[32px]">
            Location
          </label>
        </div>
        <GooglePlacesAutocomplete handleLocation={locationOnchange} />
      </div>
    </div>
  );
}

export default FormTab2;
