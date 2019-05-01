import dotenv from "dotenv";
import { chatbot } from "./chatbot";
import redisClient from "./database/redis-async";
import chalk from "chalk";
import { searchNestedkey } from "./helpers/object";

// load configuraiton
dotenv.config();
redisClient.on("error").catch(err => console.log("" + err));

// Before quitting the chatbot
process.on("SIGINT", () => {
  console.log(chalk.white.bold("A bientôt !"));
  redisClient.quit(() => process.exit());
});

chatbot();
