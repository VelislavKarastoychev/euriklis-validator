"use strict";
import validator from "../validator.js";
export const ForAnyArrayEdition = (value, callback) => {
  let i, j, question = false;
  const n = value.length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (callback(new validator(value[j]), j)) {
      question = true;
      break;
    }
    ++j;
    if (callback(new validator(value[j]), j)) {
      question = true;
      break;
    }
    ++j;
    if (callback(new validator(value[j]), j)) {
      question = true;
      break;
    }
    ++j;
    if (callback(new validator(value[j]), j)) {
      question = true;
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
};
export const ForAnyObjectEdition = (value, callback) => {
  let i, j, question = false;
  const keys = Object.keys(value);
  const n = keys.length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (callback(new validator(value[keys[j]]), j)) {
      question = true;
      break;
    }
    ++j;
    if (callback(new validator(value[keys[j]]), j)) {
      question = true;
      break;
    }
    ++j;
    if (callback(new validator(value[keys[j]]), j)) {
      question = true;
      break;
    }
    ++j;
    if (callback(new validator(value[keys[j]]), j)) {
      question = true;
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
};
export const ForAnySetEdition = (value, callback) => {
  let question = false;
  for (const element of value) {
    if (callback(new validator(element))) {
      return !question;
    }
  }
  return question;
};
export const ForAnyMapEdition = (map, callback) => {
  let question = false;
  for (const [key, value] of map) {
    if (callback(new validator(value), key)) {
      return !question;
    }
  }
  return question;
};
