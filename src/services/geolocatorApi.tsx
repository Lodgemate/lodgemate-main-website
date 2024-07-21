import { getUserLongLang } from "@/utils/geolocator";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
export const reverseGeocoding = async () => {
  const { latitude, longitude }: { latitude: number; longitude: number } =
    await getUserLongLang();
  const key = process.env.NEXT_PUBLIC_GEOCODING_KEY as string;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`;
  const data = await fetch(url);
  const res = await data.json();


if (res.status === "OK") {
    const locationData = {
    address_text: res.results[0].formatted_address,
    latitude: res.results[0].geometry.location.lat,
    logitutude: res.results[0].geometry.location.lng,
    country: res.results[0].address_components.find(
      (obj: AddressComponent) => obj.types[0] === "country"
    ).long_name,
    administrativeArea: res.results[0].address_components.find(
      (obj: AddressComponent) => obj.types[0] === "administrative_area_level_1"
    ).long_name,
    subAdministrativeArea: res.results[0].address_components.find(
      (obj: AddressComponent) => obj.types[0] === "administrative_area_level_2"
    ).long_name,
  };
  return locationData;
} else {
    return
}
  
};
