const mongoose = require('mongoose');

const BusinessNoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['Meeting', 'Task', 'Project', 'Reminder', 'Brainstorming', 'Client Interaction'], 
        required: true 
    },
    coverImageURL: { type: String },
    attachments: [{ type: String }],
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('BusinessNote', BusinessNoteSchema);
