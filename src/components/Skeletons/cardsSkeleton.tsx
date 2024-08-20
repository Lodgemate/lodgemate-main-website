const GallerySkeleton = () => {
  // Fill the array with undefined to allow mapping over it
  const arrayEmpty = new Array(5).fill(undefined);

  return (
    <>
      {arrayEmpty.map((_, index) => (
        <div key={index} className='max-w-sm rounded overflow-hidden' data-aos='fade-up'>
          <div className='relative'>
            <div className='w-full animate-pulse bg-gray-300 h-[144px] sm:h-[299px] object-cover rounded-[12px]' />
          </div>
          <div className='py-[15px]'>
            <div className='font-bold space-x-3 text-[16px] flex items-start'>
              <div className='ml-2 animate-pulse rounded-full bg-gray-300 w-5 h-5' />
              <p className='animate-pulse rounded-md bg-gray-300 h-3 w-32'></p>
            </div>
            <div className='flex flex-col pt-2 items-start gap-3 mt-[4px] text-gray-600'>
              <p className='animate-pulse rounded-lg bg-gray-300 h-3 w-48'></p>
              <p className='animate-pulse rounded-lg bg-gray-300 h-3 w-48'></p>
              <p className='animate-pulse rounded-lg bg-gray-300 h-3 w-48'></p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GallerySkeleton;
