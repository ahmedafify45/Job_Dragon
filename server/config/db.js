import mongoose from "mongoose"

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/job-portal`)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`)
    process.exit(1) // Exit the process if connection fails
  }
}

export default connectDB
