import mongoose from "mongoose";
import { configDotenv } from "dotenv";
const connectToMongDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connected to mongodb");
  } catch (error) {
    console.log("error connection to connect to db");
  }
};
export default connectToMongDB;
