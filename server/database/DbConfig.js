import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const Dbconnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log(`Connected to database`);
  } catch (error) {
    console.log(`Error while connected to database ${error.message}`);
  }
};
