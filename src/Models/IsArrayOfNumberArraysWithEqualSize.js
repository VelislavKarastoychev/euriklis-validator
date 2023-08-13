"use strict";

import { IsNumberArray } from "./IsNumberArray.js";

/**
 * Implements IsArrayOfNumberArraysWithEqualSize method.
 *
 * @param {number [][]} value - the current validator instance value.
 * @returns {boolean} If the "value" is a numeric matrix returns true, otherwise returns false.
 */
export const IsArrayOfNumberArraysWithEqualSize = (value) => {
  let i, j, question = true;
  const n = value.length;
  const l = value[0] instanceof Array ? value[0].length : -1;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (value[j] instanceof Array) {
      if (!IsNumberArray(value[j]) || value[j].length !== l) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsNumberArray(value[j]) || value[j].length !== l) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsNumberArray(value[j]) || value[j].length !== l) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (value[j] instanceof Array) {
      if (!IsNumberArray(value[j]) || value[j].length !== l) {
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
      question = IsNumberArray(value[j]) && value[j].length !== l;
    } else question = false;
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    if (value[j] instanceof Array) {
      question = IsNumberArray(value[j]) && value[j].length !== l;
    } else question = false;
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    if (value[j] instanceof Array) {
      question = IsNumberArray(value[j]) && value[j].length !== l;
    } else question = false;
  }
  return question;
};
