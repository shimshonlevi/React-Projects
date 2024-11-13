import { Request, Response, NextFunction } from "express";
import constants from "../constants"; // ודא שהנתיב והסיומת נכונים

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode || 500; // אם אין סטטוס קוד, השתמש ב-500
  const errorTitles: { [key: number]: string } = {
    [constants.FORBIDDEN]: "Forbidden",
    [constants.NOT_FOUND]: "Not Found",
    [constants.SERVER_ERROR]: "Server Error",
    [constants.UNAUTHORIZED]: "Unauthorized",
    [constants.VALIDATION_ERROR]: "Validation Error",
  };

  // קבלת כותרת השגיאה לפי סטטוס הקוד
  const title = errorTitles[statusCode] || "Unknown Error"; // אם לא נמצא ערך מתאים, השתמש בכותרת "Unknown Error"

  res.status(statusCode).json({
    title,
    message: err.message, // הודעת השגיאה
    stackTrace: err.stack, // סטאק טרייס (לרוב כדאי להחזיר רק ב-development)
  });
};

export default errorHandler;
