"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("Username and password are required");
    }
    const userExists = yield userModel_1.default.findOne({ username });
    if (!userExists) {
        res.status(401);
        throw new Error("Invalid username or password");
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, userExists.password);
    if (!isPasswordCorrect) {
        res.status(401);
        throw new Error("Invalid username or password");
    }
    const token = jsonwebtoken_1.default.sign({ _id: userExists._id, username: userExists.username, isAdmin: userExists.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({
        _id: userExists._id,
        username: userExists.username,
        isAdmin: userExists.isAdmin,
        token: token,
        message: "User logged in successfully"
    });
}));
