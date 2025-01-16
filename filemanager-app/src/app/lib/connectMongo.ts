import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectMongo() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  await mongoose.connect(MONGODB_URI);

  console.log("Connected to Database");

  return;
}

export default connectMongo;