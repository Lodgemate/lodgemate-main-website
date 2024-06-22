"use client"

import React, { useState } from "react";
import Select from "react-select";

interface UniversityOption {
  value: string;
  label: string;
}

const UniversitySelect: React.FC = () => {
  const [selectedUniversity, setSelectedUniversity] =
    useState<UniversityOption | null>(null);

  const universities: UniversityOption[] = [
    { value: "harvard", label: "Harvard University" },
    { value: "stanford", label: "Stanford University" },
    { value: "mit", label: "Massachusetts Institute of Technology" },
    // Add more universities here...
  ];

  const handleChange = (selectedOption: UniversityOption | null) => {
    setSelectedUniversity(selectedOption);
  };

  return (
    <Select
      value={selectedUniversity}
      onChange={handleChange}
      options={universities}
      placeholder="Select school"
      classNamePrefix="react-select"
      className="mt-[12px] w-full cursor-text hover:border-gray-400"
      styles={{
        control: (provided, state) => ({
          ...provided,
          padding: "12px 1px",
          borderRadius: "8px",
          borderColor: state.isFocused ? " " : " ",
          boxShadow: state.isFocused ? "none" : "none",
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 50,
        }),
      }}
    />
  );
};

export default UniversitySelect;
