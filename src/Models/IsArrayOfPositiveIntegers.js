"use strict";
/**
 * Implementation of the isArrayOfPositiveIntegers method.
 * 
 * @param {number []} value - an array of positive integers.
 * @returns {boolean} if the "value" is an array of positive integers returns true,
 * otherwise returns false.
 **/
export const IsArrayOfPositiveIntegers = (value) => {
  const n = value.length;
  let i, j, question = true;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
      break;
    } else if (value[j] < 0) {
      question = false;
      break;
    }
    ++j;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
      break;
    } else if (value[j] < 0) {
      question = false;
      break;
    }
    ++j;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
      break;
    } else if (value[j] < 0) {
      question = false;
      break;
    }
    ++j;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
      break;
    } else if (value[j] < 0) {
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
    } else if (value[j] < 0) {
      question = false;
    }
  }
  if (question && (n % 4 >= 2)) {
    j = n - 2;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
    } else if (this.value[j] < 0) {
      question = false;
    }
  }
  if (question && (n % 4 >= 1)) {
    j = n - 1;
    if (
      typeof value[j] !== "number" || !Number.isInteger(value[j])
    ) {
      question = false;
    } else if (value[j] < 0) {
      question = false;
    }
  }
  return question;
};
