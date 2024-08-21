import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'] as any;

interface props{
  handleLocation: any
}
const GooglePlacesAutocomplete: React.FC<props> = ( {handleLocation} ) => {
  const [inputValue, setInputValue] = useState<string | any>('');
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [debouncedValue, setDebouncedValue] = useState<string>(inputValue);

  // Load the Google Maps API with the required libraries
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GEOCODING_KEY || '',
    libraries,
  });

  // Debounce the input value
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle place selection
  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      console.log(place.formatted_address)
      setInputValue(place.formatted_address);
      handleLocation(place)
      console.log('Selected Place:', place);
    }
  };

  const onLoad = useCallback((autocompleteInstance: google.maps.places.Autocomplete) => {
    
    setAutocomplete(autocompleteInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setAutocomplete(null);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        onUnmount={onUnmount}
        className="autocomplete"
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter the location of lodge"
          className="w-full p-2 border border-gray-300 rounded"
          style={{
            width: '100%',
            height: '40px',
            padding: '10px',
            fontSize: '16px',
          }}
        />
      </Autocomplete>
{/* 
      {place && (
        <div>
          <h3>Selected Place Details:</h3>
          <p>Name: {place.name}</p>
          <p>Address: {place.formatted_address}</p>
        </div>
      )} */}
    </div>
  );
};

export default GooglePlacesAutocomplete;
