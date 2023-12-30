const express = require("express");
const router = express.Router();

// >>>>>IMPORT REQUIRE CONTROLLERS FIRST 
const {capturePayment,verifySignature} = require("../Controllers/Payments");
//>>>>>>>IMPORT THE REQUIRE MIDDLEWARES 
const {auth,isStudent} = require("../middlewares/auth")

//>>>>>>>>>>>create routes 
router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifySignature",verifySignature);



module.exports = router 