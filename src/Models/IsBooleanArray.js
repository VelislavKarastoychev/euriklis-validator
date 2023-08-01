"use strict";
/**
 * Tests if an array is contained from boolean elements.
 * Utility function for the isBooleanArray method.
 * @param {Array.<boolean>} value
 * @param {boolean} question
 */
export const IsBooleanArray = (value, question) => {
  const n = value.length;
  let i, j;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (typeof value[j] !== "boolean") {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] !== "boolean") {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] !== "boolean") {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] !== "boolean") {
      question = false;
      break;
    }
  }
  if (question && (n % 4 >= 3)) {
    j = n - 3;
    if (typeof value[j] !== "boolean") {
      question = false;
    }
  }
  if (question && (n % 4 >= 2)) {
    j = n - 2;
    if (typeof value[j] !== "boolean") {
      question = false;
    }
  }
  if (question && (n % 4 >= 1)) {
    j = n - 1;
    if (typeof value[j] !== "boolean") {
      question = false;
    }
  }
};
