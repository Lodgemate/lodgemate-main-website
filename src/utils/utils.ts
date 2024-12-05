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
  console.log(viewport);
  // Extract latitude bounds from the viewport
  console.log(viewport.ci.lo);
  const latLo = viewport.Yh.lo;
  const latHi = viewport.Yh.hi;

  // Extract longitude bounds from the viewport
  const lngLo = viewport.Hh.lo;
  const lngHi = viewport.Hh.hi;

  // Calculate the center latitude and longitude
  const latitude = (latLo + latHi) / 2;
  const longitude = (lngLo + lngHi) / 2;
  console.log({
    lat: latitude,
    lng: longitude,
  });

  // Return an object with the latitude and longitude
  return {
    lat: latitude,
    lng: longitude,
  };
}

export const handlyCopy = async (copyTxt: any) => {
  let res;
  await navigator.clipboard
    .writeText(copyTxt)
    .then(() => {
      res = "Copied";
    })
    .catch(() => {
      res = "Could not copy";
    });
  console.log(res);
  return res;
};

export const calculateCombinedRating = (
  category1: any,
  people1: any,
  category2: any,
  people2: any
) => {
  // Calculate average rating for each category
  const averageRating1 = category1 / people1;
  const averageRating2 = category2 / people2;

  // Normalize each average rating to a scale of 5
  // Assuming the maximum possible rating for category 1 is 15 and for category 2 is 5
  const normalizedRating1 = (averageRating1 / 15) * 5;
  const normalizedRating2 = (averageRating2 / 5) * 5;

  // Combine the normalized ratings
  // Average the ratings for the final combined rating
  const finalRating = (normalizedRating1 + normalizedRating2) / 2;

  // Return the final rating rounded to one decimal place
  return finalRating.toFixed(1);
};

export function getInitials(fullName: string) {
  // Trim and split the full name by spaces
  const nameParts = fullName.trim().split(/\s+/);

  // Get the first name and last name (or last part of the name)
  const firstName = nameParts[0] || "";
  const lastName = nameParts[nameParts.length - 1] || "";

  // Get the initials by taking the first letter of each name part
  const initials = `${lastName[0] || ""}${firstName[0] || ""}`.toUpperCase();

  return initials;
}

export const optimizeImageUrl = (url: string) => {
  if (!url) return;

  if (url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/w_300,f_auto/");
  }
  return url;
};
