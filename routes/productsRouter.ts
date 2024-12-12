import Product from "../models/Product";
import { Response, Request, Router, NextFunction} from "express";
import { ProductInterface } from "../interfaces";

const productsRouter: Router = Router();
// GET
productsRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
     try {
          const products: ProductInterface[] = await Product.find({}).lean();
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
          const id = req.params.id;
          const product = await Product.findOne({_id: id }).lean();
          if (!product)
          {
               res.status(400).json({ message: `Product ${id} does not exits!` });
               return;
          }

          res.status(200).json(product);
     }
     catch (err : any)
     {
          console.error(err);
          res.statusCode = 503;
          next(err);
     }
});

// POST
productsRouter.post("/", async (req: Request, res: Response, next: NextFunction) =>{
     const { name, price, rating, category, sizes, stock, description } : ProductInterface = req?.body;
     try {
          if (!name || !price || !sizes || !description || !stock || !category) {
               res.status(400).json({ message : "New product must have all fields defined!" });
               return;
          }
          
          const result = await Product.insertMany([{ name, price, rating, category, sizes, stock, description}], { rawResult: true});
          console.log(result);
          res.status(201).json({message: "Succesfully added new product"});
     }
     catch (err: any)
     {
          console.error(err);
          res.status(503).json({message: err.message});
          next(err);
     }

});

// PUT

productsRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
     const id = req?.params.id;
     const updateFields: ProductInterface = req?.body;
     try {
          const product = await Product.findByIdAndUpdate(id, updateFields).lean();
          if (!product)
          {
               res.status(400).json({ message: `Product ${id} does not exits!` });
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
});


// DELETE
productsRouter.delete("/:id", async(req: Request, res: Response, next: NextFunction) => {
     const id = req.params.id;
     try {
          const { deletedCount } = await Product.deleteOne({_id: id }).lean();
          
          if (deletedCount == 0)
          {
               res.status(400).json({ message: `Product ${id} does not exits!` });
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
});

export default productsRouter;