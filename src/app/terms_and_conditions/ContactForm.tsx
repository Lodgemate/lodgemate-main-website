import React from 'react'

function ContactForm() {
  return (
    <div>
      <div className="sm:w-[390px] flex w-full flex-col  ">
        <div className="rounded-[16px] border-4 flex w-full flex-col overflow-hidden">
          <div className="flex justify-center bg-primary items-center py-[14px]">
            <p className=" test-[20px] text-white">
              Get in touch with us today
            </p>
          </div>
          <div className="flex flex-col px-4">
            <input
              type="text"
              name="name"
              id=""
              placeholder="Full name"
              className="flex w-full py-[12px] px-[16px] border rounded-[8px] mt-[12px] focus:outline-none appearance-none"
            />{" "}
            <input
              type="text"
              name="email"
              id=""
              placeholder="Email address"
              className="flex w-full py-[12px] px-[16px] border rounded-[8px] mt-[12px] focus:outline-none appearance-none"
            />{" "}
            <input
              type="number"
              name="phonenumbe"
              id=""
              placeholder="Phone number"
              className="flex w-full py-[12px] px-[16px] border rounded-[8px] mt-[12px] focus:outline-none appearance-none"
            />{" "}
            <textarea
              name="name"
              id=""
              placeholder="Write something to us..."
              className=" no-scrollbar h-[164px] flex w-full  py-[12px] px-[16px] border rounded-[8px] mt-[12px] focus:outline-none appearance-none"
            />
            <button className='flex justify-center items-center py-[12px] bg-primary text-white mt-[45px] mb-[20px] rounded-[8px]'>Submit</button>
          </div>
        </div>

              
      </div>
    </div>
  );
}

export default ContactForm
