"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userScchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    hasVoted: {
        type: Boolean,
        default: false
    },
    votedFor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Candidate',
        default: null
    }
});
exports.default = mongoose_1.default.model('User', userScchema);
