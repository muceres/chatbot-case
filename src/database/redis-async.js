import { createClient } from "redis";
import { promisify } from "util";
import dotenv from "dotenv";

const client = createClient(
  process.env.REDIS_PORT || 6379,
  process.env.REDIS_HOST || "127.0.0.1"
);

let redisClient = {};

redisClient.on = promisify(client.on).bind(client);
redisClient.get = promisify(client.get).bind(client);
redisClient.set = promisify(client.set).bind(client);
redisClient.quit = promisify(client.quit).bind(client);
redisClient.exists = promisify(client.exists).bind(client);
redisClient.del = promisify(client.del).bind(client);

redisClient.storeObject = async (object = {}, key = "storage") => {
  const str = await redisClient
    .set(key, JSON.stringify(object))
    .then(() => redisClient.get(key));

  const result = JSON.parse(str);

  return result;
};

export default redisClient;
