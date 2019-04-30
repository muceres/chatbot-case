export const isNumber = value =>
  !isNaN(value) && parseInt(Number(value)) && value >= 0 ? true : false;

export const checkAnswer = function(type, field) {
  switch (type) {
    case "number":
      // TODO :: extrate the condition into a checkNumber() function
      return isNumber(field);
      break;
    case "input":
      return typeof field !== "undefined" && field !== "" ? true : false;
      break;
    default:
      // without a specific checking any answers is considered to be 'true'
      return true;
  }
};
