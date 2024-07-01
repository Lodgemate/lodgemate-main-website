import React, { useState } from "react";

 

 


function NotificationModal() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  return (
    <div className="flex w-full">
      <div className="sm:w-[362px] mt-2 bg-white ">
        <div className="border-b pb-2 mb-2">
          <p className=" px-4  ">
            Hi Jude, you have a new message in your inbox.{" "}
            <span>View message</span>{" "}
          </p>
        </div>
        <div className="border-b pb-2 mb-2">
          <p className=" px-4  ">
            Hi Jude, you have a new message in your inbox.{" "}
            <span>View message</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
