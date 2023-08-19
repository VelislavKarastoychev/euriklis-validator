"use strict";
import { IsStringArray } from "./IsStringArray.js";
/**
 * Implements isArrayOfStringArrays.
 *
 * @param {string [][]} value - the "value" property of the current validator instance.
 * @returns {boolean} if the "value" is a string matrix, returns true, otherwise returns false.
 */
export const IsArrayOfStringArrays = (value) => {
  const n = value.length;
  let i, j, question = true;
  for (i = 0;i < n >> 2;i++) {
    j = i << 2;
    if (value[j] instanceof Array) {
      if (!IsStringArray(value[j])) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
     ++j;
    if (value[j] instanceof Array) {
      if (!IsStringArray(value[j])) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsStringArray(value[j])) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsStringArray(value[j])) {
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
    question = value[j] instanceof Array ? IsStringArray(value[j]) : false;
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    question = value[j] instanceof Array ? IsStringArray(value[j]) : false;
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    question = value[j] instanceof Array ? IsStringArray(value[j]) : false;
  }
  return question;
};
