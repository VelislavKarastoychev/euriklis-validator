"use strict";
/**
 * Checks if the "value" property is an array of integers, which lies
 * in the closed interval [a, b].
 * Utility function for the isArrayOfIntegersInClosedRange.
 * 
 * @param {number []} value
 * @param {number} a - the lower bound of the array elements.
 * @param {number} b - the upper bound of the array elements.
 * @returns {boolean} if the "value" is integer array in the closed range [a, b], returns true, otherwise returns false.
 */
export const IsArrayOfIntegersInClosedRange = (value, a, b) => {
  const n = value.length;
  let i, j, areAllIntegersInClosedRange = true;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (!Number.isInteger(value[j]) || value[j] < a || value[j] > b) ||
      (!Number.isInteger(value[j + 1]) || value[j + 1] < a ||
        value[j + 1] > b) ||
      (!Number.isInteger(value[j + 2]) || value[j + 2] < a ||
        value[j + 2] > b) ||
      (!Number.isInteger(value[j + 3]) || value[j + 3] < a || value[j + 3] > b)
    ) {
      areAllIntegersInClosedRange = false;
      break;
    }
  }

  if (areAllIntegersInClosedRange) {
    j = i << 2;
    for (; j < n; j++) {
      if (
        (!Number.isInteger(value[j]) || value[j] < a || value[j] > b)
      ) {
        areAllIntegersInClosedRange = false;
        break;
      }
    }
  }

  return areAllIntegersInClosedRange;
};
