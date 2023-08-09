"use strict";
import { IsNumberArray } from "./index.js";
/**
 * Implements the isArrayOfNumberArrays method.
 *
 * @param {number [][]} value - the current validator instance.
 * @returns {boolean} if the "value" is an array of number arrays returns true, otherwise return false.
 */
export const IsArrayOfNumberArrays = (value) => {
  let i, j, question = true;
  const n = value.length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (value[j] instanceof Array) {
      if (!IsNumberArray(value[j])) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsNumberArray(value[j])) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (!IsNumberArray(value[j])) {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsNumberArray(value[j])) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    question = value[j] instanceof Array ? IsNumberArray(value[j]) : false;
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    question = value[j] instanceof Array ? IsNumberArray(value[j]) : false;
  }
  if (n % 4 >= 3 && question) {
    j = n - 3;
    question = value[j] instanceof Array ? IsNumberArray(value[j]) : false;
  }
  return question;
};
