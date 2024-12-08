import express, { Express, Request, Response } from "express";

const PORT = process.env.PORT || 3000;

const app : Express = express();

app.get("/", (req: Request, res: Response) => {
    console.log("Got Request!");
    res.send("Hello, World!").status(200);
});

app.listen(PORT, () => {console.log(`Server is listening on port: ${PORT}`)});