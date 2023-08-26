"use strict";
import validator from '../validator.js';
/**
 * Implementation of the for_all method when the "value" property of the 
 * current validator instance is array.
 * @param {any} value - the "value" property of the current validator instance.
 * @param {function(validator, number)} callback
 * @returns {boolean} if the callback function returns truthy for all the elements of the array, returns true, otherwise returns false.
 **/
export const ForAllArrayEdition = (value, callback) => {
  const n = value.length;
  let i, j, question = true;;
  for (i = 0;i < n >> 2;i++) {
    j = i << 2;
    if (!callback(new validator(value[j]), j)) {
      question = false;
      break;
    }
    ++j;
    if (!callback(new validator(value[j]), j)) {
      question = false;
      break;
    }
    ++j;
    if (!callback(new validator(value[j]), j)) {
      question = false;
      break;
    }
    ++j;
    if (!callback(new validator(value[j]), j)) {
      question = false;
      break;
    }
  }
  if (n % 4 >= 3 && question) {
    j = n - 3;
    question = callback(new validator(value[j]), j); 
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    question = callback(new validator(value[j]), j);
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    question = callback(new validator(value[j]), j);
  }
  return question;
}
/**
 * Implements the for_all method in the case, where the "value" property is object
 * @param {any} value - the value of the current validator instance.
 * @param {function(validator, number)} callback
 * @returns {boolean} if the callback function returns truthy values for all the elements of the array, then returns true, otherwise returns false.
 **/
export const ForAllObjectEdition = (value, callback) => {
  const keys = Object.keys(value), n = keys.length;
  let i, j, question = true;
  for (i = 0;i < n >> 2;i++) {
    j = i << 2;
    if (!callback(new validator(value[keys[j]]), j)) {
      question = false;
      break;
    }
    ++j;
    if (!callback(new validator(value[keys[j]]), j)) {
      question = false;
      break;
    }
    ++j;
    if (!callback(new validator(value[keys[j]]), j)) {
      question = false;
      break;
    }
    ++j;
    if (!callback(new validator(value[keys[j]]), j)) {
      question = false;
      break;
    }
  }
  if (n % 4 >= 3 && question) {
    j = n - 3;
    question = callback(new validator(value[keys[j]]), j);
  }
  if (n % 4 >= 2 && question) {
    j = n - 2; 
    question = callback(new validator(value[keys[j]]), j);
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    question = callback(new validator(value[keys[j]]), j);
  }
  return question;
}
