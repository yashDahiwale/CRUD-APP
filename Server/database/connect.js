import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const mongoString = process.env.MONGODBSTRING;

const connect = async () => {
  try {
    const response = await mongoose.connect(mongoString);
    console.log("Database Connected Successfully.");
  } catch (error) {
    console.log("Database Connection Failed!");
  }
};

connect();
