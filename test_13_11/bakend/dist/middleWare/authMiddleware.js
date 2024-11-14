"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authWithBearer = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authWithBearer = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log("!authHeader");
            res.status(401).json({ message: 'No token provided' });
            return;
        }
        const token = authHeader.split(' ')[1];
        let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "your-super-secret-key");
        req.warrior = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
};
exports.authWithBearer = authWithBearer;
