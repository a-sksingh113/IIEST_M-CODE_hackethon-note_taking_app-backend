const PersonalNote = require("../models/personalModel");

// Create Personal Note
const handleCreatePersonalNote = async (req, res) => {
  try {
    const { title, content, category, mood, tags } = req.body;

    // Handle cover image and attachments
    const coverImageURL = req.files?.coverImageURL ? req.files.coverImageURL[0].path : '/uploads/default.png';
    
    const attachments = req.files?.attachments 
      ? req.files.attachments.map(file => file.path) 
      : [];

    const newNote = new PersonalNote({
      userId: req.params.userId,
      title,
      content,
      category,
      mood,
      coverImageURL,
      attachments,
      tags: tags ? tags.split(',') : []
    });

    await newNote.save();
    return res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get All Personal Notes for a User
const getAllPersonalNote = async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await PersonalNote.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a Specific Personal Note
const getPersonalNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await PersonalNote.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update Personal Note
const updatePersonalNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await PersonalNote.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    note.category = req.body.category || note.category;
    note.mood = req.body.mood || note.mood;
    note.tags = req.body.tags ? req.body.tags.split(',') : note.tags;

    // Update cover image and attachments if provided
    if (req.files?.coverImageURL) {
      note.coverImageURL = req.files.coverImageURL[0].path;
    }
    if (req.files?.attachments) {
      note.attachments = req.files.attachments.map(file => file.path);
    }

    note.updatedAt = Date.now();
    await note.save();

    return res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete Personal Note
const deletePersonalNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const deletedNote = await PersonalNote.findByIdAndDelete(noteId);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleCreatePersonalNote,
  getAllPersonalNote,
  getPersonalNote,
  updatePersonalNote,
  deletePersonalNote,
};
