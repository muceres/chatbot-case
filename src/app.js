import inquirer from "inquirer";

let globalAnswers = {};

function createEmployeeQuestionsRec(number_of_employees) {
  let employeeQuestions = [];
  let employeeQuestion = {
    type: "input",
    name: `employee_name_${number_of_employees}`,
    message: `Quelle est l'employé ${number_of_employees}?`
  };

  if (number_of_employees > 1) {
    employeeQuestions = createEmployeeQuestionsRec(number_of_employees - 1);
  }
  employeeQuestions.push(employeeQuestion);
  return employeeQuestions;
}

var firstQuestions = [
  {
    type: "input",
    name: "trusker_name",
    message: "Quelle est le nom du trusker ?"
  },
  {
    type: "input",
    name: "company_name",
    message: "Quelle est le nom de la société"
  },
  {
    type: "number",
    name: "number_of_employees",
    message: "Combien d'emplyées à la société ?"
  }
];

var secondQuestion = [
  {
    type: "number",
    name: "number_of_trusks",
    message: "Combien de camions à la société ?"
  }
];

inquirer
  .prompt(firstQuestions)
  .then(answers => {
    globalAnswers = answers;

    const employeeQuestions = createEmployeeQuestionsRec(
      globalAnswers.number_of_employees
    );

    return inquirer.prompt(employeeQuestions);
  })
  .then(answers => {
    globalAnswers.employees = answers;

    return inquirer.prompt(secondQuestion);
  })
  .then(answers => {
    globalAnswers.number_of_trusks = answers.number_of_trusks;
    console.log(globalAnswers);
  });
