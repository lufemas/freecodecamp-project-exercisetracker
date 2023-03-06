const mongoose = require("mongoose");
const userModel = require("../models/User");

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

module.exports = { add, all };
