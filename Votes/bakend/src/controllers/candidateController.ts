import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import  Candidata ,{Icandidate} from "../models/candidateModel";
import  candidateList  from "../data/candidateList.json";

export const candidates = asyncHandler(async (req: Request, res: Response) => {
    await Candidata.deleteMany({});

    const candidatesArray = await Candidata.insertMany(candidateList);

    res.status(200).json({
        candidatesArray,
        title:"success",
        message:"DataBase seeded successfully"
    });
    });

export const voteForCandidate = asyncHandler(async (req: Request, res: Response) => {
    console.log("ia am here")
    const { candidateId } = req.body;

    if (!candidateId) {
        res.status(400);
        throw new Error("Candidate ID is required");
    }

    const candidate = await Candidata.findById(candidateId);

    if (!candidate) {
        res.status(404);
        throw new Error("Candidate not found");
    }

    candidate.votes += 1;
    await candidate.save();

    res.status(200).json({
        candidate,
        title:"success",
        message:"Candidate voted successfully"
    });
    });

    


