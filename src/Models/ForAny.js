"use strict";
import validator from "../validator.js";
/**
 * Utility function used in the implementation of the
 * for_any method.
 * @param {Array} value
 * @param {function(any, number):validator} callback
 * @returns {boolean}
 **/
export const ForAnyArrayEdition = (value, callback) => {
  let i, j, question = false;
  const n = value.length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (callback(new validator(value[j]), j).answer) {
      question = true;
      break;
    }
    ++j;
    if (callback(new validator(value[j]), j).answer) {
      question = true;
      break;
    }
    ++j;
    if (callback(new validator(value[j]), j).answer) {
      question = true;
      break;
    }
    ++j;
    if (callback(new validator(value[j]), j).answer) {
      question = true;
      break;
    }
  }
  if (n % 4 >= 3 && question) {
    j = n - 3;
    question = callback(new validator(value[j]), j).answer;
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    question = callback(new validator(value[j]), j).answer;
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    question = callback(new validator(value[j]), j).answer;
  }
  return question;
};
/**
 * Utility function used in the for_any method.
 * @param {Object} value
 * @param {function(any, number | string):validator} callback
 * @returns {boolean}
 **/
export const ForAnyObjectEdition = (value, callback) => {
  let i, j, question = false;
  const keys = Object.keys(value);
  const n = keys.length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (callback(new validator(value[keys[j]]), j).answer) {
      question = true;
      break;
    }
    ++j;
    if (callback(new validator(value[keys[j]]), j).answer) {
      question = true;
      break;
    }
    ++j;
    if (callback(new validator(value[keys[j]]), j).answer) {
      question = true;
      break;
    }
    ++j;
    if (callback(new validator(value[keys[j]]), j).answer) {
      question = true;
      break;
    }
  }
  if (n % 4 >= 3 && question) {
    j = n - 3;
    question = callback(new validator(value[keys[j]]), j).answer;
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    question = callback(new validator(value[keys[j]]), j).answer;
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    question = callback(new validator(value[keys[j]]), j).answer;
  }
  return question;
};
/**
 * Utility function which is used in the implementation of
 * the for_any method.
 * @param {Set} value
 * @param {function(validator):validator} callback
 * @returns {boolean}
 **/
export const ForAnySetEdition = (value, callback) => {
  let question = false;
  for (const element of value) {
    if (callback(new validator(element)).answer) {
      return !question;
    }
  }
  return question;
};
/**
 * Utility function which is used in the implementation of
 * for_any method.
 * @param {Map} map
 * @param {function(validator, string | number):validator} callback
 * @returns {boolean}
 **/
export const ForAnyMapEdition = (map, callback) => {
  let question = false;
  for (const [key, value] of map) {
    if (callback(new validator(value), key).answer) {
      return !question;
    }
  }
  return question;
};
