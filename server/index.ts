import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes";

const app = express();

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRoutes);

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
