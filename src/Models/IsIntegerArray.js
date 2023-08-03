"use strict";
/**
 * Returns true if the "value" parameter is an array of integers and false otherwise.
 * 
 * @param {number []} value
 * @returns {boolean}
 **/
export const IsIntegerArray = (value) => {
  const n = value.length;
  let i, j, question = true;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
      break;
    }
    ++j;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
      break;
    }
    ++j;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
      break;
    }
    ++j;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
      break;
    }
  }
  if (question && (n % 4 >= 3)) {
    j = n - 3;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
    }
  }
  if (question && (n % 4 >= 2)) {
    j = n - 2;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
    }
  }
  if (question && (n % 4 >= 1)) {
    j = n - 1;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
    }
  }
  return question;
};
