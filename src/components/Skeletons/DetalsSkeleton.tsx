export const LoadingSkeleton = () => {
  return (
    <div>
      <div className="sm:px-[100px] flex flex-col gap-4 sm:mt-[51px]">
        {/* the Name of the Product */}
        <h1 className=" sm:block hidden animate-pulse rounded-lg bg-gray-300 w-52 h-8 ">
          {" "}
        </h1>
        <div className="sm:flex justify-between hidden">
          <div className="flex gap-[24px] items-center">
            <div className="">
              <div className="flex flex-col gap-2 items-center">
                <p className="animate-pulse rounded-lg bg-gray-300 w-32 h-4">
                  {""}
                </p>
                <p className="animate-pulse rounded-lg bg-gray-300 w-32 h-4">
                  {""}
                </p>
              </div>
            </div>

            <div className="h-[76px] w-[1px] bg-lgray opacity-[20%]"></div>

            <div className="flex items-start gap-4 animate-pulse rounded-lg bg-gray-300 w-52 h-8"></div>
          </div>

          <div className="animate-pulse rounded-lg bg-gray-300 w-20 h-8"></div>
        </div>
      </div>

      <div className=" sm:px-[100px] px-4">
        <div className="h-[350px] animate-pulse bg-gray-300 rounded-lg "></div>
      </div>

      <div className="  sm:hidden mt-6">
        <div className="flex flex-col gap-[14px] px-4">
          <div className="">
            <div className="flex gap-3 pb-2 flex-col items-start ">
              <p className="animate-pulse rounded-lg bg-gray-300 w-52 h-5">
                {}
              </p>
              <p className="animate-pulse rounded-lg bg-gray-300 w-52 h-5">
                {}
              </p>
              <p className="animate-pulse rounded-lg bg-gray-300 w-52 h-5">
                {}
              </p>
              <p className="animate-pulse rounded-lg bg-gray-300 w-52 h-5">
                {}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
