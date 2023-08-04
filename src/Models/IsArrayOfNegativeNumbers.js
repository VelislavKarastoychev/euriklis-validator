"use strict";
/**
 * Implementation of the isArrayOfNegativeNumbers method.
 *
 * @param {number []} value - the current validator "value" property, which has to be am negative numbers array.
 * @returns {boolean} if the "value" is an array of negative numbers returns true, otherwise returns false.
 **/
export const IsArrayOfNegativeNumbers = (value) => {
  let i, j, question = true;
  const n = value.length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (typeof value[j] !== "number") {
      question = false;
      break;
    } else if (value[j] >= 0) {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] !== "number") {
      question = false;
      break;
    } else if (value[j] >= 0) {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] !== "number") {
      question = false;
      break;
    } else if (value[j] >= 0) {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] !== "number") {
      question = false;
      break;
    } else if (value[j] >= 0) {
      question = false;
      break;
    }
  }
  if (question && (n % 4 >= 3)) {
    j = n - 3;
    if (typeof value[j] !== "number") {
      question = false;
    } else if (value[j] >= 0) {
      question = false;
    }
  }
  if (question && (n % 4 >= 2)) {
    j = n - 2;
    if (typeof value[j] !== "number") {
      question = false;
    } else if (value[j] >= 0) {
      question = false;
    }
  }
  if (question && (n % 4 >= 1)) {
    j = n - 1;
    if (typeof value[j] !== "number") {
      question = false;
    } else if (value[j] >= 0) {
      question = false;
    }
  }
  return question;
};
