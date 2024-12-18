import dotenv from "dotenv";
import mongoose from "mongoose";
import { dbConnect, closeDBConnection} from "../config/dbConnect";
import { seedDb } from "../config/seedDb";
import app from "./app";
// Configuring enviroment variables
dotenv.config();
const PORT = process.env.PORT || 3000;

// Closing database when server stops  
process.on('SIGINT', async () => {
    await closeDBConnection();
    process.exit(0);
});

// Connecting to database
mongoose.connection.once('open', () => {
    console.log('MongoDB connection established');
  });
  
mongoose.connection.on('error', (err) => {
console.error('MongoDB connection error:', err);
});
const dbLink: string | undefined = process.env.DB_URI;
if (!dbLink) {
    console.error("ERROR: Could not find database URI! Exiting application...");
    process.exit(1);
}
dbConnect(dbLink);

app.listen(PORT, () => {
    if (process.env.ENVIRONMENT === "dev" && process.env.SEED_DB === "true") {
        seedDb();
    }
    console.log(`Server is listening on port: ${PORT}`);
});

