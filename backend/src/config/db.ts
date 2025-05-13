import mongoose from "mongoose";

async function connectToDb() {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL || "mongodb://localhost:27017/second-brain"
    );
    console.log("Connected to db");
  } catch (error) {
    console.log("Not able to connect to database", error);
  }
}

export default connectToDb;
