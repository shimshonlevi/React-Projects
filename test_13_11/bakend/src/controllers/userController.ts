import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/userModel"; 
import Organization from "../models/orgonizationModel"; // ייבוא של המודל של הארגון

dotenv.config();

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password, organization, area }: IUser = req.body;

  
    if (!username || !password || !organization) {
        res.status(400);
        throw new Error("Username, password, and organization are required");
    }
    
    if (organization === "IDF" && !area) {
        res.status(400);
        throw new Error("Area is required for IDF");
    }

 
    const userExists = await User.findOne({ username });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const org = await Organization.findById(organization); 
    if (!org) {
        res.status(400);
        throw new Error("Organization not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword,
        organization: org._id, 
        area
    });

    if (user) {
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
