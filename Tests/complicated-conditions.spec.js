import validator from '../index.js';  
import { print } from "./data.js";
new validator(Math.PI + "").isString.Or.isPositive.And.Not.isBoolean.on(
  true,
  (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isString.Or.isPositive.And.Not.isBoolean.answer
    );
    const t2 = v.benchmark((n) =>
      typeof n === "number"
        ? n >= 0
        : typeof n === "string" && typeof n !== "boolean"
    );
    print("isString.Or.isPositive.And.Not.isBoolean", t1, t2);
  },
);
