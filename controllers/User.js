const mongoose = require("mongoose");
const userModel = require("../models/Log");

const add = async (name) => {
  const user = new userModel({
    username: name,
  });
  console.log("user new: ", user);
  return await user.save();
};

const all = async (name) => {
  return await userModel.find({});
};

const findOne = async (properties) => {
  console.log("find by: ", properties);

  return await userModel.findOne(properties);
};

module.exports = { add, all, findOne };
