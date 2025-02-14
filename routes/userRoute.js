const exprees = require('express');
const {handleUserSignin, handleUserSignup, handleUserlogout,handleUpdateUser,handleForgotPassword} = require("../controllers/userController");
const upload = require('../config/cloudinaryConfig');
const router = exprees.Router();



router.post("/signup",  upload.single("profileImageURL"), handleUserSignup);
router.post("/signin", handleUserSignin);
router.post("/logout", handleUserlogout);
router.post("/update",upload.single("profileImageURL"),handleUpdateUser);
router.post("/forget-password",handleForgotPassword);
router.post("/reset-password",handleForgotPassword);



module.exports = router;