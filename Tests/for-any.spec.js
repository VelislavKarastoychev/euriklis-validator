"use strict";
import validator from "../index.js";
import { print, matrix } from "./data.js";
new validator(matrix)
  .for_any((v) => {
    if(v.is_array_of_numbers_in_range(1, 2).answer) console.log(v.value);
    return v.is_array_of_numbers_in_range(1, 2);
  }).on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).Not.for_any((k) => k.is_array_of_numbers_in_range(1, 2))
        .answer
    );
    const t2 = v.benchmark((m) => {
      m instanceof Array
        ? m.some((row) => {
          return row instanceof Array
            ? row.every((item) =>
              !Number.isNaN(item) ? item > 1 && item < 2 : false
            )
            : false;
        })
        : false;
    });
    print('for_any', t1, t2);
  });

