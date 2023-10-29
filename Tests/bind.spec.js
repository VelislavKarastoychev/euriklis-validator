"use strict";
import validator from "../index.js";
import { print, matrix, matrix1 } from "./data.js"
new validator(matrix).isArrayOfNumberArraysWithEqualSize
  .and.bind(
    new validator(matrix1).isArrayOfNumberArraysWithEqualSize,
  ).on(true, (v) => {
    const t1 = v.benchmark((n) => {
      return new validator(n).isArrayOfNumberArraysWithEqualSize
        .and.bind(
          new validator(matrix1).isArrayOfNumberArraysWithEqualSize,
        ).answer;
    });
    const t2 = v.benchmark((n) => {
      return n instanceof Array && matrix1 instanceof Array
        ? n.every((row) => {
          return row.length === n[0].length &&
            row.every((el) => typeof el === "number");
        }) && matrix1.every((row) => {
          return row.length === matrix1[0].length &&
            row.every((el) => typeof el === "number");
        })
        : false;
    });
    print("bind", t1, t2);
  }).on(false, () => console.log('Error in bind method'));

