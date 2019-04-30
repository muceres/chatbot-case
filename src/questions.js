export const firstQuestions = [
  {
    type: "input",
    name: "trusker_name",
    message: "Quelle est le nom du trusker ?"
  },
  {
    type: "input",
    name: "company_name",
    message: "Quelle est le nom de la société ?"
  },
  {
    type: "number",
    name: "number_of_employees",
    message: "Combien d'employées à la société ?"
  }
];

export const secondQuestion = [
  {
    type: "number",
    name: "number_of_trucks",
    message: "Combien de camions à la société ?"
  }
];

export const lastQuestions = [
  {
    type: "list",
    name: "valide_answers",
    message: "Les informations sont elles valides ?",
    choices: ["oui", "non"]
  }
];

export const createEmployeeQuestions = function createEmployeeQuestions(
  number_of_employees
) {
  let employeeQuestions = [];
  const employeeQuestion = {
    type: "input",
    name: `employee_name_${number_of_employees}`,
    message: `Quelle est le nom de l'employé ${number_of_employees} ?`
  };

  if (number_of_employees > 1) {
    employeeQuestions = createEmployeeQuestions(number_of_employees - 1);
  }

  employeeQuestions = [...employeeQuestions, employeeQuestion];

  return employeeQuestions;
};

export const createTruckQuestions = function createTruckQuestions(
  number_of_trucks
) {
  let truckQuestions = [];
  const truckQuestion = [
    {
      type: "number",
      name: `truck_volume_${number_of_trucks}`,
      message: `Quelle est le volume en m³ du camion ${number_of_trucks} ?`
    },
    {
      type: "input",
      name: `truck_type_${number_of_trucks}`,
      message: `Quelle est le type du camion ${number_of_trucks} ?`
    }
  ];

  if (number_of_trucks > 1) {
    truckQuestions = createTruckQuestions(number_of_trucks - 1);
  }

  truckQuestions = [...truckQuestions, ...truckQuestion];

  return truckQuestions;
};
