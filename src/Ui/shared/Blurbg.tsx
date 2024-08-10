'use client'
import React, { FC, ReactNode, useEffect } from "react";

interface BlurbgProps {
  children: ReactNode;
}
const Blurbg: FC<BlurbgProps> = ({ children }) => {
  // document.body.style.overflow = "hidden";

  // useEffect(() => {
  //   // Lock the scroll when the component mounts
  //   document.body.style.overflow = "hidden";
    
  //   // Cleanup: unlock the scroll when the component unmounts
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, []);
  return (
    <section className=' bg-opacity-65 w-full h-screen overflow-hidden bg-lgray absolute top-0 flex justify-center items-center'>
      {children}
    </section>
  );
};

export default Blurbg;
