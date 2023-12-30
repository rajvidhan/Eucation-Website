const {instance} = require("../config/razorpay")
const Course = require("../models/Course")
const User = require("../models/User")
const  mailSender = require("../utils/mailsender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")


//capture the payment and initiate the razorpay order 
exports.capturePayment = async (req,res)=>{
    try{
         //get cpurse id and user id 
          const {course_id} = req.body;
          const userId = req.user.id;
          //validation
          //valid course 
          if(!course_id){
            return res.json({
                  success:false,
                  msg:"please povide a valid course id "
            })
            
          }
          //valid courseDetails
          let course = await Course.findById(course_id);
          if(!course){
            return res.json({
                success:false,
                msg:"could not find the course brother..."
            })
          }
          //user already pay for the same course 
          const uid = new mongoose.Types.ObjectId(userId);
          if(course.StudentsEnrolled.includes(uid)){
            return res.json({
                msg:"Student is already enrolled",
                success:false
            }).status(500)
          }
        //Order create 
        const amount = course.price;
        const currency = "INR";
        const options ={
            amount:amount*100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId:course_id,
                userId,
            }
        };
        try{
               //initiate the payment using razorpay 
               const paymentResponse = await instance.orders.create(options);
               console.log("paymentresponse",paymentResponse);

        }catch(err){
               console.log(err);
               return res.json({
                success:false,
                msg:"could not initiate the payment"
               });
        }
          

        //return response 
        res.json({
            success:true,
            coursename:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderid: paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
            msg:"payment capture is successfull by razorpay plateform brother.."
        }).status(200)
    }catch(err){
        console.log(err);
        res.json({
            success:false,
            msg:"something went wrong in capture the payment process"
        }).status(500)
    }
}

//verify signature
exports.verifySignature =async(req,res)=>{
const webhookSecret = "12345678";

const signature = req.headers["x-razorpay-signature"];

const shasum = crypto.createHmac("sha256",webhookSecret);
shasum.update(JSON.stringify(req.body));
const digest = shasum.digest("hex");

if(signature == digest){
    console.log("payment is authorized");
    const {courseId,userId}= req.body.payload.payment.entity.notes;
    try{
          //fulfill the action
          //find the course and enrolled student in it 
          const enrolledCourse =  await Course.findOneAndUpdate({_id:courseId},{
            $push:{
                StudentsEnrolled:userId,
            }
          },{new:true});

          if(!enrolledCourse){
            res.json({
                success:false,
                msg:"course not found"
            }).status(500);
          }
          console.log(enrolledCourse);
          //now find the student schema and update the course section of it brother
          const enrolledStudent = await User.findOneAndUpdate({_id:userId},{
            $push:{
                courses:courseId,
            }
          },{new:true});
          if(!enrolledStudent){
            return res.json({
                success:false,
                msg:"user not found"
            }).status(500);
          }
          console.log(enrolledStudent);

          //mail send krna hai 
          const emailResponse = await mailSender(
            enrolledStudent.email,
            "Congratulation from vidhcode",
            "Congratulation , You are  onboarded into new vidhcode course",
          );
          console.log(emailResponse);
          return res.json({
            success:true,
            msg:"Signature verified and course added"
          }).status(200);
    }catch(err){
          console.log(err);
          res.json({
            success:false,
            msg:err.message,
          }).status(500)
    }
}

else{
    res.json({
        success:false,
        msg:"Invalid request.."
    }).status(400)
}

}