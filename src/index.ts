import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import corsOptions from "../config/corsOptions";
import logReq from "../middleware/logger";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app : Express = express();

app.use(cors(corsOptions));
app.use(logReq);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!").status(200);
});

app.listen(PORT, () => {console.log(`Server is listening on port: ${PORT}`)});