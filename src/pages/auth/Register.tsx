/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-as-const */

import type { RootState } from '@/app/store';
import { useRegisterMutation } from '@/features/auth/authApi';
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { toast } from "sonner";


const Register = () => {

const [register] = useRegisterMutation();
const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);

const user = useSelector((state: RootState) => state.auth.user);
console.log(user);

const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
  name: HTMLInputElement;
  email: HTMLInputElement;
  phone: HTMLInputElement;
  address: HTMLInputElement;
  password: HTMLInputElement;
};

const formData = {
  name: formElements.name.value,
  email: formElements.email.value,
  phone: formElements.phone.value,
  address: formElements.address.value,
  password: formElements.password.value,
  role: "SENDER" as "SENDER", // explicitly type cast
};

  try {
    await register(formData).unwrap(); 
    toast.success("Register successful 🎉");
    navigate("/");
  } catch (err: any) {
    console.log(err?.data?.message)
    const accExist = err?.data?.message;
    const errorMessage = err?.data?.errorSouces[0]?.message;
    if(errorMessage){
      toast.error(errorMessage);
    }
    else {
      toast.error(accExist);
    }
};
}


const handleShowPassword = () => {
   setShowPassword(prev => !prev);
}

  return (
<div className="">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <a href="javascript:void(0)"><img
            src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-40 mb-8 mx-auto block" />
          </a>

          <div className="p-6 sm:p-8 rounded-2xl  shadow-sm">
            <h1 className=" text-center text-3xl font-semibold">Sign Up</h1>
            <form onSubmit={handleRegister} className="mt-12 space-y-6">

              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <div className="relative flex items-center">
                  <input name="name" type="name" required className="w-full text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter your name" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input name="email" type="email" required className="w-full text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter your email address" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Phone</label>
                <div className="relative flex items-center">
                  <input name="phone" type="tel" required className="w-full text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter your phone number" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Address</label>
                <div className="relative flex items-center">
                  <input name="address" type="text" required className="w-full text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter your address" />
                </div>
              </div>
              
              <div>
                <label className=" text-sm font-medium mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input name="password" type="password" required className="w-full  text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter your password" />
                  <svg onClick={handleShowPassword}   className="w-4 h-4 absolute right-4 cursor-pointer" >
                    {showPassword ? (
                        <FaRegEye  /> 
                      
                    ) : (
                          <FaRegEyeSlash />
                    )}
                    
                  </svg>
                </div>
              </div>
                             

              <div className="!mt-12">
                <button type="submit" className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                  Sign Up
                </button>
              </div>
              <p className="text-sm !mt-6 text-center">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign up</Link> </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register