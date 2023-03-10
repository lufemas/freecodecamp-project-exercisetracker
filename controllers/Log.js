const mongoose = require("mongoose");
const logModel = require("../models/Log");

/**
 * Add a new user
 * @param {string} username 
 * @returns {object saved user
 */
const addUser = async (username) => {
  const user = new logModel({
  username,
  });
  console.log("user new: ", user);
  return await user.save();
}

/**
 * Get all logs
 * @returns {object} all logs
 */
const allLogs = async (name) => {
  return await logModel.find({});
};


/**
 * Log an exercise to the user log that has the provided _id
 * @param { _id, description, duration, date } 
 * @returns {object} the new log
 */
const log = async ({ _id, description, duration, date }) => {
  console.log('date:', date)
  console.log('!!date:', !!date)
  console.log('typeof date:', typeof date)
  console.log('new Date(date):', new Date(date))
  console.log('new Date(date).toDateString():', new Date(date).toDateString())
 Date.parse(date) ? date = (new Date(date)).toDateString() : date = (new Date()).toDateString();
  let log = await logModel.findOneAndUpdate(
    { _id },
    {
      $inc: { count: 1 },
      "$push":{
        log:{
          description,
          duration,
          date,
        }
      }
    }
  );
  log = await logModel.findOne({ _id});
 
  return {_id: log._id, username: log.username, date, duration: parseInt(duration), description};
};


/**
 * Find logs from one user
 * @param {number} id 
 * @returns the user logs
 */
const findById = (id) => {
  console.log('id:', id);
  return logModel.findById(id);
};

module.exports = { addUser, findById, log, allLogs };
