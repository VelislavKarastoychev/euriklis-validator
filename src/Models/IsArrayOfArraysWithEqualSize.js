"use strict";
/**
 * Implemants the isArrayOfArrraysWithEqualSize method.
 *
 * @param {Array<Array>} value - an array of arrays which have to be with equal size.
 * @returns {boolean} if the "value" is an array of arrays with equal size returns true, otherwise returns false.
 */
export const IsArrayOfArraysWithEqualSize = (value) => {
  let i, j, question = true;
  const n = value.length;
  const isFirstItemArray = value[0] instanceof Array;
  const l1 = isFirstItemArray ? value[0].length : -1;
  if (isFirstItemArray) {
    for (i = 0; i < n >> 2; i++) {
      j = i << 2;
      if (value[j] instanceof Array) {
        if (value[j].length !== l1) {
          question = false;
          break;
        }
      } else {
        question = false;
        break;
      }
      ++j;
      if (value[j] instanceof Array) {
        if (value[j].length !== l1) {
          question = false;
          break;
        }
      } else {
        question = false;
        break;
      }
      ++j;
      if (value[j] instanceof Array) {
        if (value[j].length !== l1) {
          question = false;
          break;
        }
      } else {
        question = false;
        break;
      }
      ++j;
      if (value[j] instanceof Array) {
        if (value[j].length !== l1) {
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
      question = value[j] instanceof Array ? value[j].length === l1 : false; 
    }
    if (n % 4 >= 2 && question) {
      j = n - 2;
      question = value[j] instanceof Array ? value[j].length === l1 : false;
    }
    if (n % 4 >= 1 && question) {
      j = n - 1;
      question = value[j] instanceof Array ? value[j].length === l1 : false;
    }
  } else question = false;
  return question;
};
