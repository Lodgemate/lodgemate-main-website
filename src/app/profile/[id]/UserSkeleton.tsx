import React from 'react'

const UserSkeleton = () => {
    return (
      <div className='w-full sm:max-w-430px sm:shadow sm:border pt-[100px]  sm:pt-[65px] text-[14px] rounded-[12px] sm:p-4 bg-white'>
        {/* User image and menu button */}
        <div className='flex w-full justify-between items-center mb-4'>
          <div className='flex items-center'>
            <div className='w-16 h-16 rounded-full animate-pulse bg-gray-300 ' />
          </div>
        </div>

        {/* User name and status */}
        <div className='flex items-center mb-4'>
          <p className='animate-pulse bg-gray-300 w-32 rounded h-2'></p>
        </div>

        {/* Rating and reviews */}
        <div className='flex items-center mb-4'>
          <p className='animate-pulse bg-gray-300 w-32 rounded h-2'></p>
        </div>

        {/* User description */}
        <div className='mb-4'>
          <p className='animate-pulse bg-gray-300 w-32 rounded h-2'></p>
        </div>

        <div className='flex mb-4 gap-2 items-center'>
          <p className='animate-pulse bg-gray-300 w-7  h-7 rounded-full'></p>
          <p className='animate-pulse bg-gray-300 w-7  h-7 rounded-full'></p>
          <p className='animate-pulse bg-gray-300 w-7  h-7 rounded-full'></p>
          <p className='animate-pulse bg-gray-300 w-7  h-7 rounded-full'></p>
        </div>

        {/* User stats */}
        <div className='flex justify-between mb-2'>
          <p className='animate-pulse bg-gray-300 w-32 rounded h-2'></p>
          <p className='animate-pulse bg-gray-300 w-5 rounded-full h-5'></p>
        </div>
        <div className='flex justify-between mb-2'>
          <p className='animate-pulse bg-gray-300 w-32 rounded h-2'></p>
          <p className='animate-pulse bg-gray-300 w-5 rounded-full h-5'></p>
        </div>
        <div className='flex justify-between mb-2'>
          <p className='animate-pulse bg-gray-300 w-32 rounded h-2'></p>
          <p className='animate-pulse bg-gray-300 w-5 rounded-full h-5'></p>
        </div>
        <div className='flex justify-between mb-2'>
          <p className='animate-pulse bg-gray-300 w-32 rounded h-2'></p>
          <p className='animate-pulse bg-gray-300 w-5 rounded-full h-5'></p>
        </div>
      </div>
    );
  };

export default UserSkeleton