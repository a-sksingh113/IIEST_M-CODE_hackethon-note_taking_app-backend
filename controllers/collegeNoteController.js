const CollegeNote = require("../models/collegeModel");

// Create College Note
const handleCreateCollegeNote = async (req, res) => {
    try {
        const { title, content, course, semester, subject, tags } = req.body;
        
        // Handle cover image and attachments
        const coverImageURL = req.files?.coverImageURL ? req.files.coverImageURL[0].path : '/uploads/default.png';
        const attachments = req.files?.attachments ? req.files.attachments.map(file => file.path) : [];

        const newNote = new CollegeNote({
            userId: req.params.userId,
            title,
            content,
            course,
            semester,
            subject,
            coverImageURL,
            attachments,
            tags: tags ? tags.split(',') : []
        });

        await newNote.save();
        res.status(201).json({ message: 'College note created successfully', note: newNote });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All College Notes for a User
const getAllCollegeNote = async (req, res) => {
    try {
        const notes = await CollegeNote.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Specific College Note by ID
const getCollegeNote = async (req, res) => {
    try {
        const note = await CollegeNote.findOne({ _id: req.params.noteId, userId: req.params.userId });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update College Note
const updateCollegeNote = async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        const note = await CollegeNote.findOne({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;
        note.course = req.body.course || note.course;
        note.semester = req.body.semester || note.semester;
        note.subject = req.body.subject || note.subject;
        note.tags = req.body.tags ? req.body.tags.split(',') : note.tags;

        if (req.files?.coverImage) {
            note.coverImageURL = req.files.coverImage[0].path;
        }
        if (req.files?.attachments) {
            note.attachments = req.files.attachments.map(file => file.path);
        }
        
        note.updatedAt = Date.now();
        await note.save();

        res.status(200).json({ message: 'College note updated successfully', note });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete College Note
const deleteCollegeNote = async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        const note = await CollegeNote.findOneAndDelete({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.status(200).json({ message: 'College note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    handleCreateCollegeNote,
    getAllCollegeNote,
    getCollegeNote,
    updateCollegeNote,
    deleteCollegeNote
};
