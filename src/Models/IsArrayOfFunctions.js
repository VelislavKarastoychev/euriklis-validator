"use strict";
/**
 * Implements the isArrayOfFunctions method.
 * 
 * @param {Function []} value - the current validator instance, which has to be array of functions.
 * @returns {boolean} if the "value" is an array of functions, then returns true otherwise returns false.
 **/
export const IsArrayOfFunctions = (value) => {
  let i, j, question = true;
  const n = value.length;
  for (i = 0;i < n >> 2;i++) {
    j = i << 2;
    if (typeof value[j] !== "function") {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] !== "function") {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] !== "function") {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] !== "function") {
      question = false;
      break;
    }
  }
  if (n % 4 >= 3 && question) {
    j = n - 3;
    question = typeof value[j] === "function";
  }
  if (n % 4 >= 2 && question) {
     j = n - 2;
    question = typeof value[j] === "function";
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    question = typeof value[j] === "function";
  }
  return question;
}
