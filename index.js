const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userController = require("./controllers/User");
const exerciseController = require("./controllers/Exercise");
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("MongoDB connected!");
  })
  .catch((error) => console.log("Error connecting to MongoDB: ", error));

app.use(cors());
app.use(bodyParser());
app.use(express.static("public"));

app.post("/api/users", async (req, res) => {
  console.log("POST /api/users");
  const newUser = await userController.add(req.body.username);
  res.json(newUser);
});

app.get("/api/users", async (req, res) => {
  console.log("GET /api/users");
  const all = await userController.all();
  res.json(all);
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  console.log("POST /api/users/:_id/exercises ");
  req.body._id = req.params._id;
  console.log("body: ", req.body);
  const newExercise = await exerciseController.add(req.body);
  // if (!newExercise) {
  //   res.status(404).json({ error: "user does not exist" });
  // }
  const user = await userController.findOne({ _id: newExercise._id });
  newExercise.username = user.username;
  console.log("username:", { ...newExercise._doc, test: "test" });
  res.json({ ...newExercise._doc, ...user._doc });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
