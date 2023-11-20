"use strict";

import { IsTypedArray } from "./IsTypedArray.js";

/**
 * Checks if the "value" is an array of typed
 * arrays with equal length.
 *
 * @param {Array<any>} value
 * @returns {boolean} True if the value is
 * a typed matrix, false otherwise.
 */
export const IsArrayOfTypedArraysWithEqualSize = (value) => {
  const n = value.length;
  let i, j, l;

  if (IsTypedArray(value[0])) {
    l = value[0].length;
  } else l = false;

  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (!IsTypedArray(value[j]) || value[j].length !== l) ||
      (!IsTypedArray(value[j + 1]) || value[j + 1].length !== l) ||
      (!IsTypedArray(value[j + 2]) || value[j + 2].length !== l) ||
      (!IsTypedArray(value[j + 3]) || value[j + 3].length !== l)
    ) return false;
  }

  j = i << 2;
  for (; j < n; j++) {
    if ((!IsTypedArray(value[j]) || value[j].length !== l)) {
      return false;
    }
  }

  return true;
};
