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
      !CheckType(value[j], "Object") ||
      !CheckType(value[j + 1], "Object") ||
      !CheckType(value[j + 2], "Object") ||
      !CheckType(value[j + 3], "Object")
    ) {
      return false;
    }
  }

  j = i << 2;
  for (; j < n; j++) {
    if (!CheckType(value[j], "Object")) {
      return false;
    }
  }

  return true;
};
