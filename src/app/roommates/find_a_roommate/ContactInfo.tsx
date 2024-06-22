import React from 'react'

function ContactInfo() {
  return (
    <div className="mt-[24px] mb-[77px]">
      <label htmlFor="contactinfo" className="font-bold text-[16px]">
        Contact information
      </label>

      <div className="flex gap-2 items-center border-b rounded-[8px px-4">
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719060331/utilities/webspirre/Facebook_oj0fh8.svg"
          alt=""
        />
        <input
          type="text"
          name="facbook"
          id=""
          placeholder="Facebook Profile Link"
          className="flex w-full py-[12px] px-[16px]  mt-[12px] focus:outline-none appearance-none"
        />
      </div>
      <div className="flex gap-2 items-center border-b rounded-[8px px-4">
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719060331/utilities/webspirre/Instagram_pelr42.svg"
          alt=""
        />
        <input
          type="text"
          name="Instagram"
          id=""
          placeholder="Instagram Profile Link"
          className="flex w-full py-[12px] px-[16px]  mt-[12px] focus:outline-none appearance-none"
        />
      </div>
      <div className="flex gap-2 items-center border-b rounded-[8px px-4">
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719060331/utilities/webspirre/bi_whatsapp_qitibc.svg"
          alt=""
        />
        <input
          type="text"
          name="Whatsapp"
          id=""
          placeholder="WhatsApp Profile Link"
          className="flex w-full py-[12px] px-[16px]   mt-[12px] focus:outline-none appearance-none"
        />
      </div>
      <div className="flex gap-2 items-center border-b rounded-[8px px-4">
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719060331/utilities/webspirre/LinkedIn_njc1po.svg"
          alt=""
        />
        <input
          type="text"
          name="LinkedIn"
          id=""
          placeholder="LinkedIn Profile Link"
          className="flex w-full py-[12px] px-[16px]  mt-[12px] focus:outline-none appearance-none"
        />
      </div>
    </div>
  );
}

export default ContactInfo
