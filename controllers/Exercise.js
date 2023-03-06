const mongoose = require("mongoose");
const exerciseModel = require("../models/Exercise");

const add = async ({ _id, description, duration, date }) => {
  const exercise = new exerciseModel({
    _id,
    description,
    duration,
    date: date || new Date(),
  });
  console.log("exercise new: ", exercise);
  return await exercise.save();
};

const all = async (name) => {
  return await exerciseModel.find({});
};

module.exports = { add, all };
