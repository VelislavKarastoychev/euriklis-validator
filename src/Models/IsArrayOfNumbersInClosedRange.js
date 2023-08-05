"use strict";
/**
 * Implements the isArrayOfNumbersInClosedRange.
 *
 * @param {number []} value - an array of nubers, probably in the closed range [a, b].
 * @param {number} a - the lower bound of the elements of the "value" array.
 * @param {number} b - the upper bound of the elements of the "value" array.
 * @returns {boolean} if the elements of the "value" array are in the closed range [a, b] returns true, otherwise returns false.
 */
export const IsArrayOfNumbersInClosedRange = (value, a, b) => {
  const n = value.length;
  let i, j, question = true;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      if (value[j] < a || value[j] > b) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      if (value[j] < a || value[j] > b) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      if (value[j] < a || value[j] > b) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      if (value[j] < a || value[j] > b) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
  }
  if (n % 4 >= 3 && question) {
    j = n - 3;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      question = !(question < a || question > b);
    } else question = false;
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      question = !(question < a || question > b);
    } else question = false;
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      question = !(question < a || question > b);
    } else question = false;
  }
  return question;
};
