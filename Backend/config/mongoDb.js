import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB Cluster');
    });
    await mongoose.connect(`${process.env.mongo_db_url}/doctor-appointment-booking-system-ai`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export default connectDB;