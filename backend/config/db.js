import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Attempting to establish the neural link to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Success: Log the host to confirm exactly where we are connected
    console.log(`📡 Neural Link Established: ${conn.connection.host}`);
  } catch (error) {
    // Failure: Specific error logging
    console.error(`❌ Connection Failure: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;