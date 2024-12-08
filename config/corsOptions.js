"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://www.google.com"
];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS."));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Access-Control-Allow-Credentials", "Content-Type"],
};
exports.default = corsOptions;
