import mongoose from "mongoose";
import Product from "../models/Product";
import { Response, Request, Router} from "express";

const productsRouter: Router = Router();

productsRouter.get("/", async (req: Request, res: Response) => {
   try {
        const products = await Product.find({});
        res.status(200).json(products);
   } 
   catch (err)
   {
        console.error(err);
        res.status(500).json({message: err});
   } 
});

productsRouter.post("/new-product", async (req: Request, res: Response) =>{
     const { name, price, rating, category, sizes, stock, description } = req.body;
     try {
          const result = await Product.insertMany([{ name, price, rating, category, sizes, stock, description}], { rawResult: true});
          console.log(result);
          res.status(200).json({message: "Succesfully added new product"});
     }
     catch (err)
     {
          res.status(500);
     }

});

export default productsRouter;