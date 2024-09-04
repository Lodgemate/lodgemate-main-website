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
import React, { useCallback, useState } from "react";

const Tab2Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loacation, setloacation] = useState("");
  const [onFocus, setonFocus] = useState(false);
  const data = useAppSelector(selectAllList_Listingdata);

  const ExtractDataFromFormData = useCallback((name: string) => {
    const hasKey = data.has(name);
    const extractedData: any = (hasKey && data.get(name)) || null;
    return extractedData;
  }, []);

  const [serviceName, setserviceName] = useState(
    ExtractDataFromFormData("serviceName")
  );
  const [minPrice, setminPrice] = useState(ExtractDataFromFormData("minPrice"));
  const [maxPrice, setmaxPrice] = useState(ExtractDataFromFormData("maxPrice"));
  const [description, setdescription] = useState(
    ExtractDataFromFormData("description")
  );
  const [otherServiceCategories, setotherServiceCategories] = useState(
    ExtractDataFromFormData("otherServiceCategories")
  );

  // Set serviceCategories to "other" by default
  const serviceCategories = "other";
  dispatch(
    setStateItem({ key: "serviceCategories", value: serviceCategories })
  );

  const locationOnchange = (data: Result) => {
    //@ts-ignore
    const locate = data.geometry.location;
    //@ts-ignore
    const long = locate.lng();
    //@ts-ignore
    const lat = locate.lat();
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
  };
  return (
    <div className="flex flex-col items-center text-dgray">
      <form className="w-full max-w-lg flex flex-col gap-4 mt-5">
        {/* servicename */}
        <div className="flex flex-col gap-1">
          <label htmlFor="serviceName">Enter a name for your service</label>
          <input
            type="text"
            id="serviceName"
            value={serviceName}
            placeholder="e.g. electrical rewiring service in kumasa"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => {
              setserviceName(e.target.value);
              dispatch(
                setStateItem({ key: "serviceName", value: e.target.value })
              );
            }}
          />
        </div>
        {/* otherServiceCategories */}
        <div className="flex flex-col gap-1">
          <label htmlFor="otherServiceCategories">Enter a category name</label>
          <input
            type="text"
            id="otherServiceCategories"
            placeholder="e.g. electrical services,"
            className="w-full p-2 border border-gray-300 rounded"
            value={otherServiceCategories}
            onChange={(e) => {
              setotherServiceCategories(e.target.value);
              dispatch(
                setStateItem({
                  key: "otherServiceCategories",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        {/* min price */}
        <div className="flex flex-col gap-1">
          <label htmlFor="minPrice">Set a min-price for your service</label>
          <input
            type="number"
            id="minPrice"
            placeholder="e.g. 100000"
            className="w-full p-2 border border-gray-300 rounded"
            value={minPrice}
            onChange={(e) => {
              setminPrice(e.target.value);
              dispatch(
                setStateItem({ key: "minPrice", value: e.target.value })
              );
            }}
          />
        </div>
        {/* max price */}
        <div className="flex flex-col gap-1">
          <label htmlFor="maxPrice">Set a max-price for your service</label>
          <input
            type="number"
            id="maxPrice"
            placeholder="e.g. 90000"
            className="w-full p-2 border border-gray-300 rounded"
            value={maxPrice}
            onChange={(e) => {
              setmaxPrice(e.target.value);
              dispatch(
                setStateItem({ key: "maxPrice", value: e.target.value })
              );
            }}
          />
        </div>
        {/* description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Describe your service</label>
          <textarea
            id="description"
            placeholder="Write a short description about your service"
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
              dispatch(
                setStateItem({ key: "description", value: e.target.value })
              );
            }}
          />
        </div>
        <GooglePlacesAutocomplete handleLocation={locationOnchange} />
      </form>
    </div>
  );
};

export default Tab2Content;
