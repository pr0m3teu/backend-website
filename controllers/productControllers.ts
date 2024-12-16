import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import { ProductInterface } from "../interfaces";

export async function getAllProducts(req: Request, res: Response, next: NextFunction)
{
    try {
        const products = await Product.find({}).lean();
        res.status(200).json(products);
    }  catch (err : any)
    {
        console.error(err);
        res.status(503).json({ message: err.message });
        next(err);
    }   
}

export async function getProductById(req: Request, res: Response, next: NextFunction)
{
    try {
        const id = req.params.id;
        const product = await Product.findOne({_id: id }).lean();
        if (!product)
        {
             res.status(404).json({ message: `Product ${id} does not exits!` });
             return;
        }

        res.status(200).json(product);
    } catch (err : any)
    {
        console.error(err);
        res.statusCode = 503;
        next(err);
    }
}

export async function createNewProduct(req: Request, res: Response, next: NextFunction)
{
    const product: ProductInterface = req?.body;
     const { name, price, rating, category, sizes, stock, description } = product;
     try {
          if (!name || !price || !sizes || !description || !stock || !category || !product) {
               res.status(400).json({ message : "New product must have all fields defined!" });
               return;
          }
          
          const savedProduct = await Product.create(product);
          console.log(savedProduct);
          res.status(201).json({message: "Succesfully added new product", product: savedProduct});
     }
     catch (err: any)
     {
          console.error(err);
          res.status(503).json({message: err.message});
          next(err);
     }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction)
{
    const id = req?.params.id;
     const updateFields: ProductInterface = req?.body;
     try {
          const product = await Product.findByIdAndUpdate(id, updateFields).lean();
          if (!product)
          {
               res.status(404).json({ message: `Product ${id} does not exits!` });
               return;
          }
          console.log(product);
          res.status(200).json(product);
     }
     catch (err : any)
     {
          console.error(err);
          res.status(503).json({message: err.message});
          next(err);
     }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction)
{
    const id = req.params.id;
     try {
          const { deletedCount } = await Product.deleteOne({_id: id }).lean();
          
          if (deletedCount == 0)
          {
               res.status(404).json({ message: `Product ${id} does not exits!` });
               return;
          }
          res.status(200).json({ message : `Product ${id} deleted!`});
     }
     catch (err: any)
     {
          console.error(err);
          res.status(503).json({ message: err.message });
          next(err);
     }
}


