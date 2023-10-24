"use strict";
/**
 * Checks if every element of "value" is a string array.
 * Utility function for the isStringArray method.
 *
 * @param {string []} value - the current validator value
 * property, which has to be a string array.
 * @returns {boolean} if every element of the value is a
 * string element, then returns true, otherwise return
 * false.
 **/
export const IsStringArray = (value) => {
  const n = value.length;
  let i, j, areAllStrings = true;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      typeof value[j] !== "string" ||
      typeof value[j + 1] !== "string" ||
      typeof value[j + 2] !== "string" ||
      typeof value[j + 3] !== "string"
    ) {
      areAllStrings = false;
      break;
    }
  }

  if (areAllStrings) {
    j = i << 2;
    for (; j < n; j++) {
      if (typeof value[j] !== "string") {
        areAllStrings = false;
        break;
      }
    }
  }

  return areAllStrings;
};
