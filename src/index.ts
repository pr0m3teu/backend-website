import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import corsOptions from "../config/corsOptions";
import logReq from "../middleware/logger";
import errorHandler from "../middleware/errorHandler";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app : Express = express();

app.use(cors(corsOptions));
app.use(logReq);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!").status(200);
});


app.use(errorHandler);
app.listen(PORT, () => {console.log(`Server is listening on port: ${PORT}`)});