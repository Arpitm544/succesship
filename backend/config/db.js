const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      socketTimeoutMS: 60000,
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      maxPoolSize: 20,
      minPoolSize: 5,
      retryWrites: true,
      retryReads: true,
      family: 4
    })
    console.log("✅ MongoDB Connected Successfully")
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message)
    process.exit(1)
  }
}

module.exports = connectDB