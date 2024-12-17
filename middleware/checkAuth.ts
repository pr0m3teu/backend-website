import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

async function checkAuth(req: Request, res: Response, next: NextFunction)
{
    const authHeader  = req.headers["authorization"];
    if (!authHeader || !authHeader.length) {
        res.status(403).json({ message: "Missing 'Authorization' header" });
        return;
    }

    const token = authHeader && authHeader.split(" ")[1]; // Get token 
    if (!token) { 
        res.status(401).json({ message: "Missing 'Authorization' header" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
        if (err) {
            res.status(403).json( { message : "Authorization failed" });
            next(err);
        }

        req.user = user;
    });
    next();
}

export default checkAuth;