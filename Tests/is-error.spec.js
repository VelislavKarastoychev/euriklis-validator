"use strict";
import validator from "../index.js";
import { print } from "./data.js";
new validator(new Error()).isError.on(true, (v) => {
  const t1 = v.benchmark((err) => new validator(err).isError.answer);
  const t2 = v.benchmark((err) => err instanceof Error);
  print("isError", t1, t2);
}).on(false, () => console.log("Something went wrong with isError method!"));

