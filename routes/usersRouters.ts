import { Router } from "express";
import { createNewUser, createUserAddress, deleteUser, deleteUserAddress, getAllUserAddresses, getAllUsers, getUserById, updateUser, updateUserAddress } from "../controllers/userControllers";
import checkAuth from "../middleware/checkAuth";

const userRouter: Router = Router();
// GET
userRouter.get("/", checkAuth, getAllUsers);
userRouter.get("/:id", getUserById);

// Get all addresses from user
userRouter.get("/:id/addresses", getAllUserAddresses);

// POST
userRouter.post("/", createNewUser);
// Create user address
userRouter.post("/:id/addresses", createUserAddress);

// PUT
userRouter.put("/:id", updateUser);
userRouter.put("/:userId/addresses/:addressID", updateUserAddress);

// DELETE
userRouter.delete("/:id", deleteUser);
userRouter.delete("/:userId/addresses/:addressId", deleteUserAddress);


export default userRouter;