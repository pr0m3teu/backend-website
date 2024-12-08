import { format } from "date-fns";
import {v4 as uuid} from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { Request, Response, NextFunction } from "express";


export async function logMessage(message : string, fileName: string)
{  
    const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logEntry = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs")))
        {
            await fs.mkdir(path.join(__dirname, "..", "logs"), () => {
                console.log("Created logs folder.");
            });
        }
        await fsPromises.appendFile(path.join(__dirname, "..", "logs", fileName), logEntry);
    }
    catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

function logReq(req: Request, res: Response, next: NextFunction)
{
    logMessage(`${req.method}\t${req.originalUrl}\t${req.headers.origin}`, "request-logs.txt");
    console.log(`${req.method}\t${req.path}`);
    next();
}

export default logReq;