"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const candidateController_1 = require("../controllers/candidateController");
const authMiddleware_1 = require("../middleWare/authMiddleware");
const router = express_1.default.Router();
router.get("/candidates", authMiddleware_1.protect, candidateController_1.candidates);
router.post("/candidates/vote", authMiddleware_1.protect, candidateController_1.voteForCandidate);
exports.default = router;
