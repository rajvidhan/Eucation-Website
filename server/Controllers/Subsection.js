const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
// //create subsection
// exports.createSubSection = async (req, res) => {
//   try {
//     //data fetch from req body
//     const { title, description, sectionId } = req.body;
//     //fetch the video
//     const video = req.files.videoFile;
//     //validation
//     if (!video || !title || !description || !sectionId) {
//       return res
//         .json({
//           success: false,
//           msg: "All fields are required brother ",
//         })
//         .status(404);
//     }
//     console.log(video);

//     //upload video to cloudinary
//     const uploadDetails = await uploadImageToCloudinary(
//       video,
//       process.env.FOLDER_NAME
//     );

//     console.log("uploaddetails", uploadDetails);
//     //create the subsection
//     const subSectionDetails = await SubSection.create({
//       title: title,
//       timeDuration: `${uploadDetails.duration}`,
//       description: description,
//       videoUrl: uploadDetails.secure_url,
//     });
//     //update the section by adding the subsections id in section model
//     const updateSection = await Section.findByIdAndUpdate(
//       { _id: sectionId },
//       {
//         $push: {
//           subSection: subSectionDetails._id,
//         },
//       },
//       { new: true }
//     )
//       .populate("Section")
//       .exec();
//     // return response
//     return res
//       .json({
//         success: true,
//         msg: "the subsection is created successfully ",
//         updateSection,
//       })
//       .status(200);
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json({
//         success: false,
//         msg: "sub section is not created in a good manner brother",
//       })
     
//   }
// };

exports.createSubSection = async (req, res) => {
    try {
      // Extract necessary information from the request body
      const { sectionId, title, description } = req.body;
      const video = req.files.videoFile;
  
      // Check if all necessary fields are provided
      if (!sectionId || !title || !description || !video) {
        return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
      }
      console.log(video);
  
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      console.log(uploadDetails);
      
      // Create a new sub-section with the necessary information
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })
  
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      ).populate("subSection")
  
      console.log("Updated subsection : ", updatedSection)
  
      // TODO : -> log update section after adding poputate query
      // Return the updated section in the response
      return res.status(200).json({ success: true, data: updatedSection })
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }




//update subsection
exports.updatedSubSection = async (req, res) => {
  try {
    //fetch the data
    const { title, timeDuration, description, subSectionId } = req.body;
    const video = req.files.videoFile;
    //data velidation
    if (!title || !timeDuration || !description || !subSectionId || !video) {
      res
        .json({
          success: false,
          msg: "All fields are required ..",
        })
        .status(400);
    }
    //upload the video
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    //update the data
    const subSection = await Section.findByIdAndUpdate(
      subSectionId,
      {
        title,
        description,
        timeDuration,
        videoUrl: uploadDetails.secure_url,
      },
      { new: true }
    )
      .populate("subSection")
      .exec();
    //return response
    return res
      .json({
        success: true,
        msg: "subsection is updated successfully brother ",
      })
      .status(200);
  } catch (err) {
    console.log(err);
    res
      .json({
        success: false,
        msg: "the update of subsection is going wrong brother",
      })
      .status(400);
  }
};

// delete subsection

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.body;

    await SubSection.findByIdAndDelete(subSectionId);

    return res
      .json({
        success: true,
        msg: "the subsection is delete successfully brother ..",
      })
      .status(200);
  } catch (err) {
    console.log(err);
    res
      .json({
        success: false,
        msg: "delete the subsection is failed ",
      })
      .status(400);
  }
};
