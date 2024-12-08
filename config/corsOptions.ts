import { CorsOptions } from "cors";

const allowedOrigins: string[] = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

const corsOptions: CorsOptions = {
    origin: (origin: any, callback: any) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS."));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Access-Control-Allow-Credentials", "Content-Type"],
};

export default corsOptions;