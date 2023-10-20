"use strict";
/**
 * Tests if an array contains only boolean elements.
 * Utility function for the isBooleanArray method.
 *
 * @param {Array.<boolean>} value
 * @returns {boolean}
 */
export const IsBooleanArray = (value) => {
  const n = value.length;
  let i, j, isAllBoolean = true;

  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      typeof value[j] !== "boolean" ||
      typeof value[j + 1] !== "boolean" ||
      typeof value[j + 2] !== "boolean" ||
      typeof value[j + 3] !== "boolean"
    ) {
      isAllBoolean = false;
      break;
    }
  }

  if (isAllBoolean) {
    j = i << 2;
    for (;j < n;j++) {
      if (typeof value[j] !== 'boolean') {
        isAllBoolean = false;
        break;
      }
    }
  }
  
  return isAllBoolean;
};
