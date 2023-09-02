"use strict";
import validator from "../index.js";
import { objectArray } from "./data.js";
new validator(objectArray).isObjectArray.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isObjectArray.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => item instanceof Object && !(item instanceof Array))
      : false
  );
  print("isObjectArray with 1000000 elements", t1, t2);
});

