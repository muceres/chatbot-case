import inquirer from "inquirer";
import chalk from "chalk";
import { startsWith } from "lodash";

import { checkAnswer } from "./checking";
import { errorByType } from "./errors";
import { searchNestedkey } from "./helpers/object";
import redisClient from "./database/redis-async";

const superInquirer = {};

const doesAnswerExists = async name => {
  const obj = JSON.parse(await redisClient.get("storage"));

  return searchNestedkey(obj, name);
};

// Add answer into redis
const addAnswer = async answer => {
  const obj = JSON.parse(await redisClient.get("storage"));

  if (startsWith(Object.keys(answer)[0], "employee_")) {
    await redisClient.storeObject({
      ...obj,
      employees: { ...answer, ...obj.employees }
    });
  } else if (startsWith(Object.keys(answer)[0], "truck_")) {
    await redisClient.storeObject({
      ...obj,
      trucks: { ...answer, ...obj.trucks }
    });
  } else {
    await redisClient.storeObject({ ...obj, ...answer });
  }
};

const repeatedPrompt = async function repeatedPrompt(question) {
  if (await doesAnswerExists(question[0].name)) return {};

  let answerQuestion = await inquirer.prompt(question);
  const isAnswerValide = checkAnswer(
    question[0].type,
    answerQuestion[question[0].name]
  );

  if (!isAnswerValide) {
    console.log(chalk.red.bold(errorByType(question[0].type)));
    return repeatedPrompt(question);
  }

  // answer added here !!!
  await addAnswer(answerQuestion);
  return answerQuestion;
};

superInquirer.prompt = async function superInquirer(questions) {
  let answer = await repeatedPrompt(
    // create a copy of the array with the first elem only
    questions.filter((question, index) => index === 0)
  );

  if (questions.length > 1) {
    answer = {
      ...answer,
      ...(await superInquirer(
        questions.filter((question, index) => index !== 0)
      ))
    };
  }

  return answer;
};

export default superInquirer;
