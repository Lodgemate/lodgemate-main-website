import React, { FC, ReactNode } from "react";

interface BlurbgProps {
  children: ReactNode;
}
const Blurbg: FC<BlurbgProps> = ({ children }) => {
  return (
    <section className=' bg-opacity-65 w-full h-full bg-lgray absolute top-20 flex justify-center pt-48'>
      {children}
    </section>
  );
};

export default Blurbg;
