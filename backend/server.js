require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/api')

const app = express()
app.use(cors())
app.use(bodyParser.json())

if (!process.env.MONGO_URI) {
  console.error("CRITICAL ERROR: MONGO_URI is not defined");
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.error('DB Connection Error:', err));

app.use('/api', apiRoutes)


if (require.main === module) {
  app.listen(5000, () => {
    console.log("Server started on 5000")
  })
}

module.exports = app;
