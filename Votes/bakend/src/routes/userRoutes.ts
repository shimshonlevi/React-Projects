import express from "express"
import {registerUser} from '../controllers/userController'
import  errorHandler  from "../middleWare/errorHendler";

const router = express.Router()


router.post("/registerUser", registerUser)

export default router