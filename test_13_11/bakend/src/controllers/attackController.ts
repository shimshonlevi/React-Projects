import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import  Missile,{Imissile} from "../models/missileModel";
import  missileList  from "../data/missiles.json";
import orgonization from "../models/orgonizationModel";


export const attack = asyncHandler(async (req: Request, res: Response) => {
    await Missile.deleteMany({});

    const missilesArray = await Missile.insertMany(missileList);
