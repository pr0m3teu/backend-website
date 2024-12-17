import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req?.body;
    
    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    try {
        // Chech if .env contains the token secrets
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error("There is no access token for loging in users!");
        } 
        else if (!process.env.REFRESH_TOKEN_SECRET) {
            throw new Error("There is not refresh token for loging in users!");
        }

        const user = await User.findOne({ email }).lean().exec();
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const match = await bcryptjs.compare(password, user.password);

        if (!match) {
            res.status(401).json({ message : "Unauthorized" });
            return;
        }

        // User JWT tokens
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": user.email,
                    "admin": user.admin
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h"}
        );

        const refreshToken = jwt.sign(
            {
                "UserInfo": {
                    "email": user.email,
                    "admin": user.admin
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "10d" }
        )

        // Create secure cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ accessToken });
        
    } catch (err: any) {
        console.error(err.message);
        next(err);
    }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
    res.status(404);
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    res.status(404);
}

