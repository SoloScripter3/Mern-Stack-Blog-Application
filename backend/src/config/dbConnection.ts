import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log("database connected successfully");
  } catch (error) {
    console.log("connection error", error);
    process.exit(1);
  }
};

export default connectDB;
