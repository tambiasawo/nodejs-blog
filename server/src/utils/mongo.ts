import "dotenv/config";

import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connection.once("open", () => {
  console.log("Mongoose connection started");
});

mongoose.connection.on("error", (err: any) => {
  console.log("An error occurred", err);
});

async function mongoConnect() {
  await mongoose.connect(MONGODB_URL as string);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export { mongoConnect, mongoDisconnect };
