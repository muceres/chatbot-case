export const checkAnswer = function(type, field) {
  switch (type) {
    case "number":
      // TODO :: extrate the condition into a checkNumber() function
      return !isNaN(field) && parseInt(Number(field)) && field >= 0
        ? true
        : false;
      break;
    case "input":
      return typeof field !== "undefined" && field !== "" ? true : false;
      break;
    default:
      // without a specific checking any answers is considered to be 'true'
      return true;
  }
};
