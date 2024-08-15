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
    <section className='fixed inset-0 z-50 bg-black  bg-opacity-65 w-full h-screen overflow-hidden flex justify-center items-center'>
      {children}
    </section>
  );
};

export default Blurbg;
