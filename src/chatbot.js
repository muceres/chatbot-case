import inquirer from "inquirer";
import chalk from "chalk";
import { isEmpty } from "lodash";
import superInquirer from "./superInquirer";
import {
  firstQuestions,
  secondQuestion,
  lastQuestions,
  createEmployeeQuestions,
  createTruckQuestions
} from "./questions";
import redisClient from "./database/redis-async";

// End the questions be quitting the or by starting another round
const conclude = async isOK => {
  if (isOK === "oui") {
    console.log(chalk.white.bold("Merci d'avoir utilisé Trusk !"));
    redisClient.del("storage").then(() => redisClient.quit());
  } else {
    await redisClient.storeObject();
    chatbot();
  }
};

export const chatbot = async () => {
  let answers = (await redisClient.exists("storage"))
    ? JSON.parse(await redisClient.get("storage"))
    : await redisClient.storeObject();

  // Main employees questions
  await superInquirer.prompt(firstQuestions);

  // Questions by employees
  answers = JSON.parse(await redisClient.get("storage"));
  const employeeQuestions = createEmployeeQuestions(answers.nb_of_employees);
  await superInquirer.prompt(employeeQuestions);

  // Main truck question
  await superInquirer.prompt(secondQuestion);

  // Questions by trucks
  answers = JSON.parse(await redisClient.get("storage"));
  const truckQuestions = createTruckQuestions(answers.nb_of_trucks);
  await superInquirer.prompt(truckQuestions);

  // Last question
  answers = JSON.parse(await redisClient.get("storage"));
  console.log(chalk.green.bold(JSON.stringify(answers, null, 2)));
  let answersLastQuestions = await superInquirer.prompt(lastQuestions);

  conclude(answersLastQuestions.valide_answers);
};
