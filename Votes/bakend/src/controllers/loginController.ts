import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User ,{IUser} from "../models/userModel"; 
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken";
import  Candidata  from "../models/candidateModel";
import  candidateList  from "../data/candidateList.json";

dotenv.config();

export const login = asyncHandler(async (req: Request, res: Response) => {
    const {username, password}:IUser = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("Username and password are required");
    }
    const userExists = await User.findOne({ username });
    if (!userExists) {
        res.status(401);
        throw new Error("Invalid username or password");
    }
    const isPasswordCorrect = await bycrpt.compare(password, userExists.password);
    if(!isPasswordCorrect){
        res.status(401);
        throw new Error("Invalid username or password");
    }

    const token = jwt.sign(
        {_id: userExists._id, username: userExists.username, isAdmin: userExists.isAdmin},
        process.env.JWT_SECRET as string,
        {expiresIn: "1h"}
    )
    res.status(200).json({
        _id: userExists._id,
        username: userExists.username,
        isAdmin: userExists.isAdmin,
        token: token,
        message: "User logged in successfully"
    });


});
