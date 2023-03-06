const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
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
