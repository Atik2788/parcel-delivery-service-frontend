/* eslint-disable @typescript-eslint/no-explicit-any */

import type { RootState } from '@/app/store';
import { useLoginMutation } from '@/features/auth/authApi';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { useTheme } from "@/hooks/useTheme"; 

const Login = () => {

const [login] = useLoginMutation();
const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  console.log(showPassword);

  // const { theme } = useTheme();
  
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const email = (form.email as HTMLInputElement).value;
  const password = (form.password as HTMLInputElement).value;

  try {
    await login({ email, password }).unwrap();
    toast.success("Login successful 🎉");
    navigate("/");
  } catch (err: any) {
    toast.error(err?.data?.message || "Login failed ❌");
  }

};

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
            <h1 className=" text-center text-3xl font-semibold">Sign in</h1>
            <form onSubmit={handleLogin} className="mt-12 space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input name="email" type="email" required className="w-full text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter your email address" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              
              <div>
                <label className=" text-sm font-medium mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input name="password" type={showPassword ? "text" : "password"} required className="w-full  text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter your password" />
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
                  Sign in
                </button>
              </div>
              <p className="text-sm !mt-6 text-center">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link> </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login