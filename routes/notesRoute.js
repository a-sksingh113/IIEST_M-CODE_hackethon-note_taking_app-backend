const express = require('express');
const router = express.Router();
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const { 
    handleCreateCollegeNote, 
    getAllCollegeNote, 
    getCollegeNote, 
    updateCollegeNote, 
    deleteCollegeNote 
} = require('../controllers/collegeNoteController');
const {
    handleCreateBusinessNote,
    getAllBusinessNote,
    getBusinessNote,
    updateBusinessNote,
    deleteBusinessNote,
} =require('../controllers/businessNoteController');
const {
    handleCreatePersonalNote,
  getAllPersonalNote,
  getPersonalNote,
  updatePersonalNote,
  deletePersonalNote,
} =require('../controllers/personalNoteController');
const {getAllNotes} = require('../controllers/generalNoteController')

const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");



// College Notes    
router.post("/college/:userId/",checkForAuthenticationCookie("token"),  authorizeRoles(["STUDENT"]),upload.fields([
    { name: 'coverImageURL', maxCount: 1 },
    { name: 'attachments', maxCount: 10 }
  ]),handleCreateCollegeNote);  
router.get("/college/:userId", checkForAuthenticationCookie("token"),authorizeRoles(["STUDENT"]),getAllCollegeNote);           
router.get("/college/:userId/:noteId",checkForAuthenticationCookie("token"), authorizeRoles(["STUDENT"]),getCollegeNote);    
router.put("/college/:userId/:noteId",checkForAuthenticationCookie("token"), authorizeRoles(["STUDENT"]),upload.fields([
    { name: 'coverImageURL', maxCount: 1 },
    { name: 'attachments', maxCount: 10 }
  ]),updateCollegeNote); 
router.delete("/college/:userId/:noteId",checkForAuthenticationCookie("token"), authorizeRoles(["STUDENT","ADMIN"]),deleteCollegeNote); 

// Business Notes
router.post("/business/:userId",checkForAuthenticationCookie("token"), authorizeRoles(["STUDENT"]),upload.fields([
    { name: 'coverImageURL', maxCount: 1 },
    { name: 'attachments', maxCount: 10 }
  ]),handleCreateBusinessNote);  
router.get("/business/:userId",checkForAuthenticationCookie("token"), authorizeRoles(["STUDENT"]),getAllBusinessNote);           
router.get("/business/:userId/:noteId",checkForAuthenticationCookie("token"), authorizeRoles(["STUDENT"]),getBusinessNote);    
router.put("/business/:userId/:noteId",checkForAuthenticationCookie("token"), authorizeRoles(["STUDENT"]),upload.fields([
    { name: 'coverImageURL', maxCount: 1 },
    { name: 'attachments', maxCount: 10 }
  ]),updateBusinessNote);
router.delete("/business/:userId/:noteId",checkForAuthenticationCookie("token"), authorizeRoles(["STUDENT"]),deleteBusinessNote); 

// Personal Notes
router.post("/personal/:userId", checkForAuthenticationCookie("token"),authorizeRoles(["STUDENT"]),upload.fields([
    { name: 'coverImageURL', maxCount: 1 },
    { name: 'attachments', maxCount: 10 }
  ]),handleCreatePersonalNote);  
router.get("/personal/:userId",checkForAuthenticationCookie("token"),authorizeRoles(["STUDENT"]), getAllPersonalNote);
router.get("/personal/:userId/:noteId",checkForAuthenticationCookie("token"), authorizeRoles(["STUDENT"]),getPersonalNote);
router.put("/personal/:userId/:noteId",checkForAuthenticationCookie("token"), authorizeRoles(["STUDENT"]),upload.fields([
    { name: 'coverImageURL', maxCount: 1 },
    { name: 'attachments', maxCount: 10 }
  ]),updatePersonalNote); 
router.delete("/personal/:userId/:noteId", checkForAuthenticationCookie("token"),authorizeRoles(["STUDENT"]),deletePersonalNote);
// General Notes
router.get("/user/:userId",checkForAuthenticationCookie("token"), authorizeRoles(["STUDENT","ADMIN"]),getAllNotes); 

module.exports = router;
