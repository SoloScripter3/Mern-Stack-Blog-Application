import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection";

dotenv.config();

const startSever = async (port: number): Promise<void> => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not defined in env file");
  }

  try {
    await connectDB(uri);
    const app: Express = express();

    app.get("/", (req: Request, res: Response): void => {
      res.send("hello namasthe");
    });

    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log("server setup error");
  }
};

startSever(Number(process.env.PORT));
