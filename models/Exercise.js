const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const exerciseSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: new Date(),
  },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
