"use strict";
import { IsIntegerArray } from "./IsIntegerArray.js";
/**
 * Implements the isArrayOfIntegerArrays method.
 *
 * @param {number [][]} value - the current validator instance value property.
 * @returns {boolean} if the "value" is an arrray of integer arrays returns true, otherwise returns false.
 */
export const IsArrayOfIntegerArrays = (value) => {
  let i, j, question = true;
  const n = value.length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (value[j] instanceof Array) {
      if (!IsIntegerArray(value[j])) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsIntegerArray(value[j])) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsIntegerArray(value[j])) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsIntegerArray(value[j])) {
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
    if (value[j] instanceof Array) {
      question = IsIntegerArray(value[j]);
    } else question = false;
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    if (value[j] instanceof Array) {
      question = IsIntegerArray(value[j]);
    } else question = false;
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    if (value[j] instanceof Array) {
      question = IsIntegerArray(value[j]);
    } else question = false;
  }
  return question;
};
