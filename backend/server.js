require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/api')

const app = express()
app.use(cors())
app.use(bodyParser.json())
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use('/api', apiRoutes)


if (require.main === module) {
  app.listen(5000, () => {
    console.log("Server started on 5000")
  })
}

module.exports = app;
