import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection";
import authRoutes from "./routes/authRoutes";

dotenv.config();

//creating express app instance
const app: Express = express();

//middleware to parse json body
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);

//port declaration
const port = process.env.PORT || 5050;

//calling db connection function
connectDB();

//listening to the port
app.listen(port, (): void => {
  console.log(`http://localhost:${port}`);
});
