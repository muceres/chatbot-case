import { isEmpty } from "lodash";

export const searchNestedkey = (obj, name) => {
  if (isEmpty(obj)) return false;
  const searchNamekeyInObject = function searchNamekeyInObject(obj, name) {
    return Object.keys(obj).map((key, index) => {
      if (key === name) return true;
      if (typeof obj[key] === "object") {
        return searchNamekeyInObject(obj[key], name).reduce(
          (acc, elem) => acc || elem
        );
      }

      return false;
    });
  };

  return searchNamekeyInObject(obj, name).reduce((acc, elem) => acc || elem);
};
