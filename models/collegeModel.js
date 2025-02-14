const mongoose = require("mongoose");

const CollegeNoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    course: { type: String, enum: ["UG", "PG", "PhD"], required: true },
    coverImageURL: { type: String }, 
    attachments: [{ type: String }],
    semester: { type: String },
    subject: { type: String },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CollegeNote", CollegeNoteSchema);
