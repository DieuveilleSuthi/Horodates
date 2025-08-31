const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true }); // createdAt, updatedAt auto

module.exports = mongoose.model("Event", EventSchema);
