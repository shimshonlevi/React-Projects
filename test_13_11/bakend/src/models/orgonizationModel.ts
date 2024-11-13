import mongoose,{Schema,Types,Document ,ObjectId} from "mongoose";

export type objectID = ObjectId;

export interface IOrgonization extends Document {
    name:string,
    resources:[{
        name:string,
        amount:number
    }],
    budget:number
}

export interface AuthenticatedRequest extends Document{
    IOrgonization?:IOrgonization
}

const orgonizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    resources: {
        type: [{
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }],
        required: true
    },
    budget: {
        type: Number,
        required: true
    }
})

export default mongoose.model<IOrgonization>('Orgonization',orgonizationSchema)
