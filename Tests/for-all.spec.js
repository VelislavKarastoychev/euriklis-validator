"use strict";
import validator from "../index.js";
import { print, matrix } from "./data.js";
new validator(matrix).for_all((item) => item.is_array_of_numbers_in_range(0, 1)).on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).for_all((el) => el.isNumberArray).answer
  );
  const t2 = v.benchmark(
    (n) =>
      n instanceof Array
        ? n.every((row) =>
          row instanceof Array
            ? row.every((el) => typeof el === "number" && !isNaN(el))
            : false
        )
        : false,
    1000,
  );
  print("for all", t1, t2);
}).on(false, () => console.log("Something went wrong!!!"));

