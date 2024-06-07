import React, { useState, useEffect, useRef } from "react";
import CustomRangeSlider from "./CustomRangeSlider";

interface FilterOptionsProps {
  onResetFilters: () => void;
  onApplyFilters: (filters: any) => void;
  onClose: () => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  onResetFilters,
  onApplyFilters,
  onClose,
}) => {
  const [selectedAccommodationType, setSelectedAccommodationType] = useState<
    string[]
  >([]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [selectedOccupants, setSelectedOccupants] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    1000, 500000,
  ]);

  const modalRef = useRef<HTMLDivElement>(null);

  const accommodationTypes = [
    {
      name: "Apartment",
      icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_10_z9suod.svg",
    },
    {
      name: "Self-contained",
      icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_10_z9suod.svg",
    },
    {
      name: "Flat",
      icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_10_z9suod.svg",
    },
    {
      name: "Single room",
      icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_10_z9suod.svg",
    },
  ];

  const roomsOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

  const occupantsOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

  const featuresOptions = [
    {
      name: "Water",
      icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201088/utilities/LodgeMate_File/Vector_1_njk9ml.svg",
    },
    {
      name: "Water heater",
      icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201087/utilities/LodgeMate_File/Vector_2_iqvt3t.svg",
    },
    {
      name: "Wifi",
      icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201086/utilities/LodgeMate_File/Vector_6_vamzbw.svg",
    },
    {
      name: "Electricity",
      icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201521/utilities/LodgeMate_File/Vector_8_tz6xyw.svg",
    },
    {
      name: "Security",
      icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201086/utilities/LodgeMate_File/Vector_7_rcxtti.svg",
    },
    {
      name: "Parking space",
      icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201086/utilities/LodgeMate_File/Vector_5_ppfwpx.svg",
    },
    {
      name: "Recreation center",
      icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201087/utilities/LodgeMate_File/Vector_4_kjhg0c.svg",
    },
    {
      name: "Provision shop",
      icon: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201086/utilities/LodgeMate_File/Vector_3_uyvtoc.svg",
    },
  ];

  const handleToggle = (
    selectedList: string[],
    setSelectedList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    if (selectedList.includes(item)) {
      setSelectedList(selectedList.filter((i) => i !== item));
    } else {
      setSelectedList([...selectedList, item]);
    }
  };

  const handleResetFilters = () => {
    setSelectedAccommodationType([]);
    setSelectedRooms([]);
    setSelectedOccupants([]);
    setSelectedFeatures([]);
    setPriceRange([1000, 250000]);
    onResetFilters();
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      accommodationType: selectedAccommodationType,
      rooms: selectedRooms,
      occupants: selectedOccupants,
      features: selectedFeatures,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
    onClose();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={modalRef}>
      <div className="text-[16px] p-4 sm:p-8">
        <div className="border-b pb-4 mb-4">
          <p className="text-[20px] mb-4 font-medium text-dgray">
            Price range (per year)
          </p>
          <div className="mb-4">
            <CustomRangeSlider
              min={1000}
              max={2000000}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
            />
          </div>
          <div className="flex justify-between gap-2 items-center">
            <div className="border rounded-lg p-2 flex flex-col gap- w-[222px]">
              <p>Min</p>
              <div className="flex items-center">
                <p>₦</p>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  className="rounded-lg w-[130px] p-1 outline-none"
                />
              </div>
            </div>
            <div className="w-[50px] h-[1px] bg-dgray"></div>
            <div className="border rounded-lg p-2 flex flex-col gap- w-[222px]">
              <p>Max</p>
              <div className="flex items-center">
                <p>₦</p>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="rounded-lg w-[130px] p-1 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b pb-4 mb-4">
          <p className="text-[20px] mb-4 font-medium text-dgray">
            Accommodation type{" "}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-between gap-2">
            {accommodationTypes.map((type) => (
              <div
                key={type.name}
                onClick={() =>
                  handleToggle(
                    selectedAccommodationType,
                    setSelectedAccommodationType,
                    type.name
                  )
                }
                className={`border w-[159px] rounded-lg flex justify-center flex-col p-4 items-center cursor-pointer ${
                  selectedAccommodationType.includes(type.name)
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                <img
                  src={type.icon}
                  alt={type.name}
                  className={`${
                    selectedAccommodationType.includes(type.name)
                      ? "filter-white"
                      : ""
                  }`}
                />
                <p>{type.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b pb-4 mb-4">
          <p className="text-[20px] mb-4 font-medium text-dgray">
            Number of rooms{" "}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
            {roomsOptions.map((room) => (
              <div
                key={room}
                onClick={() =>
                  handleToggle(selectedRooms, setSelectedRooms, room)
                }
                className={`border rounded-lg px-4 py-2 cursor-pointer ${
                  selectedRooms.includes(room) ? "bg-primary text-white" : ""
                }`}
              >
                <p>{room}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b pb-4 mb-4">
          <p className="text-[20px] mb-4 font-medium text-dgray">
            Number of occupants{" "}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
            {occupantsOptions.map((occupant) => (
              <div
                key={occupant}
                onClick={() =>
                  handleToggle(
                    selectedOccupants,
                    setSelectedOccupants,
                    occupant
                  )
                }
                className={`border rounded-lg px-4 py-2 cursor-pointer ${
                  selectedOccupants.includes(occupant)
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                <p>{occupant}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border- pb-4 mb-4">
          <p className="text-[20px] mb-4 font-medium text-dgray">
            Accommodation features{" "}
          </p>
          <div className="flex items-center justify-center sm:justify-normal flex-wrap gap-3">
            {featuresOptions.map((feature) => (
              <div
                key={feature.name}
                onClick={() =>
                  handleToggle(
                    selectedFeatures,
                    setSelectedFeatures,
                    feature.name
                  )
                }
                className={`border rounded-lg px-4 py-2 flex gap-2 items-center cursor-pointer ${
                  selectedFeatures.includes(feature.name)
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                <img
                  src={feature.icon}
                  alt={feature.name}
                  className={`${
                    selectedFeatures.includes(feature.name)
                      ? "filter-white"
                      : ""
                  }`}
                />
                <p>{feature.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-[44px] py-[22px] border-t flex justify-between items-center">
        <button
          onClick={handleResetFilters}
          className="border px-6 py-2 rounded-lg"
        >
          <p className="text-lred font-medium underline">Reset all filters</p>
        </button>
        <button
          onClick={handleApplyFilters}
          className="border px-4 py-2 rounded-lg bg-primary"
        >
          <p className="text-white font-medium">Apply filters</p>
        </button>
      </div>
    </div>
  );
};

export default FilterOptions;
