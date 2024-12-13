import mongoose from "mongoose";

async function dbConnect(db_uri : string)
{
    try {
        await mongoose.connect(db_uri);
    }
    catch (err : any) {
        console.error("Error connecting to database: ",err.message);
        process.exit(1);    
    }
}
async function closeDBConnection() {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    } catch (err : any) {
      console.error('Error closing MongoDB connection:', err.message);
    }
  }

export  { dbConnect , closeDBConnection };