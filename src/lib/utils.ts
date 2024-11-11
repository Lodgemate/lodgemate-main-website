import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getAddress() {
  try {
    // Get the user's current position
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Fetch the reverse geocoding data
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=f86d4f188a8d422794df97deec3e9d7c`
          );
          const data = await response.json();
          const result = data.results[0];

          // Format the address data
          const address = {
            address_text: result.formatted,
            latitude: lat,
            longitude: lng,
            country: result.components.country,
            administrativeArea: result.components.state, // Adjust as needed
            subAdministrativeArea:
              result.components.county || result.components.district, // Adjust as needed
          };

          console.log(address);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
}
