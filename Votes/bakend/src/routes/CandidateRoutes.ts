import express from "express"
import errorHandler from "../middleWare/errorHendler"
import {candidates,voteForCandidate} from "../controllers/candidateController"
import {protect} from "../middleWare/authMiddleware"


const router = express.Router()


router.get("/candidates",protect,candidates)

router.post("/candidates/vote",protect,voteForCandidate)

export default router