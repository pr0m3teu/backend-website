import { NextFunction, Request, Response } from "express";
import { logMessage } from "./logger";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction)
{
    const errMsg = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
    logMessage(errMsg, "error-logs.log");
    console.error(err.stack);
    const status = res.statusCode ? res.statusCode : 500;
    
    res.status(status).json({message : err.message});
    next();
}

export default errorHandler;