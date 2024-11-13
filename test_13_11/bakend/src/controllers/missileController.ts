import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import  Missile,{Imissile} from "../models/missileModel";
import  missileList  from "../data/missiles.json";


export const missiles = asyncHandler(async (req: Request, res: Response) => {
    await Missile.deleteMany({});

    const missilesArray = await Missile.insertMany(missileList);

    res.status(200).json({
        missilesArray,
        title:"success",
        message:"DataBase seeded successfully"
    });
    });

export const launchMissile = asyncHandler(async (req: Request, res: Response) => {
    console.log("ia am here")
    const { missileId } = req.body;

    if (!missileId) {
        res.status(400);
        throw new Error("Missile ID is required");
    }

    const missile = await Missile.findById(missileId);    
    if (!missile) {
        res.status(404);
        throw new Error("Missile not found");
    }

    if (missile.intercepts.length > 0) {
        res.status(400);
        throw new Error("Missile has already been intercepted");
    }

    const interceptedMissiles = missile.intercepts;
    interceptedMissiles.push(missileId);
    missile.intercepts = interceptedMissiles;    
    await missile.save();

    res.status(200).json({
        title:"success",
        message:"Missile intercepted successfully"
    });

    }
)





