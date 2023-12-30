const Section = require("../models/Section")
const Course = require("../models/Course")



exports.createSection = async (req,res) =>{
    try{
         //data fetch
         const {sectionName,courseId} = req.body;
         //data validation
         if(!sectionName || !courseId){
   return res.json({
    success:false,
    msg:"All fields are require "
   })
         }
         
         //create section
         const newSection = await Section.create({sectionName})
         //update the course
         const updatedCourseDetails =await Course.findByIdAndUpdate(
            courseId,{
            $push:{
                courseContent:newSection._id,
            }
         },{new:true})
         //response return 
         return res.json({
            success:true,
            msg:"new section is created successfully brother ..",
            data:updatedCourseDetails
         }).status(200)
         
    }catch(err){
        console.log(err);
          return res.json({
            success:false,
           
            msg:"something went wrong in create a section brother"
          }).status(400);
    }
}


exports.updateSection = async (req,res)=>{
    try{
        //data
        const {sectionName,sectionId}  = req.body;

        //data validation
        if(!sectionName ||  !sectionId){
            res.json({
                success:false,
                msg:"All fields are require "
               })
        }
        //update the data
        const section = await Section.findByIdAndUpdate(sectionId,
            {
                sectionName
            },{new:true})
        //return response 
        res.json({
            success:true,
            msg:" section is updated successfully brother ..",
           
         }).status(200)
    }catch(err){
        res.json({
            success:false,
            msg:"something went wrong in update a section brother"
          }).status(400);
    }
}



exports.deleteSection = async (req,res) =>{
    try{
        //get id - assuming that we  are sending id in params
   const {sectionId} = req.body;
   await Section.findByIdAndDelete(sectionId);
   //do we need to delete the id from course  schema 

   const {courseId} = req.body;
   
   await Course.findByIdAndUpdate(courseId,{
    $pull:{
     courseContent:sectionId
    }
   },{new:true});
   console.log("hey")
   return res.json({
    success:true,
    msg:"the section is deleted successfully"
   })
    }catch(err){
        console.log(err);
        return res.json({
            success:false,
            msg:"something went wrong in delete a section brother"
          }).status(400);
    }
}