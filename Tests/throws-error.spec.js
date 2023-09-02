"use strict";
import validator from "../index.js";
import { addMatrices, print } from "./data.js";
const addMatricesValidator = new validator(addMatrices);
addMatricesValidator.copy()
  .throwsError(undefined, undefined).on(true, () => {
    const t1 = addMatricesValidator.copy().benchmark((f) =>
      new validator(f).throwsError().answer
    );
    const t2 = addMatricesValidator.copy().benchmark((f) => {
      try {
        const s = f();
        return s;
      } catch (error) {
        return error;
      }
    });
    print("throwsError", t1, t2);
  });

