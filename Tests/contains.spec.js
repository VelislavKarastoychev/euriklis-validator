"use strict";
import validator from "../index.js";
import { print, numericArray } from "./data.js";
const numberArray = numericArray.map(el => el >= 0.5 ? 1 : 0);
const numberElements = [0, 1];
new validator(numberArray).contains(numberElements).on(true, (v) => {
  const t1 = v.benchmark((f) => new validator(f).contains(numberElements).answer, 10);
  const t2 = v.benchmark((f) => f.every(el => numberElements.some(item => item === el)), 10);
  print("contains with number array", t1, t2);
}).on(false, () => console.log("Something went wrong in contains."));
