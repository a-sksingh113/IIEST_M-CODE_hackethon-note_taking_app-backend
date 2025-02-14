const mongoose = require('mongoose');

const PersonalNoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    mood: { type: String, enum: ['Happy', 'Sad', 'Motivated', 'Anxious'], required: false },
    coverImageURL: { type: String }, 
    attachments: [{ type: String }], 
    activity: { type: String, required: false },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('PersonalNote', PersonalNoteSchema);
