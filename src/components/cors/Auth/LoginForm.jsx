import React from 'react'
import loginimage from "../assets/Images/login.webp";
import Highlighttext from "../components/cors/Homepage/HighlightText";
const login = () => {
  return (
    <div>
       <div className="mx-auto flex flex-row w-11/12 max-w-maxContent  text-white mt-[170px]">
      {/* first for inputs */}
      <div className="flex flex-col w-[508px] px-[32px] py-[32px]">
        <div className="w-[370px]  ">
          <h1 className="text-3xl font-bold mb-1  ">
           Welcome Back 
          </h1>
          <p className="text-richblack-100 italic">
            Build skills for today, tomorrow, and beyond.{" "}
          </p>
          <Highlighttext  text={"Education to future-proof your career."} />
        </div>

        {/* input boxes  */}
        <div className="w-[370px] flex flex-col ">
         
          
           <div className='my-[30px] '>
           <label className="text-richblack-5 font-inter mb-1  ml-1 text-[13px]">
              Email Address
            </label>
            <input
              type="email"
              className="bg-richblack-800 outline-0 h-[38px] w-full px-4 py-6 border-b-[0.1rem] border-white   gap-[12px] rounded-xl"
              placeholder="Enter Email address"
            />
           </div>
         
            <div>
            <label className="text-richblack-5 font-inter mb-1 ml-1 text-[13px]">
                Password
              </label>
              <input
                type="text"
                className="bg-richblack-800 border-b-[0.1rem] border-white outline-0 h-[38px] w-full px-4 py-6 gap-[12px] rounded-xl"
                placeholder="Password"
              />     
              </div>   
    </div>
      </div>

      {/* second for the image section  */}
      <div className="px-[55px]">
        <img src={loginimage} alt="" />
      </div>
    </div>
    </div>
  )
}

export default login
