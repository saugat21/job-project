import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDb not connecte");
        console.log(`Error:${error.message}`);
        console.error(`Stack Trace: ${error.stack}`);
        process.exit(1);
    }
}

export default connectDB;