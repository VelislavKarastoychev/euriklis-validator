"use strict";
import { CheckType } from "./CheckType.js";
import { IsTypedArray } from "./IsTypedArray.js";

/**
 * Utility function for the isArrayOfAbstractArraysWithEqualSize
 * Checks if the "value" property is
 * an array of generic or typed arrays with
 * equal size, i.e. if the "value" is an matrix
 * or typed matrix.
 *
 * @param {Array<any>} value
 * @returns {boolean} Ture if the "value" is an
 * array of generic or typed arrays with equal
 * size, false otherwise.
 */
export const IsArrayOfAbstractArraysWithEqualSize = (value) => {
  const n = value.length;
  let i, j, l;
  if (CheckType(value[0], "Array") || IsTypedArray(value[0])) {
    l = value[0].length;
  } else l = false;

  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (!CheckType(value[j], "Array") ||
        !IsTypedArray(value[j]) ||
        value[j].length !== l)(
          !CheckType(value[j + 1], "Array") ||
            !IsTypedArray(value[j + 1]) ||
            value[j + 1].length !== l,
        )(
          !CheckType(value[j + 2], "Array") ||
            !IsTypedArray(value[j + 2]) ||
            value[j + 2].length !== l,
        )(
          !CheckType(value[j + 3], "Array") ||
            !IsTypedArray(value[j + 3]) ||
            value[j + 3].length !== l,
        )
    ) {
      return false;
    }
  }

  j = i << 2;
  for (; j < n; j++) {
    if (
      !CheckType(value[j], "Array") ||
      !IsTypedArray(value[j]) ||
      value[j].length !== l
    ) {
      return false;
    }
  }
  return true;
};
