"use strict";
/**
 * Tests if the value parameter is an integer or a string which can be transformed to integer.
 * Utility function for isConvertibleToInteger method.
 * @param {number | string} value
 * @returns {boolean}
 */
export const IsIntegerLike = (value) =>
  typeof value === "string"
    ? Number.isInteger(+value)
    : Number.isInteger(value);
