"use strict";
export const IsNumberArray = (value) => {
  let i, j, question = true;
  const n = value.length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (typeof value[j] !== "number" && isNaN(value[j])) {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] !== "number" && isNaN(value[j])) {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] !== "number" && isNaN(value[j])) {
      question = false;
      break;
    }
    ++j;
    if (typeof value[j] !== "number" && isNaN(value[j])) {
      question = false;
      break;
    }
  }
  if (n % 4 === 3 && question) {
    j = n - 3;
    if (typeof value[j] !== "number" && isNaN(value[j])) {
      question = false;
    }
  }
  if (n % 4 === 2 && question) {
    j = n - 2;
    if (typeof value[j] !== "number" && isNaN(value[j])) {
      question = false;
    }
  }
  if (n % 4 === 1 && question) {
    j = n - 1;
    question = false;
  }
  return question;
};
