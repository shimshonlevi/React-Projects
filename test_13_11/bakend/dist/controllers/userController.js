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
exports.handleLogin = exports.handleRegister = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userService_1 = require("../services/userService");
dotenv_1.default.config();
const handleRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, organization } = req.body;
        if (!req.body.area) {
            const newTerrorist = yield (0, userService_1.terroristRegister)({ username, password, organization });
            res.status(201).json({ success: true, message: "terrorist registered successfully", newTerrorist });
        }
        else {
            const location = req.body.area;
            const newSoldier = yield (0, userService_1.idfRegister)({ username, password, organization, location });
            res.status(201).json({ success: true, message: "soldier registered successfully", newSoldier });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.handleRegister = handleRegister;
const handleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const warrior = (0, userService_1.UserLogin)(username, password);
        const token = jsonwebtoken_1.default.sign({ warriorId: warrior._id, username: warrior.username }, process.env.JWT_SECRET || "your-super-secret-key", { expiresIn: '24h' });
        res.json({ token: token, warrior: warrior });
    }
    catch (error) {
        next(error);
    }
});
exports.handleLogin = handleLogin;
