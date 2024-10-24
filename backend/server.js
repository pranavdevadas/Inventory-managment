import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoute.js";
import adminRoutes from './routes/adminRoute.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send(`Server is Ready`));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running ${port}`));
