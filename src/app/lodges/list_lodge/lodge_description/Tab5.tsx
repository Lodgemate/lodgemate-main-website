"use client";

import GooglePlacesAutocomplete from "@/components/PlacesLocator";
import LocationSuggestion, {
  Result,
} from "@/components/Shared/locationSuggestion";
import {
  selectAllList_Listingdata,
  setStateItem,
} from "@/lib/features/Listing/ListingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { calculateCenterLatLng } from "@/utils/utils";
import React, { useState } from "react";

const Tab4Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllList_Listingdata);
  const ExtractDataFromFormData = (name: string) => {
    const hasKey = data.has(name);
    const extractedData: any = (hasKey && data.get(name)) || null;
    return extractedData;
  };
  // extract lodge name
  const [Lodgename, setLodgename] = useState(
    ExtractDataFromFormData("lodgeName")
  );
  // extract price
  const [Price, setPrice] = useState(ExtractDataFromFormData("price"));
  // extract price
  const [lodgeDescription, setLodgeDescription] = useState(
    ExtractDataFromFormData("lodgeDescription")
  );

  const locationOnchange = (data: Result) => {
    const long = calculateCenterLatLng(data.geometry.viewport).lng;
    const lat = calculateCenterLatLng(data.geometry.viewport).lat;
    console.log(data.address_components);
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
    dispatch(setStateItem({ key: "location[latitude]", value: lat }));
    dispatch(setStateItem({ key: "location[longitude]", value: long }));
    dispatch(
      setStateItem({ key: "lodgeLocation", value: data.formatted_address })
    );
  };

  //  console.log(Object.fromEntries(data))

  return (
    <div className='flex flex-col items-center text-dgray text-[14px]'>
      <form className='w-full max-w-lg flex flex-col gap-4 mt-5'>
        <input
          type='text'
          placeholder='Enter name of lodge'
          className='w-full p-2 border border-gray-300 rounded'
          value={Lodgename}
          onChange={(e) => {
            setLodgename(e.target.value);
            dispatch(setStateItem({ key: "lodgeName", value: e.target.value }));
          }}
        />
        {/* <div className="relative">
          <input
          type="text"
          placeholder="Enter location of lodge"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e)=>setloacation(e.target.value)}
          onFocus={()=>setonFocus(true)}
          onBlur={() => setonFocus(false)}
        />
          {onFocus && <LocationSuggestion handleLocation={locationOnchange} input={loacation} setInput={setloacation}/>}
        </div> */}
        <input
          type='number'
          placeholder='Price'
          className='w-full p-2 border border-gray-300 rounded'
          value={Price}
          onChange={(e) => {
            setPrice(e.target.value);
            dispatch(setStateItem({ key: "price", value: e.target.value }));
          }}
        />
        <textarea
          placeholder='Write a short description about your lodge'
          className='w-full p-2 border border-gray-300 rounded'
          value={lodgeDescription}
          rows={4}
          onChange={(e) => {
            setLodgeDescription(e.target.value);
            dispatch(
              setStateItem({ key: "lodgeDescription", value: e.target.value })
            );
          }}
        />
        <GooglePlacesAutocomplete handleLocation={locationOnchange} />
      </form>
    </div>
  );
};

export default Tab4Content;
