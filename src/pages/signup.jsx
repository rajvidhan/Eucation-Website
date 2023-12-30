import React from "react";
import signupimage from "../assets/Images/signup.webp";
import Highlighttext from "../components/cors/Homepage/HighlightText";
const signup = () => {
  return (
    <div className="mx-auto flex flex-row w-11/12 max-w-maxContent  text-white mt-[170px]">
      {/* first for inputs */}
      <div className="flex flex-col w-[508px] px-[32px] py-[32px]">
        <div className="w-[370px] ">
          <h1 className="text-3xl mb-1">
            Join the millions learning to code with StudyNotion for free
          </h1>
          <p className="text-richblack-100">
            Build skills for today, tomorrow, and beyond. Education{" "}
          </p>
          <Highlighttext text={"to future-proof your career."} />
        </div>

        {/* input boxes  */}
        <div className="w-[370px]">
          <div className="flex flex-row mt-[40px] gap-[20px]">
            <div className="flex flex-col">
              <label className="text-richblack-5 font-inter mb-1 ml-1">
                First Name
              </label>
              <input
                type="text"
                className="bg-richblack-800 border-b-[0.1rem] border-white outline-0 h-[38px] w-[175px] px-2 py-2 gap-[12px] rounded-xl"
                placeholder="Enter first name"
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-richblack-5 font-inter mb-1 ml-1">
                Last Name
              </label>
              <input
                type="text"
                className="bg-richblack-800 border-b-[0.1rem] border-white outline-0 h-[38px] w-[175px] px-2 py-2 gap-[12px] rounded-xl"
                placeholder="Enter last name"
              />
            </div>
          </div>
          <div className="mt-[13px]">
            <label className="text-richblack-5 font-inter mb-1 ml-1">
              Email
            </label>
            <input
              type="email"
              className="bg-richblack-800 border-b-[0.1rem] border-white outline-0 h-[38px] w-full px-2 py-2 gap-[12px] rounded-xl"
              placeholder="Enter Email address"
            />
          </div>
         
         <div className="flex flex-row mt-[13px] gap-[20px]">
         <div className="flex flex-col">
              <label className="text-richblack-5 font-inter mb-1 ml-1">
                Password
              </label>
              <input
                type="text"
                className="bg-richblack-800 border-b-[0.1rem] border-white outline-0 h-[38px] w-[175px] px-2 py-2 gap-[12px] rounded-xl"
                placeholder="Password"
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-richblack-5 font-inter mb-1 ml-1">
                Confirm Password
              </label>
              <input
                type="text"
                className="bg-richblack-800 border-b-[0.1rem] border-white outline-0 h-[38px] w-[175px] px-2 py-2 gap-[12px] rounded-xl"
                placeholder="Confirm password"
              />
            </div>
         </div>
          
          </div>
      </div>

      {/* second for the image section  */}
      <div className="px-[55px]">
        <img src={signupimage} alt="" />
      </div>
    </div>
  );
};

export default signup;
