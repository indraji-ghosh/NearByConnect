import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb://127.0.0.1:27017/nearbyconnect';
    await mongoose.connect(mongoURI);
    console.log("mongodb connected successfully ✅");
  } catch (error) {
    console.error(`Mongodb connected error : ${error.message}`);
    process.exit(1);
  }
};






export default connectDB;