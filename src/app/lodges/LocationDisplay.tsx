import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState<{
    localGovernmentArea: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
          if (!apiKey) {
            throw new Error("API key is missing");
          }

          // Fetch location details from Google Geocoding API
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Geocode API Response:", data); // Log response here

          const addressComponents = data.results[0]?.address_components || [];
          console.log("Address Components:", addressComponents); // Log all components

          const localGovernmentArea =
            addressComponents.find((component: any) =>
              component.types.includes("administrative_area_level_3")
            )?.long_name || "N/A";
          const state =
            addressComponents.find((component: any) =>
              component.types.includes("administrative_area_level_1")
            )?.long_name || "N/A";
          const country =
            addressComponents.find((component: any) =>
              component.types.includes("country")
            )?.long_name || "N/A";

          setLocation({
            localGovernmentArea,
            state,
            country,
            latitude,
            longitude,
          });
        } catch (error) {
          console.error("Error fetching location data:", error);
          setError("Failed to fetch location data.");
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // Wait up to 10 seconds for a more accurate position
        maximumAge: 0, // Ensure that the location is always fresh
      }
    );

    // Cleanup function to clear the watch when the component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { location, error };
};

const LocationDisplay: React.FC = () => {
  const { location, error } = useGeolocation();

  if (error) return <div>Error: {error}</div>;
  if (!location) return <div>Loading...</div>;

  return (
    <div>
      <p>Local Government Area: {location.localGovernmentArea}</p>
      <p>State: {location.state}</p>
      <p>Country: {location.country}</p>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
};

export default LocationDisplay;
