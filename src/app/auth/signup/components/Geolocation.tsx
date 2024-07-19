// components/Geolocation.tsx
import { useEffect, useState } from "react";

const Geolocation = ({
  onLocationRetrieved,
}: {
  onLocationRetrieved: (location: {
    latitude: number;
    longitude: number;
  }) => void;
}) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } >();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);
          onLocationRetrieved(coords);
        },
        (error) => {
          console.error("Error getting geolocation", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [onLocationRetrieved]);

  return (
    <div>
      {location ? (
        <div>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </div>
      ) : (
        <div>Getting geolocation...</div>
      )}
    </div>
  );
};

export default Geolocation;
