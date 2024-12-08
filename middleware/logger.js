"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMessage = logMessage;
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
async function logMessage(message, fileName) {
    const dateTime = (0, date_fns_1.format)(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logEntry = `${dateTime}\t${(0, uuid_1.v4)()}\t${message}\n`;
    try {
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, "..", "logs"))) {
            await fs_1.default.mkdir(path_1.default.join(__dirname, "..", "logs"), () => {
                console.log("Created logs folder.");
            });
        }
        await promises_1.default.appendFile(path_1.default.join(__dirname, "..", "logs", fileName), logEntry);
    }
    catch (error) {
        console.error(`ERROR: ${error}`);
    }
}
function logReq(req, res, next) {
    logMessage(`${req.method}\t${req.originalUrl}\t${req.headers.origin}`, "request-logs.txt");
    console.log(`${req.method}\t${req.path}`);
    next();
}
exports.default = logReq;
