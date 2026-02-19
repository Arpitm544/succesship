require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/api')

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// MongoDB Connection Options
const mongooseOptions = {
  socketTimeoutMS: 60000,
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  maxPoolSize: 20,
  minPoolSize: 5,
  retryWrites: true,
  retryReads: true,
  family: 4
};

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Database already connected");
      return;
    }
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, mongooseOptions);
    console.log("✓ DB Connected Successfully");
  } catch (err) {
    console.error("✗ DB Connection Error:", err.message);
    process.exit(1);
  }
};

// Connect to DB on server startup
connectDB();

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

if (require.main === module) {
  app.listen(5000, () => {
    console.log("Server started on port 5000")
  })
}

module.exports = app;
