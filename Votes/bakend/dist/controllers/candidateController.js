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
exports.voteForCandidate = exports.candidates = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const candidateModel_1 = __importDefault(require("../models/candidateModel"));
const candidateList_json_1 = __importDefault(require("../data/candidateList.json"));
exports.candidates = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidateModel_1.default.deleteMany({});
    const candidatesArray = yield candidateModel_1.default.insertMany(candidateList_json_1.default);
    res.status(200).json({
        candidatesArray,
        title: "success",
        message: "DataBase seeded successfully"
    });
}));
exports.voteForCandidate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ia am here");
    const { candidateId } = req.body;
    if (!candidateId) {
        res.status(400);
        throw new Error("Candidate ID is required");
    }
    const candidate = yield candidateModel_1.default.findById(candidateId);
    if (!candidate) {
        res.status(404);
        throw new Error("Candidate not found");
    }
    candidate.votes += 1;
    yield candidate.save();
    res.status(200).json({
        candidate,
        title: "success",
        message: "Candidate voted successfully"
    });
}));
