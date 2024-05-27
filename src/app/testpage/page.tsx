import React from "react";
import SearchBar from "./SearchBar";

function LodgeDetailPage() {
  return (
    <div className="mt-[100px] text-[16px]">
      <SearchBar />

      <div className="px-[100px] mt-[51px]">
        <h1 className="text-[24px] font-semibold text-dgray">Name of Logde</h1>

        <div className="flex justify-between">
          <div className="flex gap-[24px] items-center">
            <div className="">
              <div className="flex gap-2 items-center">
                <div>
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
                    alt=""
                  />
                </div>
                <p>14 cross avenue, Owerri, Imo state.</p>
              </div>

              <div className="flex gap-2 items-center">
                <div>
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716817967/utilities/LodgeMate_File/Star_1_n1ombt.svg"
                    alt=""
                  />
                </div>
                <p>4.5 • 29 reviews</p>
              </div>
            </div>

            <div className="h-[76px] w-[1px] bg-lgray opacity-[20%]"></div>

            <div className="flex items-start gap-4">
              <div>
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716818031/utilities/LodgeMate_File/entypo_price-tag_qrxul2.svg"
                  alt=""
                />
              </div>
              <p className="text-[22px] text-dgray border-b pb-2 ">
                ₦170,000 /yr
              </p>
              <div className="bg-lskyblue px-2 mt-2 font-bold text-lblue rounded-lg text-[15px]">
                <p>Negotiable</p>
              </div>
            </div>
          </div>

          <div>
            <button className="border- border-opacity-[8%] border-2 flex rounded-lg py-[10px] gap-2 px-[16px]">
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716817967/utilities/LodgeMate_File/ph_heart-fill_cidon6.svg"
                alt=""
              />
              <p>Save</p>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[24px] relative">
        <div className="w-full absolute bottom-[30%]">
          <div className="flex justify-between px-[20px]">
            <button className="p-4 border-lgray border-2 border-opacity-[10%] rounded-full bg-white shadow-lg ">
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716822310/utilities/LodgeMate_File/Polygon_1_1_qouf70.svg"
                alt="back"
              />
            </button>
            <button className="p-4 border-lgray border-2 border-opacity-[10%] rounded-full bg-white shadow-lg ">
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716822310/utilities/LodgeMate_File/Polygon_1_tmzlwn.svg"
                alt="next"
              />
            </button>
          </div>
        </div>

        <div className="flex gap-1 rounded-[20px] overflow-hidden ml-[100px]">
          <div>
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png"
              alt="image 1"
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png"
              alt="image 1"
            />
          </div>
        </div>
      </div>

      <div className="mt-[70px] px-[100px]">
        <div className=" justify-start grid grid-cols-3 gap-[100px]">
          <div className="col-span-2">
            <div className="pb-[40px] mb-[40px] border-lgray border-b-2 border-opacity-[10%]">
              <h2 className="pb-[28-px] text-[24px]">Description</h2>
              <p>
                Lörem ipsum radiotopi triplastisk att radioitet medelvalens,
                polimeter. Neometer konitet, cynosmos termometer entotal.
                Heterotropi androtes. Dessocial primatos postcism. Operafaktisk
                perform tritet. Hypertyp fotoform terrafili. Cynosmos bitiv fast
                biokrati primamatisk.{" "}
              </p>
            </div>

            <div className="pb-[40px] mb-[40px] border-lgray border-b-2 border-opacity-[10%]">
              <h2 className="pb-[28-px] text-[24px] text-dgray">
                Accommodation features
              </h2>
              <div className="flex flex-wrap gap-4">
                {" "}
                <div className="flex gap-2 items-center px-4 py-2 border-lgray border-2 border-opacity-[10%] rounded-lg">
                  <img src="hg" alt="" /> <p>Water</p>
                </div>
                <div className="flex gap-2 items-center px-4 py-2 border-lgray border-2 border-opacity-[10%] rounded-lg">
                  <img src="hg" alt="" /> <p>Water heater</p>
                </div>
              </div>
                      </div>
                      

                      <div>
                          
                      </div>
          </div>
          <div className="col-span-1">ragfhesbjfjsjdak</div>
        </div>
      </div>
    </div>
  );
}

export default LodgeDetailPage;
