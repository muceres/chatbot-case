import { chatbot } from "./chatbot";
import redisClient from "./database/redis-async";

redisClient.on("error").catch(err => console.log("" + err));

chatbot();
