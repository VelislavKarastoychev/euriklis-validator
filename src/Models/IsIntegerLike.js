"use strict";
/**
 * Tests if the value parameter is an integer or a string which can be transformed to integer.
 * Utility function for isIntegerLike method.
 * @param {number | string} value
 * @returns {boolean}
 */
export const IsIntegerLike = (value) =>
  typeof this.value === "string"
    ? Number.isInteger(+value)
    : Number.isInteger(value);
