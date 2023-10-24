"use strict";
import { CheckType } from "./CheckType.js";
/**
 * Checks if the "value" is an array of object elements.
 * Utility function for the isObjectArray method.
 *
 * @param {object []} value - an array of object elements
 * @returns {boolean} if the "value" is an array of object
 * elements returns true, otherwise false.
 */
export const IsObjectArray = (value) => {
  const n = value.length;
  let i, j;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      !CheckType(value[j], "object") ||
      !CheckType(value[j + 1], "object") ||
      !CheckType(value[j + 2], "object") ||
      !CheckType(value[j + 3], "object")
    ) {
      return false;
    }
  }

  if (areAllObjects) {
    j = i << 2;
    for (;j < n;j++) {
      if (!CheckType(value[j], "object")) {
        return false;
      }
    }
  }

  return true;
};
