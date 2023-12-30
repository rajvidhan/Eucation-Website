const express = require("express");
const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP =require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../utils/mailsender");
require("dotenv").config();






//sendotp
exports.sendOtp = async(req,res)=>{
try{

//fetch email from request ki body okay
const {email}= req.body;
//check user is found is db or not
const checkemail = await User.findOne({email});
//if user is exist 
if(checkemail){
    return res.json(
        {
            success:false,
            msg:"User already registered...."
        }).status(401)
}

    //generate otp
    let otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });
    console.log("otp generated :",otp);
    //check unique otp or not 
    const result =  await OTP.findOne({otp:otp});
    console.log("Result is Generate OTP Func");
	console.log("Result", result);

    while(result){
        otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
    });
    
    }


    const otpPayload = {email,otp};
    //create an entry in db 
   const otpBody = await OTP.create(otpPayload);
   console.log("otp body> ",otpBody)


//    return response 
res.json({
success:true,
msg:"OTP send successfully..",
otp
}).status(200);


}catch(err){
    console.log(err);
    res.json({
        success:false,
        msg:"something went wrong in send the otp on email...",
        data:otp
    }).status(200);
}}



//signup functionality
exports.signUp = async (req,res)=>{
    try{
        //data fetch from the body
        const {firstName,lastName,otp,email,password,confirmPassword,accountType,contactNumber} = req.body;
    
    //VALIDATION
    if(!firstName || !lastName || !email || !password || !confirmPassword ||!otp){
        return res.json({
            success:false,
            msg:"All fields are required .."
        }).status(403);
    }
    //validate the password 
    if(password !== confirmPassword){
        return res.json({
            success:false,
            msg:"Your password  should  be same "
        })
    }
    //email validation
    const emailcheck =await User.findOne({email});
    if(emailcheck){
        return res.json({
            success:false,
            msg:"user is already registered ..."
        }).status(400)
    }
    //find the most recent otp
    //yha kuch dekho ek min
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log("recent otp >>>>>> ",recentOtp);
  //validate the otp
  if(recentOtp.length == 0){
return res.json({
    success:false,
    msg:"Otp length is zero so otp not found"
})
  }
  else if(otp !== recentOtp[0].otp){
    return res.json({
        success:false,
        msg:"Invalid OTP"
    })
  }
 // hash the password 
 const hashedpassword = await bcrypt.hash(password,10);
 // Create the user
 let approved = "";
 approved === "Instructor" ? (approved = false) : (approved = true);

 //entry created in db 
 const ProfileDetailes = await Profile.create({
    gender:null,
    dateOfBirth:null,
    about:null,
    contactNumber:null
 })
const user = await User.create({
    firstName,
    lastName,
    email,
    approved: approved,
    password:hashedpassword,
    contactNumber,
    accountType,
    additionalDetails:ProfileDetailes._id,
    image:`http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
});

console.log("user>>",user)

// return result  
        return res.json({
          success:true,
          data:user,
          msg:"Your signup is successfull brother"
        }).status(200);

    }catch(err){
        console.log(err);
        return res.json({
            status:false,
            msg:"User cannot be registered please try again brother"
        }).status(500);
    }
}







//login
exports.login = async (req,res)=>{
    try{

         const {email,password} = req.body;
         if(!email || !password){
            return res.status(403).json({
                success:false,
                msg:"All fields are required please try again🤙"
            });
         }
         //email validation
         const user = await User.findOne({email}).populate("additionalDetails");
         if(!user){
            res.json({
                status:false,
                msg:"This email is not registered brother 🤙"
            })
         }
         const payload = {
            email:user.email,
            accountType:user.accountType,
            id:user._id
         }
         //password validation
         const ispasswordValid = await bcrypt.compare(password,user.password);
         if(!ispasswordValid){
            return res.json({
                status:false,
                msg:"Incorrect  password brother🤙"
            })
         }
         else {

            //create a token for authrization
            const token = jwt.sign(payload,
                                   process.env.JWT_SECRET,
                                   {
                                    expiresIn:"34h",
                                  }
                                  );
            user.token = token;
            user.password = undefined;
            console.log("token is >",token);

            // create cookies
            
            const options ={
                expires: new Date(Date.now()+3*24*60*60*100),
                httpOnly:true,
              }
              res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                msg:"User is loged in brother"
              })}
    }catch(err){
        console.log(err);
        return res.json({
            status:false,
            msg:"log in failed 😕"
        })

    }
}



//changepassword code 
exports.changePassword =async (req,res)=>{
    try{
        //get data from req of body 
        const {email} = req.body;

        //get oldpassword , newpassword , confirmnewpassword
        const {oldpassword,newpassword,confirmpassword} = req.body;
        //validation
        if(!newpassword || !confirmpassword || !oldpassword){
            res.json({
               success:false,
               msg:"old fields are required brother...."
            }).status(400)
        }
        //update the password in database
        const updateuser = await User.findByIdAndUpdate(newpassword, { password:newpassword},{new:true});
        //send mail of password update brother 
        await mailSender(email,"The Password is updated..","your password is update smoothly and its going ver fine...");
        
    }catch(err){
        res.json({
            success:false,
            msg:"something went wrong in reset the password.."
        }).status(200);
    }
}