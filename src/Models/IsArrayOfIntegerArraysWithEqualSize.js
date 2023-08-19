"use strict";
import { IsIntegerArray } from "./IsIntegerArray.js";
/**
 * Implements the isArrayOfIntegerArraysWithEqualSize.
 * 
 * @param {number [][]} value - the current validator value property.
 * @returns {boolean} if the "value" is an array of integer arrrays with equal size returns true, otherwise returns false.
 **/
export const IsArrayOfIntegerArraysWithEqualSize = (value) => {
  let question = true, i, j;
  const n = value.length;
  const l = value[0] instanceof Array ? value[0].length : -1;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (value[j] instanceof Array) {
      if (!IsIntegerArray(value[j]) || value[j].length !== l) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsIntegerArray(value[j]) || value[j].length !== l) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsIntegerArray(value[j]) || value[j].length !== l) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsIntegerArray(value[j]) || value[j].length !== l) {
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
      ? IsIntegerArray(value[j]) && value[j].length === l
      : false;
  }
  if (n % 4 >= 2) {
    j = n - 2;
    question = value[j] instanceof Array
      ? IsIntegerArray(value[j]) && value[j].length === l
      : false;
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    question = value[j] instanceof Array
      ? IsIntegerArray(value[j]) && value[j].length === l
      : false;
  }
  return question;
};
