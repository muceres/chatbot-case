import inquirer from "inquirer";
import { checkAnswer } from "./checking";
import { errorByType } from "./errors";
const superInquirer = {};

const repeatedPrompt = async function repeatedPrompt(question) {
  let answerQuestion = await inquirer.prompt(question);

  const isAnswerValide = checkAnswer(
    question[0].type,
    answerQuestion[question[0].name]
  );

  if (!isAnswerValide) {
    console.log(errorByType(question[0].type));
    return repeatedPrompt(question);
  }
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
