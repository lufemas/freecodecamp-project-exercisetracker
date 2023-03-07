const mongoose = require("mongoose");
const exerciseModel = require("../models/Exercise");

const add = async ({ _id, description, duration, date }) => {
  let exercise = await exerciseModel.findOneAndUpdate(
    { _id },
    {
      description,
      duration,
      date: new Date(date).toDateString() || new Date().toDateString(),
    }
  );
  console.log("found exercise: ", exercise);
  if (!exercise) {
    exercise = new exerciseModel({
      _id,
      description,
      duration,
      date: new Date(date).toDateString() || new Date().toDateString(),
    });
    console.log("exercise new: ", exercise);
    return await exercise.save();
  }
  return exercise;
};

const all = async (name) => {
  return await exerciseModel.find({});
};

const findOne = (properties) => {
  console.log("Exercise findOne by: ", properties);

  return exerciseModel.findOne({ properties });
};

module.exports = { add, all };
