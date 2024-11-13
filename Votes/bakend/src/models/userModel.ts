import mongoose,{Schema,Types,Document ,ObjectId} from "mongoose";

export type objectID = ObjectId;
export interface IUser extends Document{
    username:string,
    password:string,
    isAdmin?:boolean,
    hasVoted?:boolean,
    votedFor?:Types.ObjectId
}

export interface AuthenticatedRequest extends Document{
    user?:IUser
    
}






const userScchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        require:true
    },

    isAdmin:{
        type:Boolean,
        default:false
    },
    hasVoted:{
        type:Boolean,
        default:false
    },
    votedFor: {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
         default: null
    }})

    export default  mongoose.model<IUser>('User',userScchema)


