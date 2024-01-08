import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { IoPersonSharp } from "react-icons/io5";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className=" w-11/12 max-w-[1000px] py-10">
      <div className="flex items-center">
        <IoPersonSharp className="text-richblack-600 text-[30px] mr-[10px]" />
        <h1 className="text-[30px] font-medium text-white">My Profile</h1>
      </div>
      <hr className="text-richblack-600" />

      <div className="ml-[175px] w-full">
        {/* section1  */}
        <div className="flex border-richblack-600 border-[1px] mt-[70px] rounded-xl items-center justify-between bg-richblack-800 p-[30px]">
          <div className="flex gap-x-[30px] ">
            <img
              src={user?.image}
              alt={`profile-${user.firstName}`}
              className="aspect-square w-[88px] rounded-full object-cover"
            />
            <div className="flex flex-col ">
              <p className="text-[35px]  text-white">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-[20px] text-richblack-300">{user?.email}</p>
            </div>
          </div>

          <div className="p-[10px]">
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            />
          </div>
        </div>

        {/* section 2  */}

        <div className="flex border-richblack-600 border-[1px] flex-col mt-[50px] rounded-xl   bg-richblack-800 p-[30px]">
          <div className="flex justify-between">
            <p className="text-[25px]  text-white">About</p>
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            />
          </div>
          <p className=" mt-[15px] text-[20px] text-richblack-300">
            {user?.additionalDetails?.about ?? "Write something about yourself"}
          </p>
        </div>

        {/* section 3  */}

        <div className="flex border-richblack-600 border-[1px] flex-col mt-[50px] rounded-xl   bg-richblack-800 p-[30px]">
          <div className="flex justify-between items-center">
            <p className="text-[25px]  text-white">Personal Details</p>
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            />
          </div>

          <div className="mt-[15px] w-[70%]">
            <div className="flex justify-between  ">
              <div className="flex flex-col">
                <p className="text-richblack-500 text-[18px]">FirstName</p>
                <p className="text-white text-[18px]">{user?.firstName}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-richblack-500 text-[18px]">LastName</p>
                <p className="text-white text-[18px]">{user?.lastName}</p>
              </div>
            </div>

            <div className="flex mt-[15px] justify-between ">
              <div className="flex flex-col">
                <p className="text-richblack-500 text-[18px]">Email</p>
                <p className="text-white text-[18px]">{user?.email}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-richblack-500 text-[18px]">Phone Number</p>
                <p className="text-white text-[18px]">
                  {user?.additionalDetails?.contactNumber ??
                    "Add contact number please.."}
                </p>
              </div>
            </div>

            <div className="flex mt-[15px] justify-between">
              <div className="flex flex-col">
                <p className="text-richblack-500 text-[18px]">Gender</p>
                <p className="text-white text-[18px]">
                  {user?.additionalDetails?.gender ??
                    " Add your gender information please.."}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-richblack-500 text-[18px]">Date Of Birth</p>
                <p className="text-white text-[18px]">
                  {user?.additionalDetails?.dateOfBirth ??
                    "Add date of Birth please.."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
