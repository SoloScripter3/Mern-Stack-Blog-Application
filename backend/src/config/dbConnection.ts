import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("mongo uri is not defined");
    }
    await mongoose.connect(mongoUri);
    console.log("database connected successfully");
  } catch (error) {
    console.log("connection error", error);
    process.exit(1);
  }
};

export default connectDB;
