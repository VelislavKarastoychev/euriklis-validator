"use strict";
import validator from "../index.js";
import { print, addMatrices, matrix, matrix1 } from "./data.js";
const m = matrix.slice(0, 10);
const m1 = matrix1.slice(0, 10);
new validator(addMatrices).execute_with(m, m1).isArrayOfNumberArrays.on(true, () => {
  const t1 = new validator(addMatrices).benchmark((f) => new validator(f).execute_with(m, m1).answer);
  print('execute with', t1, {mean: null, std: null, iterations: null});
});
