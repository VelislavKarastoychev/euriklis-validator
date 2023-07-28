"use strict";
/**
 * Tests if the value property is number or string which can be transformed to number.
 * Utility function for isNumberLike method.
 * @param {number | string} value
 * @returns {boolean}
 **/
export const IsNumberLike = (value) => !Number.isNaN(value);
