import mongoose, { Schema, Types, Document } from "mongoose";
import { IResource } from "../types/types";
import missileModel from "./missileModel";

export interface Organization extends Document {
    _id: Types.ObjectId;
    name: string;
    resources: IResource[];
    budget: number;
}

const organizationSchema = new Schema<Organization>({
    name: {
        type: String,
    },
    resources: {
        type: [Object],
        default: []
    },
    budget: {
        type: Number,
    },
});

const organizationModel = mongoose.model("Organization", organizationSchema);

export default organizationModel;