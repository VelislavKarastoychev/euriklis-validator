"use strict";
/**
 * This utility function tests if the underlined typed array contains a NaN value.
 * @param { Int8Array | Uint8ClampedArray |  Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array} value
 * @returns {false}
 **/
export const HasNaNInTypedArray = (value) => {
  const n = value.length;
  let i, j, question = false;
  for (i = 0;i < n >> 2;i++) {
    j = i << 2;
    if (isNaN(value[j])) {
      question = true;
      break;
    }
    ++j;
    if (isNaN(value[j])) {
      question = true;
      break;
    }
    ++j;
    if (isNaN(value[j])) {
      question = true;
      break;
    }
    ++j;
    if (isNaN(value[j])) {
      question = true;
      break;
    }
  }
  if (n % 4 >= 3 && question) {
    j = n - 3;
    question = isNaN(value[j]);
  }
  if (n % 4 >= 2 && question) {
    j = n - 2;
    question = isNaN(value[j]);
  }
  if (n % 4 >= 1 && question) {
    j = n - 1;
    question = isNaN(value[j]);
  }
  return question;
}
