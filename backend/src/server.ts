import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.get("/", (req: Request, res: Response): void => {
  res.send("Namasthe with Typescript");
});

const port: number = Number(process.env.PORT) || 5050;

app.listen(port, (): void => {
  console.log(`http://localhost:${port}`);
});
