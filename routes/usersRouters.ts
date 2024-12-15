import User from "../models/User";
import { UserInterface } from "../interfaces";
import { Router, Response, Request, NextFunction } from "express";
import { hashSync } from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const userRouter: Router = Router();
// GET
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
        next(err);
    }
});

userRouter.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (err : any) {
        res.status(500).json({ message : err.message });
        next();
    }
});


// POST
userRouter.post("/", async(req: Request, res: Response, next: NextFunction) => {
    const newUser : UserInterface = req?.body;
    const {username, password, firstName, lastName, email} = newUser;

    if (!newUser || !username || !password || !firstName || !lastName || !email) {
        res.status(400).json({message : "All fields are required" });
        return;
    }

    const user = await User.findOne({ username }).lean().exec();
    if (user) {
        res.status(400).json({ message: "Username already in use"});
        return;
    }

    if (password.length < 8 || password.length > 25) {
        res.status(400).json({ message: "Password must be between 8 and 25 characters long"});
        return;
    }

    if (username.length < 5 || password.length > 25) {
        res.status(400).json({ message: "Username must be between 5 and 25 charachters long"});
        return;
    }

    newUser.password = hashSync(password, 10);
    try {
        const savedUser = await User.create(newUser);
        if (!savedUser) {
            res.status(500).json({message: "Could not create new user"});
            return;
        }
        res.status(201).json({ message: "New user created", user: savedUser});
    
    } catch (err : any)
    {
        res.status(500).json({ message : err.message});
        next(err);
    }
    
});


export default userRouter;