import mongoose, { Schema, Types, Document, ObjectId } from "mongoose";
import{ IMissileResource, ILaunched, IDF, Terorists}from '../types/types'

export type objectID = ObjectId;

export interface IUser {
    username: string;
    password: string;
    organization: Terorists | "IDF";
    area: IDF | null;
    missiles: [IMissileResource];
    launched: [ILaunched];
}

export interface User extends Document {
    _id: Types.ObjectId;
    username: string;
    password: string;
    organization: Terorists | "IDF";
    location: IDF | null;
    resources: IMissileResource[];
    launchHistory: ILaunched[]; 
}

const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: [true, "you must have a username"],
        maxlength: [30, "length of username can't be more than 30 letters"],
        minlength: [2, "length of username must be more than 2 letters"]
    },
    password: {
        type: String,
        required: [true, "you must have a password"],
        minlength: [4, "length of paasword must be more than 4 charachters"],
    },
    organization: {
        type: String,
        required: [true, "you must be related to some organization"],
    },
    location: {
        type: String || null,
        default: null,
    },
    resources: {
        type: [Object],
        default: []
    },
    launchHistory: {
        type: [{rocket: {type: String}, status: {type: String}}],
        default: [],
    },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;