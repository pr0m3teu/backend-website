import mongoose from "mongoose";

async function dbConnect(db_uri : string)
{
    try {
        await mongoose.connect(db_uri);
    }
    catch (err) {
        console.error(err);
        process.exit(1);    
    }
}

export default dbConnect;