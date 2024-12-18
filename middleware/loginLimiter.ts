import rateLimit from "express-rate-limit";
import { Request, Response } from "express";
import { logMessage } from "./logger";


const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { message : "Too many attempts from this IP, please try again after a 60s pause" },
    handler: (req : Request, res : Response, next, options) => {
        logMessage(`Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "error-logs");
        res.status(options.statusCode).json(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false
});

export default loginLimiter;