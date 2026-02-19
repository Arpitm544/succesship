require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/api')
const connectDB = require('./config/db')

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))



// Connect to DB on server startup
connectDB()

// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to SuccessShip Backend',
    description: 'Memory Management & AI Query System',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      'GET /': 'Welcome message',
      'POST /api/memories': 'Save a memory',
      'GET /api/memories': 'Get all memories',
      'POST /api/query': 'Query memories with AI analysis'
    }
  });
});

app.use('/api', apiRoutes)

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

  app.listen(5000, () => {
    console.log("Server started on port 5000")
  })


module.exports = app;
