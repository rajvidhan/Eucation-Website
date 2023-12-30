const express = require("express");
const router = express.Router();

// >>>>>>Import the require controllers brother 
const {getCourseDetails,getAllCourses,createCourse} = require("../Controllers/Course")
const {createCategory,showAllCategories,categoryPageDetails} = require("../Controllers/category")
const {createSection,updateSection,deleteSection } = require("../Controllers/Section")
const {createSubSection,updatedSubSection,deleteSubSection } = require("../Controllers/Subsection")
const {createRating,getAverageRating ,getAllRatingAndReview} = require("../Controllers/ratingAndReview")


//>>>>>>>>>>>Import the  all middlewares brother 
const {auth,isStudent,isAdmin,isInstructor } = require("../middlewares/auth")

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>COURSE ROUTES

router.post("/getCoursedetails",getCourseDetails);
router.get("/getallcourse",getAllCourses);
router.post("/createcourse",auth,isInstructor,createCourse);
router.post("/createsection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);
router.post("/createSubSection",auth,isInstructor,createSubSection);
router.post("/updatedSubSection",auth,isInstructor,updatedSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);

//>>>>>>>>>>>>>>>>>>>CATEGORY ROUTES 
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategories);
router.post("/categoryPageDetails",categoryPageDetails);

//>>>>>>>>>>>>>>>>>>RATING AND REVIEWS 
router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getAllRatingAndReview",getAllRatingAndReview);

module.exports = router





