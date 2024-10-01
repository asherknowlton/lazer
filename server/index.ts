import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes";

const app = express();

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRoutes);

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
