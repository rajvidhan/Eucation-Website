const Category = require("../models/Category")

//create tag ka handler function 
exports.createCategory = async (req,res)=>{
    try{


        const {name,description} = req.body;
        //validation 
        if(!name || !description){
            res.json({
                success:false,
                msg:"All field are require "
            }).status(500);
        }
        //create entry in db 
        const categoryDetails = await Category.create({
            name,description
        });
        console.log("categoryDetails",categoryDetails);
        //resturn the response 
       return  res.json({
        success:true,
        msg:"Category create successfully..."
       }).status(500)



    }catch(err){
        console.log("error in the build of Category",err);
        res.json({
            success:false,
            msg:"something went wrong in creation of Category..."
        }).status(403);
    }
}


//get all the Categories 
exports.showAllCategories = async (req,res)=>{
    try{
        
        const allCategories = await Category.find({},{name:true, description:true});
        res.json({
            success:true,
            msg:"All Categories return successfully ...",
            allCategories
        }).status(200)

    }catch(err){
       
        console.log("err in get all Category >",err);
      res.json({
        success:false,
        msg:"error in get all Category"
      }).status(500)
    }
}


//category page details ka handler function
exports.categoryPageDetails =async(req,res)=>{
    try{
          //getcategoryid
          const {categoryId} = req.body;
          //fetch the all courses according to category id
          const selectedCategory = await Category.findById({categoryId})
                          .populate("courses")
                          .exec();
          //validation
          if(!selectedCategory){
            res.json({
               success:false,
               msg:"data not found brother"
            }).status(400)
          }
          //get course for different category
          const differentcategories = await Category.find({_id:{$ne:categoryId},})
                                                           .populate("courses")
                                                           .exec();

          //get top selling courses 

          //return response 
          return res.json({
            success:true,
            data:{
                selectedCategory,
                differentcategories
            },
            
          }).status(200)
    }catch(err){
 return res.json({
    success:false,
    msg:err.message
 }).status(400)
    }
}