"use strict";
import validator from "../index.js";
import { addMatrices, print } from "./data.js";
const addMatricesValidator = new validator(addMatrices);
addMatricesValidator.isFunction.And.throws_error_with(null, [[2]]).on(true, () => {
  console.log('This works correctly!!!')
});
addMatricesValidator
  .throws_error_with(undefined, undefined).on(true, () => {
    const t1 = addMatricesValidator.copy().benchmark((f) =>
      new validator(f).throws_error_with().answer
    );
    const t2 = addMatricesValidator.benchmark((f) => {
      try {
        const s = f();
        return s;
      } catch (error) {
        return error;
      }
    });
    print("throws_error_with", t1, t2);
  })
  .on(false, () => console.log('Something went wrong...'));
;

