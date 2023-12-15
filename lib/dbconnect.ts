import mongoose from "mongoose";

declare global {
  var mongoConnection: any; // This must be a `var` and not a `let / const`
}

const dbConnect = async () => {
  try {
    if (global.mongoConnection) {
      console.log("Already connected");
      return global.mongoConnection;
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to DB");
    return connection;
  } catch (error) {
    console.error("Connection error:", error);
    throw error;
  }
};

export default dbConnect;

