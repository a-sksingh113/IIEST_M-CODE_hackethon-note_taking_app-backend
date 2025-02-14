const CollegeNote = require("../models/collegeModel");
const BusinessNote = require("../models/businessModel");
const PersonalNote = require("../models/personalModel");

const getAllNotes = async (req, res) => {
  try {
    const { userId } = req.params;

    const collegeNotes = await CollegeNote.find({ userId });
    const businessNotes = await BusinessNote.find({ userId });
    const personalNotes = await PersonalNote.find({ userId });

    const allNotes = {
      college: collegeNotes,
      business: businessNotes,
      personal: personalNotes,
    };

    return res.status(200).json(allNotes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllNotes };
