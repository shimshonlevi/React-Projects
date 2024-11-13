import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User,{IUser} from "../models/userModel"; 

dotenv.config();

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password , isAdmin } :IUser= req.body;


    
    if (!username || !password || !isAdmin) {
        res.status(400);
        throw new Error("Username and password are required");
    }

    
    const userExists = await User.findOne({ username });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
     }

    
    const hashedPassword = await bcrypt.hash(password, 10);

 
    const user = await User.create({
        username,
        password: hashedPassword,
        isAdmin,
        hasVoted: false,
        votedFor: null
    });

 
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
