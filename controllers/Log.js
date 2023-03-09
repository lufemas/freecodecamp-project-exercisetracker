const mongoose = require("mongoose");
const logModel = require("../models/Log");

const addUser = async (username) => {
  const user = new logModel({
  username,
  });
  console.log("user new: ", user);
  return await user.save();
}

const allUsers = async (name) => {
  return await logModel.find({});
};

const allLogs = async (name) => {
  return await logModel.find({});
};

const log = async ({ _id, description, duration, date }) => {
  let log = await logModel.findOneAndUpdate(
    { _id },
    {
      description,
      duration,
      date: new Date(date).toDateString() || new Date().toDateString(),
    }
  );
  console.log("log :: found: ", log);
  if (!log) {
    // exercise = new exerciseModel({
    //   _id,
    //   description,
    //   duration,
    //   date: new Date(date).toDateString() || new Date().toDateString(),
    // });
    console.log("exercise new: ", exercise);
    // return await log.save();
  }
  return log;
};



const findOne = (properties) => {
  console.log("Exercise findOne by: ", properties);

  return logModel.findOne({ properties });
};

module.exports = { addUser, allUsers, log, findOne, allLogs };
