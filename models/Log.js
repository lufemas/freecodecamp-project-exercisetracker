const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  log: [{
    description: {
      type: String
    },
    duration: {
      type: Number,
    },
    date: {
      type: String,
    },
  }]
});

module.exports = mongoose.model('Log', logSchema);