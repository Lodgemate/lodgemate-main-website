import { debounceFetch } from "@/utils/Fetchdata";
import { formattedString } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import index from "../Navbar/NavBar";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface LatLng {
  lat: number;
  lng: number;
}

interface Bounds {
  northeast: LatLng;
  southwest: LatLng;
}

interface Geometry {
  bounds: Bounds;
  location: LatLng;
  location_type: string;
  viewport: Bounds;
}

export interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

interface ApiResponse {
  results: Result[];
  status: string;
}

interface LocationSuggestionProps {
  input: string;
  handleLocation: any
  setInput:any
}
const LocationSuggestion: React.FC<LocationSuggestionProps> = ({handleLocation, input }) => {
  const [result, setresult] = useState<Result[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const cleanString = formattedString(input);
      const res: ApiResponse | any = await debounceFetch(
        `https:maps.googleapis.com/maps/api/geocode/json?address=${cleanString}&key=${process.env.NEXT_PUBLIC_GEOCODING_KEY}`
      );
      console.log(res);
      setresult(res.results);
      console.log(res.results[0].formatted_address);
    };
    if (input) {
      fetchData();
    }
  }, [input]);
  if (result[0]) {
    console.log("sdfjkghkjdsghjlk")
  }
  useEffect(()=>{
    if (result[0]) {
      handleLocation(result)
    };
  },[result])
   

  return (
    <div className='floating_suggestion_box absolute w-full   z-20 rounded min-h-fit bg-slate-50 shadow shadow-slate-400'>
      {result.map((result, index) => {
        return (
          <p
          
            key={index}
            className='p-2 hover:text-black text-sm cursor-pointer truncate'
          >
            {result?.formatted_address}
          </p>
        );
      })}
    </div>
  );
};

export default LocationSuggestion;
