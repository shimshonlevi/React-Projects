import mongoose from "mongoose";
import organizationsData from '../data/organizations.json';
import missilesData from '../data/missiles.json';
import organizationModel from "../models/orgonizationModel";
import missileModel from "../models/missileModel";

const connectDB = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI as string);

        if((await organizationModel.find()).length == 0)
            await seedWarData();

        console.log("mongoDB connected: ", connected.connection.host);
    } 
    catch (error: any) {
        console.error(error.message);
    }
}

const seedWarData = async () => {
    await organizationModel.insertMany(organizationsData);
    await missileModel.insertMany(missilesData);
}

export default connectDB;