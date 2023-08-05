"use strict";
/**
 * Implements the isArrayOfIntegersInRange method.
 *
 * @param {number []} value an array of integers.
 * @param {number} a - the lower bound of the value elements.
 * @param {number} b - the upper bound of the value elements.
 * @returns {boolean} if the "value" property is integer array in the open interval (a, b) returns true, otherwise returns false.
 **/
export const IsArrayOfIntegersInRange = (value, a, b) => {
  const n = value.length;
  let i, j, question = true;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (Number.isInteger(value[j])) {
      if (!(value[j] > a && value[j] < b)) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (Number.isInteger(value[j])) {
      if (!(value[j] > a && value[j] < b)) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (Number.isInteger(value[j])) {
      if (!(value[j] > a && value[j] < b)) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (Number.isInteger(value[j])) {
      if (!(value[j] > a && value[j] < b)) {
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
    if (Number.isInteger(value[j])) {
      question = value[j] > a && value[j] < b;
    } else question = false;
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    if (Number.isInteger(value[j])) {
      question = value[j] > a && value[j] < b;
    } else question = false;
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    if (Number.isInteger(value[j])) {
      question = value[j] > a && value[j] < b;
    } else question = false;
  }
  return question;
};
