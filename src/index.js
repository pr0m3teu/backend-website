"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("../config/corsOptions"));
const logger_1 = __importDefault(require("../middleware/logger"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(logger_1.default);
app.get("/", (req, res) => {
    res.send("Hello, World!").status(200);
});
app.listen(PORT, () => { console.log(`Server is listening on port: ${PORT}`); });
