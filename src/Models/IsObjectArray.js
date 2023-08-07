"use strict";
/**
 * Implements the isObjectArray method.
 *
 * @param {object []} value - an array of object elements (the current validator value).
 * @returns {boolean} if the "value" is an array of object elements returns true, otherwise false.
 */
export const IsObjectArray = (value) => {
  let i, j, question = true;
  const n = value.length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (!(value[j] instanceof Object) || value[j] instanceof Array) {
      question = false;
      break;
    }
    ++j;
    if (!(value[j] instanceof Object) || value[j] instanceof Array) {
      question = false;
      break;
    }
    ++j;
    if (!(value[j] instanceof Object) || value[j] instanceof Array) {
      question = false;
      break;
    }
    ++j;
    if (!(value[j] instanceof Object) || value[j] instanceof Array) {
      question = false;
      break;
    }
  }
  if (n % 4 >= 3 && question) {
    j = n - 3;
    question = value[j] instanceof Object && !(value[j] instanceof Array);
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    question = value[j] instanceof Object && !(value[j] instanceof Array);
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    question = value[j] instanceof Object && !(value[j] instanceof Array);
  }
  return question;
};
