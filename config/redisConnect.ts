import { createClient } from "redis";

const redisClient = createClient();

export async function redisConnect()
{
    try {
        await redisClient.connect();
        console.log("Redis connection established");
    } catch (err : any) {
        console.error(err);
    }
}

export default redisClient;
