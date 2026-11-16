import mongoose from "mongoose";

// Function to establish connection with MongoDB
const connectDb = async () => {
  try {
    // Connect to MongoDB using the connection string from .env
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Not connected", error);
  }
};

export default connectDb;
