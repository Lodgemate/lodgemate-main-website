import React, { useState, useEffect, useRef } from "react";

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
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [showApartmentOnly, setShowApartmentOnly] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleToggleGender = (gender: string) => {
    setSelectedGender((prevSelected) =>
      prevSelected.includes(gender)
        ? prevSelected.filter((g) => g !== gender)
        : [...prevSelected, gender]
    );
  };

  const handleToggleApartment = () => {
    setShowApartmentOnly((prev) => !prev);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      gender: selectedGender,
      apartmentOnly: showApartmentOnly,
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
    <div ref={modalRef} className="">
      <div className="text-[16px] text-dgray p-4 sm:p-8 ">
        <div className="border-b mb-6 pb-6">
          <h2 className="font-semibold text-[20px] mb-4">Gender</h2>
          <div className="flex gap-4">
            <button
              className={`border flex items-center gap-2 rounded-lg px-6 py-2 ${
                selectedGender.includes("Male") ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleToggleGender("Male")}
            >
              Male
            </button>
            <button
              className={`border flex items-center gap-2 rounded-lg px-6 py-2 ${
                selectedGender.includes("Female") ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleToggleGender("Female")}
            >
              Female
            </button>
          </div>
        </div>

        <div>
          <p className="mb-4 font-semibold text-[20px]">Apartments</p>
          <button
            className={`border rounded-lg px-6 py-2 ${
              showApartmentOnly ? "bg-primary text-white" : ""
            }`}
            onClick={handleToggleApartment}
          >
            Show me only those with apartment
          </button>
        </div>
      </div>
      <div className="px-[44px] absolute w-full bottom-0 py-[22px] border-t flex justify-between items-center">
        <button
          onClick={onResetFilters}
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
