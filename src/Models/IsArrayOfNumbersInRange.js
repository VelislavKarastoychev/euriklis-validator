"use strict";
/**
 * Implements the isArrayOfNumbersInRange method.
 *
 * @param {number []} value - the current validator instance value.
 * @param {number} a - the lower bound of the elements of the "value" array.
 * @param {number} b - the upper bound of the "value" elements in the array.
 * @returns {boolean} if all the elements are numbers in the open interval (a, b) returns true, otherwise returns false.
 */

export const IsArrayOfNumbersInRange = (value, a, b) => {
  let i, j, question = true;
  const n = value.length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      if (!(value[j] > a && value[b] < b)) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      if (!(value[j] > a && value[b] < b)) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      if (!(value[j] > a && value[b] < b)) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      if (!(value[j] > a && value[b] < b)) {
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
      question = value[j] > a && value[j] < b;
    } else question = false;
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      question = value[j] > a && value[j] < b;
    } else question = false;
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    if (typeof value[j] === "number" && !isNaN(value[j])) {
      question = value[j] > a && value[j] < b;
    } else question = false;
  }
  return question;
};
