export const formattedString = (param: string) => {
  const parsed = param.replace(/ /g, "+");
  return parsed;
};

export const extractDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export function calculateCenterLatLng(viewport: any) {
  // Extract latitude bounds from the viewport
  const latLo = viewport.Yh.lo;
  const latHi = viewport.Yh.hi;

  // Extract longitude bounds from the viewport
  const lngLo = viewport.Hh.lo;
  const lngHi = viewport.Hh.hi;

  // Calculate the center latitude and longitude
  const latitude = (latLo + latHi) / 2;
  const longitude = (lngLo + lngHi) / 2;

  // Return an object with the latitude and longitude
  return {
    lat: latitude,
    lng: longitude
  };
}