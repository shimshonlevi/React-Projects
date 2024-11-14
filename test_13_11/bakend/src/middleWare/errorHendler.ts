import { Request, Response, NextFunction } from "express";
import constants from "../constants"; 

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode || 500; 
  const errorTitles: { [key: number]: string } = {
    [constants.FORBIDDEN]: "Forbidden",
    [constants.NOT_FOUND]: "Not Found",
    [constants.SERVER_ERROR]: "Server Error",
    [constants.UNAUTHORIZED]: "Unauthorized",
    [constants.VALIDATION_ERROR]: "Validation Error",
  };

  
  const title = errorTitles[statusCode] || "Unknown Error"; 

  res.status(statusCode).json({
    title,
    message: err.message, 
    stackTrace: err.stack, 
  });
};

export default errorHandler;
