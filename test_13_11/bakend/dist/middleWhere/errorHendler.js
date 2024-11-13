"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const constants_1 = __importDefault(require("../constants"));
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const errorTitles = {
        [constants_1.default.FORBIDDEN]: "Forbidden",
        [constants_1.default.NOT_FOUND]: "Not found",
        [constants_1.default.SERVER_ERROR]: "Server error",
        [constants_1.default.UNAUTHORIZED]: "Unauthorized",
        [constants_1.default.VALIDATION_ERROR]: "Validation error",
    };
    res.status(statusCode).json({
        title: process_1.title,
        message: err.message,
        stackTrace: err.stack,
    });
};
exports.default = errorHandler;
