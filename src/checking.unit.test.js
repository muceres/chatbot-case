import { checkAnswer } from "./checking";

describe("Behavior of the type number", () => {
  test("Should not accept negative a value", () => {
    expect(checkAnswer("number", -2)).toBe(false);
  });

  test("Should accept posifive a value", () => {
    expect(checkAnswer("number", 7)).toBe(true);
  });

  test("Should not accept a NaN value", () => {
    expect(checkAnswer("number", "hello sekai")).toBe(false);
  });

  test("Should not accept a undefined value", () => {
    expect(checkAnswer("number")).toBe(false);
  });
});

describe("Behavior of the type input", () => {
  test("Should not accept a undefined value", () => {
    expect(checkAnswer("input")).toBe(false);
  });

  test("Should accept a string #1", () => {
    expect(checkAnswer("input", "hello sekai")).toBe(true);
  });

  test("Should accept a string #2", () => {
    expect(checkAnswer("input", "154548")).toBe(true);
  });
});
