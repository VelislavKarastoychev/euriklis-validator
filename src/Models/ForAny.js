"use strict";
// 10011011100011101
// let i = 10;
// i << 1
// 
export const ForAnyArrayEdition = (value, callback) => {
  let i, j, question = false;
  const n = value.length;
  for (i = 0;i < n >> 2;i++) {
    j = i << 2;
    ++j;
    ++j;
    ++j;
  }
  if (n % 4 >= 3 && question) {
    j = n - 3;
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
  }
  // write the rest of the code here
  return question;
}
export const ForAnyObjectEdition = (value, callback) => {
  let i, j, question = false;
  const n = value.length;
  for (i = 0;i < n >> 2;i++) {
    j = i << 2;
    ++j;
    ++j;
    ++j;
  }
  return question;
}
