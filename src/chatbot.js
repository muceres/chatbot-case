import inquirer from "inquirer";
import {
  firstQuestions,
  secondQuestion,
  lastQuestions,
  createEmployeeQuestions,
  createTruckQuestions
} from "./questions";

let gAnswers = {};

export const chatbot = async function() {
  // Main employees questions
  let answersFirstQuestions = await inquirer.prompt(firstQuestions);
  gAnswers = answersFirstQuestions;

  // Questions by employees
  const employeeQuestions = createEmployeeQuestions(
    gAnswers.number_of_employees
  );
  let answersEmployeeQuestions = await inquirer.prompt(employeeQuestions);
  gAnswers.employees = answersEmployeeQuestions;

  // Main truck question
  let answersSecondQuestions = await inquirer.prompt(secondQuestion);
  gAnswers.number_of_trucks = answersSecondQuestions.number_of_trucks;

  // Questions by trucks
  const truckQuestions = createTruckQuestions(gAnswers.number_of_trucks);
  let answersTruckQuestions = await inquirer.prompt(truckQuestions);
  gAnswers.trucks = answersTruckQuestions;

  console.log(JSON.stringify(gAnswers, null, 2));

  // Last question
  let answersLastQuestions = await inquirer.prompt(lastQuestions);

  if (answersLastQuestions.valide_answers === "oui") {
    console.log("Merci d'avoir utilisé Trusk !");
  } else {
    gAnswers = {};
    chatbot();
  }
};
