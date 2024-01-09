import React from "react";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import {DeleteAccount} from "../../../services/operations/authAPI"

import { useNavigate } from "react-router-dom";
const Setting = () => {
  const { user } = useSelector((state) => state.profile);
  
  const navigate = useNavigate();

  return (
    <div className=" w-11/12 max-w-[1000px] py-10">
      <div className="flex items-center">
        <FiEdit className="text-richblack-600 text-[30px] mr-[10px]" />
        <h1 className="text-[30px] font-medium text-white">Edit Profile</h1>
      </div>
      <hr className="text-richblack-600" />

      {/* sections  */}
      <div className="ml-[175px] w-full">
        {/* section 1  */}
        <div className="flex border-richblack-600 border-[1px] mt-[70px] rounded-xl items-center justify-between bg-richblack-800 p-[30px]">
          <div className="flex gap-x-[30px] ">
            <img
              src={user?.image}
              alt={`profile-${user.firstName}`}
              className="aspect-square w-[88px] rounded-full object-cover"
            />
            <div className="flex flex-col ">
              <p className="text-[23px]  text-richblack-100">
                Change Profile Picture
              </p>
            </div>
          </div>
        </div>

        {/* delete account section  */}
        <div className="flex border-red-400 gap-x-[15px] border-[1px] mt-[70px] rounded-xl items-center  bg-red-500 bg-opacity-30 p-[30px]">
          <div className="p-[10px] bg-opacity-40  bg-red-300 rounded-full">
            <MdDelete className=" text-red-400 text-[35px]  " />
          </div>

          <div className="flex flex-col w-[70%]">
            <h1 className="text-[20px] font-semibold text-white">
              Delete Account
            </h1>
            <div className="flex flex-col mt-[8px]">
              <p className="text-white font-medium mb-[4px]">
                Would you like to delete your account?{" "}
              </p>
              <p className="text-white font-medium">
                This account contains Paid Courses.Deleting your account will
                remove all the contain associated with it.
              </p>
            </div>
          </div>
          <button onClick={DeleteAccount(user.id)} className="p-[10px]   text-white font-medium bg-red-600 rounded-2xl">
            Delete
          </button>
        </div>



      </div>
    </div>
  );
};

export default Setting;
