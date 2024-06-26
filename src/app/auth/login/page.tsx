import React from 'react'
import LoginForm from './Form'

function Login() {
  return (
    <div className=" relative">
      <div className="flex w-full h-[900px] bg-black opacity-[12%] "></div>
      <div className=' px-2 absolute top-1 flex w-full'>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login
