import { createClient } from "redis";
import { promisify } from "util";

const client = createClient();

let redisClient = {};

redisClient.on = promisify(client.on).bind(client);
redisClient.get = promisify(client.get).bind(client);
redisClient.set = promisify(client.set).bind(client);
redisClient.quit = promisify(client.quit).bind(client);

redisClient.storeObject = async (object = {}, key = "storage") => {
  const str = await redisClient
    .set(key, JSON.stringify(object))
    .then(() => redisClient.get(key));

  const result = JSON.parse(str);

  return result;
};

export default redisClient;
