import React from 'react'
import SearchBar from './SearchBar'

function LodgeDetailPage() {
  return (
    <div className="mt-[100px] text-[16px]">
      <SearchBar />

      <div>
        <h1>Name of Logde</h1>

        <div className="flex justify-between">
          <div className='flex'>
            <div className="flex">
              <div>
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
                  alt=""
                />
              </div>
              <p>14 cross avenue, Owerri, Imo state.</p>
                      </div>
                      
                      <div>
                          i
                      </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LodgeDetailPage
