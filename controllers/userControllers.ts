import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { UserInterface } from "../interfaces";
import Address from "../models/Address";
import { AddressInterface } from "../interfaces";

import bcryptjs from "bcryptjs";

// STOP sending all the information about a user i.e password
export async function getAllUsers(req: Request, res: Response, next: NextFunction)
{
    const loggedUser = req.user;
    if (!loggedUser)  {
        res.sendStatus(401);
        return;
    }
    else if (!loggedUser?.UserInfo?.admin) {
        res.sendStatus(403);
        return;
    }
    
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
}

export async function getUserById(req: Request, res: Response, next: NextFunction)
{
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
}

export async function getAllUserAddresses(req: Request, res: Response, next: NextFunction)
{
    const id = req.params.id;
    try {
        const addresses = await Address.find({user: id}).lean();
        res.status(200).json(addresses);
    } catch (err : any) {
        res.status(500).json({message : err.message});
    }
}

export async function createNewUser(req: Request, res: Response, next: NextFunction)
{
    const newUser : UserInterface = req?.body;
    const {password, firstName, lastName, email} = newUser;

    if (!newUser || !password || !firstName || !lastName || !email) {
        res.status(400).json({ message : "All fields are required" });
        return;
    }

    const user = await User.findOne({ email }).lean().exec();
    if (user) {
        res.status(400).json({ message: "Email already in use"});
        return;
    }

    if (password.length < 8 || password.length > 25) {
        res.status(400).json({ message: "Password must be between 8 and 25 characters long"});
        return;
    }

    if (email.length < 3) {
        res.status(400).json({ message: "Email must be between at least 3 long"});
        return;
    }

    newUser.password = await bcryptjs.hash(password, 10);
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
}

export async function createUserAddress(req: Request, res: Response, next: NextFunction)
{
    const id = req.params.id;
    const newAddress : AddressInterface = {...req?.body, user: id};
    const { city, street, houseNumber, country, postalCode, phoneNumber } =  newAddress;

    if (!city || !street || !houseNumber || !country || !postalCode || !phoneNumber)
    {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    try {
        const savedAddress = await Address.create(newAddress);
        if (!savedAddress)
        {
            res.status(500).json({ message: "Could not create new address" });
            return;
        }
        res.status(201).json({ message: "New address created", address: savedAddress});
    } catch (err : any)
    {
        res.status(500).json(err.message);
        next(err);
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction)
{
    const id = req.params.id;
    const updateFields: UserInterface = req?.body;  
    try {
        const user = await User.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true});
        if (!user) {
            res.status(404).json({ message: `User ${id} does not exist`});
            return;
        }

        res.status(200).json({user});
    } catch (err : any) {
        res.status(500).json({ message: err.message });
        next(err);
    }
}

export async function updateUserAddress(req: Request, res: Response, next: NextFunction)
{
    const userId = req.params.userId;
    const addressID = req.params.addressID;
    const updateFields: UserInterface = req?.body;  
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: `User ${userId} does not exist`});
            return;
        }
        const address = await Address.findOneAndUpdate({_id: addressID , user : user.id}, updateFields, { new: true, runValidators: true});

        res.status(200).json({address});
    } catch (err : any) {
        res.status(500).json({ message: err.message });
        next(err);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction)
{
    const id = req.params.id;
    try {
        const { deletedCount } = await User.deleteOne({_id: id }).lean();
        if (deletedCount == 0)
        {
            res.status(404).json({ message: `User ${id} does not exits`});
            return;
        }

        res.status(200).json({ message : "Succesfully deleted user" });
        
    } catch (err : any) {
        res.status(500).json({ message : err.message });
    }
}

export async function deleteUserAddress(req: Request, res: Response, next: NextFunction)
{
    const userId = req.params.userId;
    const addressId = req.params.addressId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: `User ${userId} does not exist`});
            return;
        }
        const { deletedCount } = await Address.deleteOne({_id: addressId , user : user.id}).lean();
        if (deletedCount  == 0)
        {
            res.status(404).json({ message: `Address ${addressId} does not exits`});
            return;
        }
        res.status(200).json({ message: "Address deleted" });

    } catch (err : any) {
        res.status(500).json({ message : err.message});
    }
}


