import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Force a check here to give you a clearer error if it's missing
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in your .env file!");
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Stop the server if DB connection fails
  }
};

export default connectDB;