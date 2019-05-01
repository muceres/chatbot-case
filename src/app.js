import dotenv from "dotenv";
import { chatbot } from "./chatbot";
import redisClient from "./database/redis-async";

// load configuraiton
dotenv.config();
redisClient.on("error").catch(err => console.log("" + err));

chatbot();
