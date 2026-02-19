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
    await mongoose.connect(process.env.MONGO_URI, {
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
      retryWrites: true
    });
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to SuccessShip Backend',
    description: 'Memory Management & AI Query System',
    version: '1.0.0',
    endpoints: {
      'GET /': 'Welcome message',
      'POST /api/memories': 'Save a memory',
      'GET /api/memories': 'Get all memories',
      'POST /api/query': 'Query memories with AI analysis'
    }
  });
});

app.use('/api', apiRoutes)


if (require.main === module) {
  app.listen(5000, () => {
    console.log("Server started on 5000")
  })
}

module.exports = app;
