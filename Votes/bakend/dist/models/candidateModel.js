"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const candidateSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
});
exports.default = mongoose_1.default.model('Candidate', candidateSchema);
