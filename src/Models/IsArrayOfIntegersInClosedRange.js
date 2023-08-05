"use strict";
/**
 * Implements the is_array_of_integers_in_closed_range() method.
 *
 * @param {number []} value
 * @param {number} a - the lower bound of the array elements.
 * @param {number} b - the upper bound of the array elements.
 * @returns {boolean} if the "value" is integer array in the closed range [a, b], returns true, otherwise returns false.
 */
export const IsArrayOfIntegersInClosedRange = (value, a, b) => {
  let i, j, question = true;
  const n = value.length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (Number.isInteger(value[i])) {
      if (value[j] < a || value[j] > b) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (Number.isInteger(value[i])) {
      if (value[j] < a || value[j] > b) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (Number.isInteger(value[i])) {
      if (value[j] < a || value[j] > b) {
        question = false;
        break;
      }
    } else {
      question = false;
      break;
    }
    ++j;
    if (Number.isInteger(value[i])) {
      if (value[j] < a || value[j] > b) {
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
      question = !(value < a || value > b);
    } else question = false;
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    if (Number.isInteger(value[j])) {
      question = !(value < a || value > b);
    } else question = false;
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    if (Number.isInteger(value[j])) {
      question = !(value < a || value > b);
    } else question = false;
  }
  return question;
};
