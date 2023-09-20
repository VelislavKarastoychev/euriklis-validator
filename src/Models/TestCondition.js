"use strict";
/**
 * @param {any} value
 * @param {string | number} property
 * @param {string} condition
 * @param {number | string} item
 */
export const TestCondition = (value, property = "", item, condition = "eq") => {
  let v = value;
  if (property) {
    v = value[property];
  }
  switch (condition) {
    case "eq":
      return v === item;
    case "neq":
      return v !== item;
    case "beq":
      return v >= item;
    case "seq":
      return v <= item;
    case "lt":
      return v < item;
    case "gt":
      return v > item;
  }
};
