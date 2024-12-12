import User from "../models/User";
import { UserInterface } from "../interfaces";
import express, { Router, Response, Request, NextFunction } from "express";

const userRouter: Router = Router();

userRouter.get("/", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const users : UserInterface[] | null = await User.find({});
        if (!users)
        {
            res.status(500).json({ message: "Could not find any users!"});
            return;
        }

        res.status(200).json(users);
    }
    catch (err: any) {
        res.status(503).json({ message: err.message });
    }
});

export default userRouter;