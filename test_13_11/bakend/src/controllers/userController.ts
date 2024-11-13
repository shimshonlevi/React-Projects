import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { terroristRegister, soldierRegister, warriorLogin} from "../services/userService"

dotenv.config();

export const handleRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password, organization } = req.body;
        if(!req.body.area){
            const newTerrorist = await terroristRegister({username, password, organization});
            res.status(201).json({success: true, message: "terrorist registered successfully", newTerrorist});
        }
        else{
            const location = req.body.area;
            const newSoldier = await soldierRegister({username, password, organization, location});
            res.status(201).json({success: true, message: "soldier registered successfully", newSoldier});
        }
    } 
    catch (error) {
      next(error);
    }
}

export const handleLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body;
      const warrior: any = warriorLogin(username, password);
  
      const token = jwt.sign(
        { warriorId: warrior._id, username: warrior.username },
        process.env.JWT_SECRET || "your-super-secret-key",
        { expiresIn: '24h' }
      );
  
      res.json({token: token, warrior: warrior });
    } 
    catch (error: any) {
      next(error);
    }
}

// export const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
//     const { username, password, organization}: IUser = req.body;

  
//     if (!username || !password || !organization) {
//         res.status(400);
//         throw new Error("Username, password, and organization are required");
//     }
    
//     // if (organization === "IDF" && !area) {
//     //     res.status(400);
//     //     throw new Error("Area is required for IDF");
//     // }
//     if(!req.body.area){
//         const terorist = await Organization.findById(organization);
//         if(!terorist){
//             res.status(400);
//             throw new Error("Organization not found");
//         }

        
//     }

 
//     const userExists = await User.findOne({ username });
//     if (userExists) {
//         res.status(400);
//         throw new Error("User already exists");
//     }

//     const org = await Organization.findById(organization); 
//     if (!org) {
//         res.status(400);
//         throw new Error("Organization not found");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//         username,
//         password: hashedPassword,
//         organization: org._id, 
//         area
//     });

//     if (user) {
//         res.status(201).json(user);
//     } else {
//         res.status(400);
//         throw new Error("Invalid user data");
//     }
// });
