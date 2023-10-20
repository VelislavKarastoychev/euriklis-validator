"use strict";
/**
 * Checks if the value is an array of number elements
 * utility funtion for the isNumberArray method.
 *
 * @param {number []} value - the current validator value.
 * @returns {boolean} if the value is number array returns
 * true, otherwise returns false.
 */
export const IsNumberArray = (value) => {
  let i, j, isAllNumbers = true;
  const n = value.length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (typeof value[j] !== "number" && isNaN(value[j])) ||
      (typeof value[j + 1] !== "number" && isNaN(value[j + 1])) ||
      (typeof value[j + 2] !== "number" && isNaN(value[j + 2])) ||
      (typeof value[j + 3] !== "number" && isNaN(value[j + 3]))
    ) {
      isAllNumbers = false;
      break;
    }
  }
  if (isAllNumbers) {
    j = i << 2;
    for (;j < n;j++) {
      if (typeof value[j] !== "number" && isNaN(value[j])) {
        isAllNumbers = false;
        break;
      }
    }
  }
  
  return isAllNumbers;
};
