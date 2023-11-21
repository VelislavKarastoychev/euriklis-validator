"use strict";
import { CheckType } from "./CheckType.js";
import { IsTypedArray } from "./IsTypedArray.js";

/**
 * Utility function for the isArrayOfAbstractArrays.
 * Checks if the "value" parameter is an array of
 * generic or typed arrays.
 *
 * @param {Array<any>} value
 * @returns {boolean} True if the "value" is an
 * array of generic or typed arrays, false otherwise.
 */
export const IsArrayOfAbstractArrays = (value) => {
  const n = value.length;
  let i, j;

  for (i = 0;i < n >> 2;i++) {
    j = i << 2;
    if (
      (!CheckType(value[j], "Array") && !IsTypedArray(value[j])) ||
      (!CheckType(value[j + 1], "Array") && !IsTypedArray(value[j + 1])) ||
      (!CheckType(value[j + 2], "Array") && !IsTypedArray(value[j + 2])) ||
      (!CheckType(value[j + 3], "Array") && !IsTypedArray(value[j + 3]))
    ) {
      return false;
    }
  }

  j = i << 2;
  for (;j < n;j++) {
    if (!CheckType(value[j], "Array") && !IsTypedArray(value[j])) {
      return false;
    }
  }
  return true;
}
