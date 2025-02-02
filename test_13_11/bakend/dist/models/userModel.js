"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "you must have a username"],
        maxlength: [30, "length of username can't be more than 30 letters"],
        minlength: [2, "length of username must be more than 2 letters"]
    },
    password: {
        type: String,
        required: [true, "you must have a password"],
        minlength: [4, "length of paasword must be more than 4 charachters"],
    },
    organization: {
        type: String,
        required: [true, "you must be related to some organization"],
    },
    location: {
        type: String || null,
        default: null,
    },
    resources: {
        type: [Object],
        default: []
    },
    launchHistory: {
        type: [{ rocket: { type: String }, status: { type: String } }],
        default: [],
    },
});
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
