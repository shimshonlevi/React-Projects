// config/connectDB.js

import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()


const connectionString = process.env.CONNECTION_STRING || "mongodb://localhost:27017/defaultDB";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(connectionString);
        console.log(`Connected to DB Database, host: ${connect.connection.host}, Database name: ${connect.connection.name}`);
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1); 
    }
};

export default connectDB;
