const BusinessNote = require("../models/businessModel");

// Create Business Note
const handleCreateBusinessNote = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        
        // Handle cover image and attachments
        const coverImageURL = req.files?.coverImageURL ? req.files.coverImageURL[0].path : '/uploads/default.png';
        const attachments = req.files?.attachments ? req.files.attachments.map(file => file.path) : [];

        const newNote = new BusinessNote({
            userId: req.params.userId,
            title,
            content,
            category,
            coverImageURL,
            attachments,
            tags: tags ? tags.split(',') : []
        });

        await newNote.save();
        res.status(201).json({ message: 'Business note created successfully', note: newNote });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Business Notes for a User
const getAllBusinessNote = async (req, res) => {
    try {
        const notes = await BusinessNote.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Specific Business Note by ID
const getBusinessNote = async (req, res) => {
    try {
        const note = await BusinessNote.findOne({ _id: req.params.noteId, userId: req.params.userId });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Business Note
const updateBusinessNote = async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        const note = await BusinessNote.findOne({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;
        note.category = req.body.category || note.category;
        note.tags = req.body.tags ? req.body.tags.split(',') : note.tags;

        if (req.files?.coverImage) {
            note.coverImageURL = req.files.coverImage[0].path;
        }
        if (req.files?.attachments) {
            note.attachments = req.files.attachments.map(file => file.path);
        }
        
        note.updatedAt = Date.now();
        await note.save();

        res.status(200).json({ message: 'Business note updated successfully', note });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Business Note
const deleteBusinessNote = async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        const note = await BusinessNote.findOneAndDelete({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.status(200).json({ message: 'Business note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    handleCreateBusinessNote,
    getAllBusinessNote,
    getBusinessNote,
    updateBusinessNote,
    deleteBusinessNote
};
