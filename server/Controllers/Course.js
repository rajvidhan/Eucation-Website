const Course = require("../models/Course")
const Category = require("../models/Category")
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

//CREATE THE COURSE 
exports.createCourse = async (req,res)=>{
    try{
        //fetch the data
        const {courseName,courseDescription,whatYouWillLearn,tag,price,category} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag){
            return res.json({
                success:false,
                msg:"All fields are required ...."
            }).status(400);

        }
       
        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        //todo:verify tht user id and instructor id is same or different 
        if(!instructorDetails){
            return res.json({
                success:false,
                msg:"instructor details not found brother ..."
            }).status(404)
        }
    //check given tag is valid or not 
    const CategoryDetails = await Category.findById(category);
    if(!CategoryDetails){
        return res.json({
            success:false,
            msg:"tag details not found brother ..."
        }).status(404)
    }

    //upload image to cloudinary 
    const thumbnailImage = uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

    //create an entry for new course 
    const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor:instructorDetails._id,
        whatYouWillLearn,
        price,
        Category:CategoryDetails._id,
        tag,
        thumbnail:thumbnailImage.secure_url,

    });
    //add the new course to the user schema instructor
    await User.findByIdAndUpdate({
        _id:instructorDetails._id
    },{
        $push:{
            courses:newCourse._id,
        }
    },{new:true});

    //update the Category schema 
    await Category.findByIdAndUpdate(
        {_id:CategoryDetails._id},
        {
            $push :{
                course:newCourse._id,
            }
        },{
            new:true
        }
    );
    //return the response 
    return res.json({
        success:true ,
        msg:"the new course is  created successfully ..brother ",
        data:newCourse
    }).status(200)

    }catch(err){
        console.log(err)
       return  res.json({
            success:false,
            msg:"Error in the creation of new course brother "
        }).status(400)
    }
}



exports.getAllCourses = async (req,res) =>{
    try{

        const allCourses = await Course.find({},{courseName:true,price:true,instructor:true,thumbnail:true
            ,ratingAndReviews:true,StudentsEnrolled:true}).populate("instructor").exec();


return res.json({
success:true,
msg:"get all the courses successfully brother .."
}).status(200)


    }catch(err){
      console.log(err);
      res.json({
                   success:false,
                   msg:"not fetch the all courses"
                })      
    }
}



//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
            //get id
            const {courseId} = req.body;
            //find course details
            const courseDetails = await Course.find(
                                        {_id:courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                        //.populate("ratingAndreviews")
                                        .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                        })
                                        .exec();

                //validation
                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    });
                }
                //return response
                return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:courseDetails,
                })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


