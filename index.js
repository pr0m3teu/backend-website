"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    console.log("Got Request!");
    res.send("Hello, World!").status(200);
});
app.listen(PORT, () => { console.log(`Server is listening on port: ${PORT}`); });
