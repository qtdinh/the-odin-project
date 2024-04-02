import {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} from "./testing.js";

// A capitalize function that takes a string and returns it with the first character capitalized.

test("capitalize the string", () => {
  expect(capitalize("hello")).toBe("Hello");
});

test("empty string", () => {
  expect(capitalize("")).toBe("");
});

test("non-string input", () => {
  expect(() => capitalize(123)).toThrow("Input must be a string");
});

// A reverseString function that takes a string and returns it reversed.

test("reverse the string", () => {
  expect(reverseString("hello")).toBe("olleh");
});

test("reverse empty string", () => {
  expect(reverseString("")).toBe("");
});

test("reverse not string", () => {
  expect(() => reverseString(123)).toThrow("Input must be a string");
});

// A calculator object that contains functions for the basic operations:
// add, subtract, divide, and multiply.
// Each of these functions should take two numbers and
// return the correct calculation.

test("calculator addition", () => {
  expect(calculator.add(2, 2)).toEqual(4);
});

test("calculator subtraction", () => {
  expect(calculator.subtract(6, 3)).toEqual(3);
});

test("calculator subtraction negative", () => {
  expect(calculator.subtract(3, 6)).toEqual(-3);
});

test("calculator division", () => {
  expect(calculator.divide(6, 3)).toEqual(2);
});

test("calculator division negative", () => {
  expect(calculator.divide(6, -3)).toEqual(-2);
});

test("calculator division double negative", () => {
  expect(calculator.divide(-6, -3)).toEqual(2);
});

test("calculator division with larger number", () => {
  expect(calculator.divide(3, 6)).toBeCloseTo(0.5);
});

test("calculator multiplication", () => {
  expect(calculator.multiply(3, 6)).toEqual(18);
});

test("calculator multiplication negative", () => {
  expect(calculator.multiply(3, -6)).toEqual(-18);
});

test("calculator multiplication double negative", () => {
  expect(calculator.multiply(-3, -6)).toEqual(18);
});

test("calculator check parameters", () => {
  expect(() => calculator.add("bad", 6)).toThrow("Parameters must be numbers");
  expect(() => calculator.subtract("bad", 6)).toThrow(
    "Parameters must be numbers"
  );
  expect(() => calculator.divide("bad", 6)).toThrow(
    "Parameters must be numbers"
  );
  expect(() => calculator.multiply("bad", 6)).toThrow(
    "Parameters must be numbers"
  );
});

// A caesarCipher function
// that takes a string and a shift factor and returns it with each character “shifted”.

test("caesar cipher key 7 encrypt", () => {
  expect(caesarCipher("Beware the Ides of March.", 7)).toBe(
    "ildhyl aol pklz vm thyjo."
  );
});

test("caesar cipher test wrapping z to a", () => {
  expect(caesarCipher("z", 1)).toBe("a");
});

// test("caesar cipher preserve same case", () => {
//   expect(caesarCipher("Beware the Ides of March.", 7)).toBe(
//     "Ildhyl aol Pklz vm Thyjo."
//   );
//   expect(caesarCipher("BEWARE THE IDES OF MARCH.", 7)).toBe(
//     "ILDHYL AOL PKLZ VM THYJO."
//   );
//   expect(caesarCipher("beware the ides of march.", 7)).toBe(
//     "ildhyl aol pklz vm thyjo."
//   );
// });

test("caesar cipher punctuation", () => {
  expect(caesarCipher(".,,,.,.,", 1)).toBe(".,,,.,.,");
});

//An analyzeArray function that takes an array of numbers and
//returns an object with the following properties: average, min, max, and length.

test("analyzearray test object", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});

test("analyzearray test properties", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toHaveProperty(`average`);
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toHaveProperty(`min`);
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toHaveProperty(`max`);
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toHaveProperty(`length`);
});

test("analyzearray test empty array", () => {
  expect(analyzeArray([])).toEqual({ average: 0, min: 0, max: 0, length: 0 });
});

test("analyzearray test wrong input", () => {
  expect(() => analyzeArray(["bad", 1, 2, 3])).toThrow(
    "Elements inside array must be numbers."
  );
  expect(() => analyzeArray(123)).toThrow("Input must be an array.");
  expect(() => analyzeArray("boba")).toThrow("Input must be an array.");
});
