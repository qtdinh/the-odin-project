const ciphertext = "abcdefghijklmnopqrstuvwxyz";

export function capitalize(string) {
  if (typeof string !== "string") throw new Error("Input must be a string");
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function reverseString(string) {
  if (typeof string !== "string") throw new Error("Input must be a string");
  if (string === "") {
    return "";
  } else {
    return reverseString(string.slice(1)) + string.charAt(0);
  }
}

export const calculator = {
  add(firstNum, secondNum) {
    if (typeof firstNum !== "number" || typeof secondNum !== "number")
      throw new Error("Parameters must be numbers");
    return firstNum + secondNum;
  },
  subtract(firstNum, secondNum) {
    if (typeof firstNum !== "number" || typeof secondNum !== "number")
      throw new Error("Parameters must be numbers");
    return firstNum - secondNum;
  },
  divide(firstNum, secondNum) {
    if (typeof firstNum !== "number" || typeof secondNum !== "number")
      throw new Error("Parameters must be numbers");
    return firstNum / secondNum;
  },
  multiply(firstNum, secondNum) {
    if (typeof firstNum !== "number" || typeof secondNum !== "number")
      throw new Error("Parameters must be numbers");
    return firstNum * secondNum;
  },
};

export function caesarCipher(string, shiftFactor) {
  if (typeof string !== "string") throw new Error("Input must be a string.");

  let result = "";

  //iterate through the string
  for (let i = 0; i < string.length; i++) {
    let char = string[i];

    if (char.match(/[A-Z]/)) char = char.toLowerCase();

    //match char to a case-insensitive alphabet
    if (char.match(/[a-z]/i)) {
      let indexOfChar = ciphertext.indexOf(char);
      let shiftedIndex = (indexOfChar + shiftFactor) % ciphertext.length;
      result += ciphertext[shiftedIndex];
    } else {
      result += string[i];
    }
  }
  return result;
}

export function analyzeArray(numbers) {
  if (typeof numbers !== "object") throw new Error("Input must be an array.");

  if (numbers.length === 0) {
    return {
      average: 0,
      min: 0,
      max: 0,
      length: 0,
    };
  }

  let arrayData = {
    average: 0,
    min: numbers[0],
    max: numbers[0],
    length: numbers.length,
  };
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (typeof numbers[i] !== "number")
      throw new Error("Elements inside array must be numbers.");

    if (arrayData.max < numbers[i]) arrayData.max = numbers[i];
    if (arrayData.min > numbers[i]) arrayData.min = numbers[i];
    total += numbers[i];
  }
  arrayData.average = total / numbers.length;
  return arrayData;
}
