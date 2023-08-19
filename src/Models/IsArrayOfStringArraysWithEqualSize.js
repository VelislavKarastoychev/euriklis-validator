"use strict";
import { IsStringArray } from "./IsStringArray.js";
/**
 * Implements the isArrayOfStringArraysWithEqualSize method.
 * @param {string [][]} value - the current validator "value" property.
 * @returns {boolean} if the "value" is string matrix, returns true, otherwise returns false.
 */
export const IsArrayOfStringArraysWithEqualSize = (value) => {
  const n = value.length;
  const l = value[0] instanceof Array ? value[0].length : -1;
  let i, j, question = true;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (value[j] instanceof Array) {
      if (!IsStringArray(value[j]) || value[j].length !== l) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsStringArray(value[j]) || value[j].length !== l) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsStringArray(value[j]) || value[j].length !== l) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsStringArray(value[j]) || value[j].length !== l) {
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
    question = value[j] instanceof Array
      ? IsStringArray(value[j]) && value[j].length === l
      : false;
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    question = value[j] instanceof Array
      ? IsStringArray(value[j]) && value[j].length === l
      : false;
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    question = value[j] instanceof Array
      ? IsStringArray(value[j]) && value[j].length === l
      : false;
  }
  return question;
};
