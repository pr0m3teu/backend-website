import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import corsOptions from "../config/corsOptions";
import logReq from "../middleware/logger";
import errorHandler from "../middleware/errorHandler";
import dbConnect from "../config/dbConnect";
import productsRouter from "../routes/productsRouter";

// Configuring enviroment variables
dotenv.config();
const PORT = process.env.PORT || 3000;

const db: string | undefined = process.env.DB_URI;
if (!db) {
    console.error("ERROR: Could not find database URI! Exiting application...");
    process.exit(1);
}
// Connecting to database
dbConnect(db);

const app : Express = express();

// Middleware
app.use(cors(corsOptions));
app.use(logReq);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!").status(200);
});

app.use("/products", productsRouter);

app.use(errorHandler);

app.listen(PORT, () => {console.log(`Server is listening on port: ${PORT}`)});

