import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "../config/corsOptions";
import logReq from "../middleware/logger";
import errorHandler from "../middleware/errorHandler";
import { dbConnect, closeDBConnection} from "../config/dbConnect";
import productsRouter from "../routes/productsRouter";
import userRouter from "../routes/usersRouters";
import { seedDb }from "../config/seedDb";
// Configuring enviroment variables
dotenv.config();
const PORT = process.env.PORT || 3000;



// Closing database when server stops  
process.on('SIGINT', async () => {
    await closeDBConnection();
    process.exit(0);
});

// Middleware
const app : Express = express();
app.use(cors(corsOptions));
app.use(logReq);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!").status(200);
});

app.use("/products", productsRouter);
app.use("/users", userRouter);

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "404 Page not found!" });
});

app.use(errorHandler);

app.listen(PORT, () => {
    // Connecting to database
    const dbLink: string | undefined = process.env.DB_URI;
    if (!dbLink) {
        console.error("ERROR: Could not find database URI! Exiting application...");
        process.exit(1);
    }
    dbConnect(dbLink);

    if (process.env.ENVIRONMENT === "dev" && process.env.SEED_DB === "true") {
        seedDb();
    }
    console.log(`Server is listening on port: ${PORT}`);
});

