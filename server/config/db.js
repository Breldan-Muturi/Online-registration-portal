import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
