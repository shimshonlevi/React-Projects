import mongoose, { Schema, Types, Document, ObjectId } from "mongoose";

export type objectID = ObjectId;

export interface IUser extends Document {
    username: string;
    password: string;
    organization: string; 
    area?: string;
}

export interface AuthenticatedRequest extends Document {
    user?: IUser;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    organization: {  
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Orgonization',
        required: true
    },

    area: {
        type: String,
        required: false
    },
});

export default mongoose.model<IUser>('User', userSchema);
