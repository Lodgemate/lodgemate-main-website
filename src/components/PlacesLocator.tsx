import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const GooglePlacesAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const [place, setPlace] = useState(null);
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  // Load the Google Maps API with the required libraries
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GEOCODING_KEY,
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
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle place selection
  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setPlace(place);
      console.log('Selected Place:', place);
    }
  };

  const onLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setAutocomplete(null);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        onUnmount={onUnmount}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search for places"
          style={{
            width: '100%',
            height: '40px',
            padding: '10px',
            fontSize: '16px',
          }}
        />
      </Autocomplete>
      {place && (
        <div>
          <h3>Selected Place Details:</h3>
          <p>Name: {place.name}</p>
          <p>Address: {place.formatted_address}</p>
        </div>
      )}
    </div>
  );
};

export default GooglePlacesAutocomplete;
