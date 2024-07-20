import React from "react";
import AOS from "aos";


function HeroSection() {

  React.useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  });
  return (
    <div>
      <div
        className="flex w-full justify-center sm:mt-[129px] mt-[100px] "
      >
        <h1 className="sm:text-[24px] text-[20px] text-center text-lblack">
          Enter a location below. <br /> Let’s show you some nice logdes..
        </h1>
      </div>
    </div>
  );
}

export default HeroSection;
