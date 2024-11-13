import mongoose,{Schema,Types} from "mongoose";

export interface Icandidate extends Document{
    name:string,
    image:string,
    votes:number
}

const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    votes:{
        type:Number,
        default:0
    }});
    
    export default mongoose.model<Icandidate>('Candidate',candidateSchema)