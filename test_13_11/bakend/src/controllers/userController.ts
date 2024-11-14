import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { terroristRegister, idfRegister, UserLogin} from "../services/userService"

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
            const newSoldier = await idfRegister({username, password, organization, location});
            res.status(201).json({success: true, message: "idf user registered successfully", newSoldier});
        }
    } 
    catch (error) {
      next(error);
    }
}

export const handleLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body;
      const warrior: any = await UserLogin(username, password);
  
      const token = jwt.sign(
        { warriorId: warrior._id, username: warrior.username },
        process.env.JWT_SECRET || "secret",
        { expiresIn: '24h' }
      );
  
      res.json({token: token, warrior: warrior });
    } 
    catch (error: any) {
      next(error);
    }
}
