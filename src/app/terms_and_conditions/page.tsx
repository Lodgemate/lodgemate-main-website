import React from "react";
import ContactForm from "./ContactForm";

function TermsAndConditions() {
  return (
    <div className="sm:px-[100px] px-4 text-lblack text-[16px] mt-[100px]">
      <div className=" grid grid-cols-1 sm:grid-cols-2 sm:gap-[50px]">
        <div className=" col-span-1">
          <h1 className="text-[24px] mb-[16px]">Terms & Conditions</h1>
          <p>
            Some intro write up here...lörem ipsum megafiering stereoform.
            Hypertropi detologi. Kvasinetik bifaktisk, än realogi teotism.
            Emtris megafas mikrosiv panvalens, astrometer. Agnostistik telelog
            desplastisk hyperplastisk. Filonomi anacism. Semiform mikrosion.
            Lörem ipsum megafiering stereoform. Hypertropi detologi. Kvasinetik
            bifaktisk, än realogi teotism. Emtris megafas mikrosiv panvalens,
            astrometer.
          </p>
          <h2 className="font-bold mb-[8px] mt-[24px]">Table Of Content</h2>
          <p className="font-bold mb-[6px]">
            1. <span className=" underline">Our Mission</span>
          </p>
          <p className="font-bold">
            2. <span className=" underline">Our Vision</span>
          </p>
          <p className="font-bold">
            3. <span className=" underline">Searching & Finding Lodges</span>
          </p>
          <p className="font-bold">
            4. <span className=" underline">Content 4</span>
          </p>
          <p className="font-bold">
            5. <span className=" underline">Content 5</span>
          </p>
          <p className="font-bold">
            6. <span className=" underline">Content 6</span>
          </p>
          <h2 className="font-bold mb-[8px] mt-[24px]">
            1. <span className=" underline">Our Mission</span>
          </h2>
          <p>
            Some intro write up here...lörem ipsum megafiering stereoform.
            Hypertropi detologi. Kvasinetik bifaktisk, än realogi teotism.
            Emtris megafas mikrosiv panvalens, astrometer. Agnostistik telelog
            desplastisk hyperplastisk. Filonomi anacism. Semiform mikrosion.
            Lörem ipsum megafiering stereoform. Hypertropi detologi. Kvasinetik
            bifaktisk, än realogi teotism. Emtris megafas mikrosiv panvalens,
            astrometer. Some intro write up here...lörem ipsum megafiering
            stereoform. Hypertropi detologi. Kvasinetik bifaktisk, än realogi
            teotism. Emtris megafas mikrosiv panvalens, astrometer. Agnostistik
            telelog desplastisk hyperplastisk. Filonomi anacism. Semiform
            mikrosion. Lörem ipsum megafiering stereoform. Hypertropi detologi.
            Kvasinetik bifaktisk, än realogi teotism. Emtris megafas mikrosiv
            panvalens, astrometer. <br /> <br /> Some intro write up
            here...lörem ipsum megafiering stereoform. Hypertropi detologi.
            Kvasinetik bifaktisk, än realogi teotism. Emtris megafas mikrosiv
            panvalens, astrometer. Agnostistik telelog desplastisk
            hyperplastisk. Filonomi anacism. Semiform mikrosion. Lörem ipsum
            megafiering stereoform. Hypertropi detologi. Kvasinetik bifaktisk,
            än realogi teotism. Emtris megafas mikrosiv panvalens, astrometer.
          </p>
          <h2 className="font-bold mb-[8px] mt-[24px]">
            2. <span className=" underline">Our Vision</span>
          </h2>
          <p>
            Some intro write up here...lörem ipsum megafiering stereoform.
            Hypertropi detologi. Kvasinetik bifaktisk, än realogi teotism.
            Emtris megafas mikrosiv panvalen. <br />Some intro write up here...lörem
            ipsum megafiering stereoform. Hypertropi detologi. Kvasinetik
            bifaktisk, än realogi teotism. Emtris megafas mikrosiv panvalens,
            astrometer. Agnostistik telelog desplastisk hyperplastisk. Filonomi
            anacism. Semiform mikrosion. Lörem ipsum megafiering stereoform.
            Hypertropi detologi. Kvasinetik bifaktisk, än realogi teotism.
            Emtris megafas mikrosiv panvalens, astrometer.
          </p>
        </div>
        {/* form side */}
        <div className=" col-span-1 ">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
