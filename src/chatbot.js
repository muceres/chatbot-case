import inquirer from "inquirer";
import chalk from "chalk";
import superInquirer from "./superInquirer";
import {
  firstQuestions,
  secondQuestion,
  lastQuestions,
  createEmployeeQuestions,
  createTruckQuestions
} from "./questions";
import redisClient from "./database/redis-async";

export const chatbot = async () => {
  let finalAnswers = await redisClient.storeObject();

  // Main employees questions
  let answersFirstQuestions = await superInquirer.prompt(firstQuestions);
  finalAnswers = await redisClient.storeObject(answersFirstQuestions);

  // Questions by employees
  const employeeQuestions = createEmployeeQuestions(
    finalAnswers.number_of_employees
  );
  let answersEmployeeQuestions = await superInquirer.prompt(employeeQuestions);
  finalAnswers.employees = answersEmployeeQuestions;
  finalAnswers = await redisClient.storeObject(finalAnswers);

  // Main truck question
  let answersSecondQuestions = await superInquirer.prompt(secondQuestion);
  finalAnswers.number_of_trucks = answersSecondQuestions.number_of_trucks;
  finalAnswers = await redisClient.storeObject(finalAnswers);

  // Questions by trucks
  const truckQuestions = createTruckQuestions(finalAnswers.number_of_trucks);
  let answersTruckQuestions = await superInquirer.prompt(truckQuestions);
  finalAnswers.trucks = answersTruckQuestions;
  finalAnswers = await redisClient.storeObject(finalAnswers);

  console.log(chalk.green.bold(JSON.stringify(finalAnswers, null, 2)));

  // Last question
  let answersLastQuestions = await superInquirer.prompt(lastQuestions);

  if (answersLastQuestions.valide_answers === "oui") {
    console.log(chalk.white.bold("Merci d'avoir utilisé Trusk !"));
    redisClient.quit();
  } else {
    finalAnswers = await redisClient.storeObject();
    chatbot();
  }
};
