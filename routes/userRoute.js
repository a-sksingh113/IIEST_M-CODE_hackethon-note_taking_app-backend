const exprees = require('express');
const {handleUserSignin, handleUserSignup, handleUserlogout} = require("../controllers/userController");
const upload = require('../config/cloudinaryConfig');
const router = exprees.Router();



router.post("/signup",  upload.single("profileImageURL"), handleUserSignup);
router.post("/signin", handleUserSignin);
router.post("/logout", handleUserlogout);


module.exports = router;