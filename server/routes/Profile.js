const express = require("express")
const router = express.Router();

//>>>>>>>>>>import the middleware 
const {auth} = require("../middlewares/auth");

//>>>>>>import the require controllers 
const {updateProfile,deleteAccount,getAllUserDetails,updateDisplayPicture,getEnrolledCourses} = require("../Controllers/Profile");

//>>>>>>routes  
router.put("/updateprofile",auth,updateProfile);
router.delete("/deleteProfile",auth,deleteAccount);
router.get("/getalluserdetails",auth,getAllUserDetails);
router.put("/updatedisplaypicture",auth,updateDisplayPicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

module.exports = router;