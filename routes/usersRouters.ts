import User from "../models/User";
import { UserInterface } from "../interfaces";
import { Router, Response, Request, NextFunction } from "express";
import { hashSync } from "bcryptjs";

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
        const user : UserInterface | null = await User.findById(req.params.id).lean().exec();
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
    if (!newUser || !newUser.username || !newUser.password || !newUser.firstName || !newUser.lastName) {
        res.status(400).json({message : "All fields are required" });
        return;
    }

    const user : UserInterface | null = await User.findOne({ username: newUser.username }).lean().exec();
    if (user) {
        res.status(400).json({ message: "Username already in use"});
        return;
    }

    if (newUser.password.length < 8 || newUser.password.length > 25) {
        res.status(400).json({ message: "Password must be between 8 and 25 characters long"});
        return;
    }

    if (newUser.username.length < 5 || newUser.password.length > 25) {
        res.status(400).json({ message: "Username must be between 5 and 25 charachters long"});
        return;
    }

    newUser.password = hashSync(newUser.password, 10);
    try {
        const result = await User.insertMany([newUser]);
        if (!result) {
            res.status(500).json({message: "Could not create new user"});
            return;
        }
        res.status(201).json({ message: "New user created"});
    
    } catch (err : any)
    {
        res.status(500).json({ message : err.message});
        next(err);
    }
    
});


export default userRouter;