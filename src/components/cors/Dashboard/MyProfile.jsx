import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { FaRegEdit } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  console.log(user);

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      <h1 className="text-[30px] font-medium text-white">My Profile</h1>

      {/* section1  */}
      <div className="flex w-[100%]  mt-[70px] rounded-2xl p-[30px]  bg-richblack-800 justify-between">
        
        <div className="flex justify-between">

          <img
            src={user?.image}
            alt={`profile-${user.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="flex flex-col ">
            <p className="text-[20px] text-richblack-100">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-[20px] text-richblack-100">{user?.email}</p>
          </div>

        </div>

        <IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")} />
      </div>

{/* section 2  */}

<div className="text-richblack-300">
  <div >
    <p >About</p>
    <IconBtn text="Edit"
    onclick={()=>navigate("/dashboard/setting")} />
  </div>
  <p>{user?.additionalDetails?.about ?? "Write something about yourself"}</p>
</div>

{/* section 3  */}

<div className="text-richblack-300">
  <div>
    <p>Personal Details</p>
    <IconBtn text="Edit" onclick={()=>navigate("/dashboard/setting")} />
  </div>

  
  <div>
    <div>
      <p>FirstName</p>
      <p>{user?.firstName}</p>
    </div>
    <div>
      <p>Email</p>
      <p>{user?.email}</p>
    </div>
    <div>
      <p>Gender</p>
      <p>{user?.additionalDetails?.gender ?? " Add your gender information please.."}</p>
    </div>
    <div>
      <p>LastName</p>
      <p>{user?.lastName}</p>
    </div>
    <div>
      <p>Phone Number</p>
      <p>{user?.additionalDetails?.contactNumber ?? "Add contact number please.."}</p>
    </div>
    <div>
      <p>Date Of Birth</p>
      <p>{user?.additionalDetails?.dateOfBirth ?? "Add date of Birth please.."}</p>
    </div>


  </div>
</div>


    </div>
  );
};

export default MyProfile;
