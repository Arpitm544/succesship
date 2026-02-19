require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/api')

const app = express()
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err))

app.use('/api', apiRoutes)

app.listen(5000, () => {
  console.log("Server started on 5000")
})
