import { Router } from "express";
import { createNewProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productControllers";

const productsRouter: Router = Router();
// GET
productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
// POST
productsRouter.post("/", createNewProduct);
// PUT
productsRouter.put("/:id", updateProduct);
// DELETE
productsRouter.delete("/:id", deleteProduct);

export default productsRouter;