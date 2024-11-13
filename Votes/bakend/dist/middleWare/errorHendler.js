"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("../constants")); // ודא שהנתיב והסיומת נכונים
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500; // אם אין סטטוס קוד, השתמש ב-500
    const errorTitles = {
        [constants_1.default.FORBIDDEN]: "Forbidden",
        [constants_1.default.NOT_FOUND]: "Not Found",
        [constants_1.default.SERVER_ERROR]: "Server Error",
        [constants_1.default.UNAUTHORIZED]: "Unauthorized",
        [constants_1.default.VALIDATION_ERROR]: "Validation Error",
    };
    // קבלת כותרת השגיאה לפי סטטוס הקוד
    const title = errorTitles[statusCode] || "Unknown Error"; // אם לא נמצא ערך מתאים, השתמש בכותרת "Unknown Error"
    res.status(statusCode).json({
        title,
        message: err.message, // הודעת השגיאה
        stackTrace: err.stack, // סטאק טרייס (לרוב כדאי להחזיר רק ב-development)
    });
};
exports.default = errorHandler;
