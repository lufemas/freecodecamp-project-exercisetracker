const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
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