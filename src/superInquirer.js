import inquirer from "inquirer";
import { checkAnswer } from "./checking";

const superInquirer = {};

const repeatedPrompt = async function repeatedPrompt(question) {
  let answerQuestion = await inquirer.prompt(question);

  const isAnswerValide = checkAnswer(
    question[0].type,
    answerQuestion[question[0].name]
  );

  if (!isAnswerValide) {
    console.log("\x1b[31m", "Oups ! Il y a une erreur dans la saisie :/");
    return repeatedPrompt(question);
  }
  return answerQuestion;
};

superInquirer.prompt = async function superInquirer(questions) {
  let copiedQuestion = [...questions];
  let answer = await repeatedPrompt([copiedQuestion.shift()]);

  if (questions.length > 1) {
    answer = { ...answer, ...(await superInquirer(copiedQuestion)) };
  }

  return answer;
};

export default superInquirer;
