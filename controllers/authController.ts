import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserInterface } from "../interfaces";

dotenv.config();

function generateToken(user : { email: string, admin : boolean }, expiresIn: string)
{
    // Chech if .env contains the token secrets
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("There is no access token for loging in users!");
    } 
    else if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("There is not refresh token for loging in users!");
    }
    
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": user.email,
                "admin": user.admin
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn }
    );

    return accessToken;
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req?.body;
    
    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    try {
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
        const accessToken = generateToken(user, "1h");
        const refreshToken = generateToken(user, "1d");

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
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.sendStatus(401);
        return;
    }

    try { 
        if (!process.env.REFRESH_TOKEN_SECRET) {
            throw new Error("There is not refresh token for loging in users!");
        }

        const refreshToken = cookies.jwt;
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err : any, user : any) => {
            if (err) {
                res.status(403).json({ message : "Refresh token expired, log in again" });
                next(err);
            }

            const foundUser = await User.findOne({ email: user?.UserInfo?.email }).exec();
            if (!foundUser) 
            {
                res.sendStatus(401);
                return;
            }
            
            const newAccessToken = generateToken({ email: foundUser?.email!, admin: foundUser?.admin!}, "1h");
            res.json({ accessToken: newAccessToken });
        });
    
    } catch (err: any) {
        res.status(500).json({ message: err.message });
        next(err);
    }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        res.sendStatus(204);
        return;
    }

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: "none" });
    res.json({ message: "Cookie cleared" });
}

