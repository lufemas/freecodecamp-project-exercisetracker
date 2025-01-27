const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userController = require('./controllers/User');
require('dotenv').config();
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI).then(result => {
  console.log('result: ', result)
}).catch(error=>console.log('Error connecting to MongoDB: ', error));

app.use(cors());
app.use(bodyParser());
app.use(express.static('public'));

app.post('/api/users', async (req, res) => {
  const newUser = await userController.add(req.body.username);
  res.json(newUser);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})
