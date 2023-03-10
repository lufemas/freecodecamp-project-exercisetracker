const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userController = require("./controllers/User");
const logController = require("./controllers/Log");
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
  const log = await logController.log(req.body);
  res.json(log);
});

app.get("/api/users/:_id/logs", async (req, res) => {
  const { from, to, limit } = req.query;
  console.log("GET /api/users/:_id/logs");
  const log = await logController.findById(req.params._id);

  log.log = log.log.filter((exercise) => {
    let result = true;
    if (from) {
      result = result && Date.parse(from) <= Date.parse(exercise.date);
    }

    if (to) {
      result = result && Date.parse(to) >= Date.parse(exercise.date);
    }

    return result;
  });

  if (limit) {
    log.log = log.log.slice(0, parseInt(limit));
  }
  log.log.map( exercise => exercise.date = new Date(exercise.date).toDateString())
  res.json(log);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
