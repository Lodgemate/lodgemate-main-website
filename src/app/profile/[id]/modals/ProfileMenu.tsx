import React, { useState, useRef, useEffect } from "react";

interface ProfileMenuModalProps {
  isOpen: boolean;
  toggleDropdown: () => void;
}

const ProfileMenuModal: React.FC<ProfileMenuModalProps> = ({
  isOpen,
  toggleDropdown,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      toggleDropdown();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="origin-top-right  absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-end right-0 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100-"
      >
        <img src="/icons/close.svg" alt="" />
      </button>
      <div className="py-1">
        <button className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100- flex items-center gap-2 ">
          <img src="/icons/pen_gray.svg" alt="" />
          Edit
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 -hover:bg-gray-100">
          <img src="/icons/copy_gray.svg" alt="" />
          Copy profile link
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 -hover:bg-gray-100">
          <img src="/icons/eye_gray.svg" alt="" />
          View as
        </button>
      </div>
    </div>
  );
};

export default ProfileMenuModal;
