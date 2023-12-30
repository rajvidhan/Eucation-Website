const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/Course")
exports.updateProfile = async (req, res) => {
  try {
    //fetch the id
    const { gender, dateOfBirth = "", about = "", contactNumber } = req.body;
    //userid
    const id = req.user.id;
    //validation
    if (!gender || !contactNumber || !id) {
      res.json({
        success: false,
        msg: "All fields are required ...",
      });
    }
    //find the profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    // and update

    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.gender = gender;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();
    //return res
    return res
      .json({
        success: true,
        msg: "profile updated successfully brother ...",
      })
      .status(200);
  } catch (err) {
    console.log(err);
    res
      .json({
        success: false,
        msg: "Error in updation of profile..",
      })
      .status(400);
  }
};

//deleteaccount function
//how can we schedual  this delete opration
exports.deleteAccount = async (req, res) => {
  try {
    //getId
    const id = req.user.id;
     
    //validation
    const userDetail = await User.findById(id);
    if (!userDetail) {
      return res.json({
        msg: "user nott found",
        success: false,
      });
    }
    //update the course schema 
    const {courseID} = userDetail.courses;
    await Course.findByIdAndUpdate(courseID,{
      $pull:{
        StudentsEnrolled:id
      }
    },{new:true});
    //delete the profile first
    await Profile.findByIdAndDelete({ _id: userDetail.additionalDetails });
    //search the id and delete the user
    await User.findByIdAndDelete({ _id: id });
    // return response
    
    return res
      .json({
        success: true,
        msg: "the user account deleted successfully brother ",
      })
      .status(200);
  } catch (err) {
    return res
      .json({
        success: false,
        msg: "the user account is not deleted ",
      })
      .status(500);
  }
};

//grt all users details
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userdetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res
      .json({
        success: true,
        msg: "get  user all details successfully brother",
        userdetails,
      })
      .status(200);
  } catch (err) {
    res.json({
      success: false,
      msg: "error in get the all details ",
    });
  }
};

//handler for get the all enrolled courses by the user
exports.getEnrolledCourses = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id;
    //get userdetails and populate the courses section
    const userDetails = await User.findById(userId).populate("courses").exec();
    //validation
    if (!userDetails) {
      return res
        .json({
          success: false,
          msg: "could not find the user with the help of user id",
        })
        .status(404);
    }
    //return response
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//handler function for updatedisplaypicture
exports.updateDisplayPicture = async (req, res) => {
  try {
    //fetch the user id and image from req of body
    const userId = req.user.id;
    const displayPicture = req.files.displayPicture;
    //upload image to cloudinary
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log("image", image);
    //update the users image section
    const updateprofile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    //send the response
    return res.json({
      success: true,
      msg: "Image update successfully...",
      data: updateprofile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "error in upate of the image ",
    });
  }
};
