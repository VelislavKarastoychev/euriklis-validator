"use strict";
import validator from "../index.js";
import { intArray } from "./data.js";
new validator(intArray).is_array_of_integers_in_closed_range(0, 100).on(
  true,
  (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).is_array_of_integers_in_closed_range(0, 100).answer
    );
    const t2 = v.benchmark((n) =>
      n instanceof Array
        ? n.every((item) =>
          Number.isInteger(item) ? item <= 100 && item >= 0 : false
        )
        : false
    );
    print(
      "is_array_of_integers_in_closed_range(0, 100) with 1000000 elements",
      t1,
      t2,
    );
  },
).on(false, () => console.log("Something went wrong ..."));
