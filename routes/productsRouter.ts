import mongoose from "mongoose";
import Product from "../models/Product";
import { Response, Request, Router, NextFunction} from "express";
import { ProductInterface } from "../interfaces";

const productsRouter: Router = Router();
// GET
productsRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
     try {
          const products: ProductInterface[] = await Product.find({});
          res.status(200).json(products);
     } 
     catch (err : any)
     {
          console.error(err);
          res.status(503).json({message: err.message});
          next(err);
     }   
});

productsRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
     try {
          const product = await Product.find({_id: req.params.id });
          if (!product)
          {
               res.status(400).json({ message: "Product id does not exits!" });
          }
          res.status(200).json(product);
     }
     catch (err : any)
     {
          console.error(err);
          res.status(400).json({ message: err.message });
          next(err);
     }
});

// POST
productsRouter.post("/new-product", async (req: Request, res: Response, next: NextFunction) =>{
     const { name, price, rating, category, sizes, stock, description } = req.body;
     try {
          const result = await Product.insertMany([{ name, price, rating, category, sizes, stock, description}], { rawResult: true});
          console.log(result);
          res.status(200).json({message: "Succesfully added new product"});
     }
     catch (err: any)
     {
          console.error(err);
          res.status(503).json({message: err.message});
          next(err);
     }

});

export default productsRouter;