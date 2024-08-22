import { selectAllUsersdata, setUserData } from '@/lib/features/Users/usersSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Endpoints } from '@/services/Api/endpoints'
import Blurbg from '@/Ui/shared/Blurbg'
import SmallLoader from '@/Ui/shared/SmallLoader'
import { FetchApi } from '@/utils/Fetchdata'
import React, { useEffect, useState } from 'react'

const EditProfileModal = () => {
    const dispatch= useAppDispatch()
    const data= useAppSelector(selectAllUsersdata)
    const parsedData={
        bio: data?.data.user.bio,
        firstName: data?.data.user.firstName,
        lastName: data?.data.user.lastName,
        phoneNumber: data?.data.user.phoneNumber,
    }
    const [formdata, setformdata] = useState(parsedData)
    // useEffect(() => {
    //     // Lock the scroll when the component mounts
    //     document.body.style.overflow = "hidden";
        
    //     // Cleanup: unlock the scroll when the component unmounts
    //     return () => {
    //       document.body.style.overflow = "";
    //     };
    //   }, []);
    
    console.log(formdata)
    console.log(data?.data.user.bio)
    const handleChange=(e:any)=>{
            setformdata({...formdata, [e.target.name]:e.target.value})
    }
    const handleSubmit=async(e:  React.FormEvent)=>{
        console.log(":djsdh")
        e.preventDefault()
        const localStorageToken = localStorage.getItem("token");
        const parseToken =localStorageToken && JSON.parse(localStorageToken)
        const body={
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${parseToken}`,
            },
            body:JSON.stringify(formdata)
        }
        try {
            const res = await FetchApi(Endpoints.getUsers,body)
            dispatch(setUserData(res))
            console.log(res)
        } catch (error) {
            
        }
    }
  return (
//     <Blurbg>
//       {data? <div className='w-screeen p-5 rounded-lg flex flex-col items-center min-w-[500px] bg-white h-fit relative'>
//         <form 
//           onSubmit={(e)=>handleSubmit(e)}
            
//             className='mb-4 py-6  max-h-[400px] mt-5  w-full overflow-y-scroll'>
//           {/* <div className="relative z-0 w-full mb-5 group ">
//     <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//     <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
// </div>
// <div className="relative z-0 w-full mb-5 group">
//     <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//     <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
// </div>*/}
//           <div className='relative z-0 w-full mb-5 group'>
//             <input
//               type='text'
//               onChange={handleChange}
//               name='bio'
//               id='floating_bio'
//               value={formdata.bio ? formdata.bio : parsedData.bio}
//               autoComplete='off'
//               className='block py-2.5 px-0 w-full text-sm  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
//               placeholder=' '
//               required
//             />
//             <label className='peer-focus:font-medium absolute text-sm z-50 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
//               Bio
//             </label>
//           </div>
//           <div className='grid md:grid-cols-2 md:gap-6'>
//             <div className='relative z-0 w-full mb-5 group'>
//               <input
//                 type='text'
//                 name='firstName'
//                 onChange={handleChange}
//                 id='floating_first_name'
//               value={formdata.firstName ? formdata.firstName : parsedData.firstName}
//                 className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
//                 placeholder=' '
//                 required
//               />
//               <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
//                 First name
//               </label>
//             </div>
//             <div className='relative z-0 w-full mb-5 group'>
//               <input
//                 type='text'
//                 name='lastName'
//                 onChange={handleChange}
//               value={formdata.lastName ? formdata.lastName : parsedData.lastName}
//                 id='floating_last_name'
//                 className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
//                 placeholder=' '
//                 required
//               />
//               <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
//                 Last name
//               </label>
//             </div>
//           </div>
//           <div className='grid md:grid-cols-2 md:gap-6'>
//             <div className='relative z-0 w-full mb-5 group'>
//               <input
//                 type='tel'
//                 name='phoneNumber'
//                 onChange={handleChange}
//               value={formdata.phoneNumber ? formdata.phoneNumber : parsedData.phoneNumber}
//                 id='floating_phone'
//                 className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
//                 placeholder=' '
//                 required
//               />
//               <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
//                 Phone number (123-456-7890)
//               </label>
//             </div>
//             {/* <div className="relative z-0 w-full mb-5 group">
//       <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//       <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
//   </div> */}
//           </div>
//           <button
//             type='submit'
//             className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
//           >
//             Submit
//           </button>
//         </form>
//         <p className=' text-center font-medium text-slate-800'></p>
//         <p
//           onClick={() => {}}
//           className=' cursor-pointer m-1 text-black absolute z-50 top-0 right-0 '
//         >
//           Close
//         </p>
//       </div> : <SmallLoader/>}
//     </Blurbg>
<></>
  );
}

export default EditProfileModal