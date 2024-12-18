import express, { Express, Request, Response } from "express";
import cors from "cors";
import corsOptions from "../config/corsOptions";
import logReq from "../middleware/logger";
import errorHandler from "../middleware/errorHandler";
import productsRouter from "../routes/productsRouter";
import userRouter from "../routes/usersRouters";
import cookieParser from "cookie-parser";
import authRouter from "../routes/authRouter";

const app : Express = express();

// Middleware
app.use(cors(corsOptions));
app.use(logReq);
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!").status(200);
});

app.use("/products", productsRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "404 Page not found!" });
});

app.use(errorHandler);

export default app;