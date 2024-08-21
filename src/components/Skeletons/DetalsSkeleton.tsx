export const LoadingSkeleton=()=>{
    return (
      <div>
        <div className='sm:px-[100px] sm:mt-[51px]'>
          {/* the Name of the Product */}
          <h1 className=' sm:block hidden animate-pulse rounded-lg bg-gray-300 w-52 h-5 '>
            {" "}
          </h1>
          <div className='sm:flex justify-between hidden'>
            <div className='flex gap-[24px] items-center'>
              <div className=''>
                <div className='flex flex-col gap-2 items-center'>
                  <p className='animate-pulse rounded-lg bg-gray-300 w-32 h-3'>
                    {""}
                  </p>
                  <p className='animate-pulse rounded-lg bg-gray-300 w-32 h-3'>
                    {""}
                  </p>
                </div>
              </div>
  
              <div className='h-[76px] w-[1px] bg-lgray opacity-[20%]'></div>
  
              <div className='flex items-start gap-4 animate-pulse rounded-lg bg-gray-300 w-52 h-20'></div>
            </div>
  
            <div className='animate-pulse rounded-lg bg-gray-300 w-20 h-10'></div>
          </div>
        </div>
  
        <div className='sm:mt-[24px] relative'>
          {/* horizontal scroll div for displayiing the images horizolaly on one line the  */}
          <div className='flex sm:h-[400px] h-[360px] gap-1 sm:rounded-l-[20px] overflow-hidden sm:ml-[100px]'>
            {/* maping can be used to dispay the images */}
            <div
              className='flex gap-4 overflow-x-scroll scroll-smooth no-scrollbar'
              style={{ scrollBehavior: "smooth" }}
            >
              <div className='animate-pulse rounded-lg bg-gray-300 sm:h-[400px] h-[360px] w-[500px]' />
            </div>
          </div>
        </div>
  
        <h1 className='animate-pulse rounded-lg bg-gray-300 w-52 h-5 mt-[24px] mb-[20px] px-4 sm:hidden font-semibold text-dgray'>
          {}
        </h1>
  
        <div className='  sm:hidden'>
          <div className='flex flex-col gap-[14px] px-4'>
            <div className=''>
              <div className='flex gap-3 pb-2 flex-col items-start '>
  
                {/* the address should be in this paragraph */}
                <p className="animate-pulse rounded-lg bg-gray-300 w-52 h-5">{}</p>
                <p className="animate-pulse rounded-lg bg-gray-300 w-52 h-5">{}</p>
                <p className="animate-pulse rounded-lg bg-gray-300 w-52 h-5">{}</p>
                <p className="animate-pulse rounded-lg bg-gray-300 w-52 h-5">{}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
   }