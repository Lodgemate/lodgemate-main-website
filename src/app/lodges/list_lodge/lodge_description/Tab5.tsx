"use client";

import LocationSuggestion, { Result } from "@/components/Shared/locationSuggestion";
import { selectAllList_Lodgesdata, setStateItem } from "@/lib/features/List_Lodges/List_LogdesSlice";
import { useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Tab4Content: React.FC = () => {
  const dispatch = useDispatch()
  const [loacation, setloacation] = useState("")
  const [onFocus, setonFocus] = useState(false)
  const data =useAppSelector(selectAllList_Lodgesdata)
  const ExtractDataFromFormData =(name: string)=>{
    const hasKey = data.has(name);
    const extractedData: any = hasKey && data.get(name) || null
    return extractedData
   }
  // extract lodge name
  const [Lodgename, setLodgename] = useState(ExtractDataFromFormData('lodgeName'))
  // extract price
  const [Price, setPrice] = useState(ExtractDataFromFormData('price'))
  // extract price
  const [lodgeDescription, setLodgeDescription] = useState(ExtractDataFromFormData('lodgeDescription'))

  const locationOnchange =(data : Result[])=>{
  dispatch(setStateItem({ 
    
    // its long Ik :)
    key: "location[administrativeArea]",
     value: data[0].address_components.filter((each) => each.types[0] === 'administrative_area_level_1')[0].long_name
     }));

     const filterdArr = data[0].address_components.filter((each) => each.types[0] === 'locality' || 'administrative_area_level_1')
     if (filterdArr) {
      dispatch(
    setStateItem({ 
      key: "location[subAdministrativeArea]",
       value:  data[0].address_components.filter((each) => each.types[0] === 'locality' || 'administrative_area_level_1')[0].long_name
      })); 
     }
 
  dispatch(
    setStateItem({ 
      key: "location[country]",
       value:  data[0].address_components.filter((each) => each.types[0] === 'country')[0].long_name
      }));
  dispatch(setStateItem({ key: "location[address_text]", value: data[0].formatted_address }));
  dispatch(setStateItem({ key: "location[latitude]", value: data[0].geometry.location.lat }));
  dispatch(setStateItem({ key: "location[longitude]", value: data[0].geometry.location.lng }));
  dispatch(setStateItem({ key: "lodgeLocation", value: data[0].formatted_address }));
  }

//  console.log(Object.fromEntries(data))

  return (
    <div className="flex flex-col items-center text-dgray">
      <form className="w-full max-w-lg flex flex-col gap-4 mt-5">
        <input
          type="text"
          placeholder="Enter name of lodge"
          className="w-full p-2 border border-gray-300 rounded"
          value={Lodgename}
          onChange={(e)=>{
            setLodgename(e.target.value)
      dispatch(setStateItem({ key: "lodgeName", value: e.target.value }));
          }}
        />
        <div className="relative">
          <input
          type="text"
          placeholder="Enter location of lodge"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e)=>setloacation(e.target.value)}
          onFocus={()=>setonFocus(true)}
          onBlur={() => setonFocus(false)}
        />
          {onFocus && <LocationSuggestion handleLocation={locationOnchange} input={loacation} setInput={setloacation}/>}
        </div>
        
        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border border-gray-300 rounded"
          value={Price}
          onChange={(e)=>{
            setPrice(e.target.value)
      dispatch(setStateItem({ key: "price", value: e.target.value }));
          }}
        />
        {/* <div className="flex items-center text-[15px]">
          <input type="checkbox" id="negotiable" className="mr-2" />
          <label htmlFor="negotiable">Mark price as negotiable</label>
        </div> */}
        <textarea
          placeholder="Write a short description about your lodge"
          className="w-full p-2 border border-gray-300 rounded"
          value={lodgeDescription}
          rows={4}
          onChange={(e)=>{
            setLodgeDescription(e.target.value)
      dispatch(setStateItem({ key: "lodgeDescription", value: e.target.value }));
          }}
        />
        
      </form>
      
      
    </div>
  );
};

export default Tab4Content;
