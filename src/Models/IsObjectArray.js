"use strict";
import { IsObject } from "./IsObject.js";
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
    if (!IsObject(value[j])) {
      question = false;
      break;
    }
    ++j;
    if (!IsObject(value[j])) {
      question = false;
      break;
    }
    ++j;
    if (!IsObject(value[j])) {
      question = false;
      break;
    }

    ++j;
    
if (!IsObject(value[j])) {
      question = false;
      break;
    }

  }
  if (n % 4 >= 3 && question) {
    j = n - 3;
    question = IsObject(value[j]);
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    question = IsObject(value[j]);
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    question = IsObject(value[j]);
  }
  return question;
};
