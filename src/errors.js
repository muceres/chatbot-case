export const errorByType = type => {
  const basicMessage = "Oups ! Il y a une erreur dans la saisie :/ \n";
  let result;
  if (type === "number")
    result = `\x1b[31m ${basicMessage}La valeur attendu est nombre positif`;
  if (type === "input")
    result = `\x1b[31m ${basicMessage}La valeur attendue ne doit pas être vide`;

  return result;
};
