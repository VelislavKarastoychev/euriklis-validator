"use strict";
import validator from "../index.js";
import { print } from "./data.js";
const asyncFunction = async () => {
  console.log('This is an async function. But do now worry!');
}
new validator(asyncFunction).isAsync.on(true, (v) => {
  const t1 = v.benchmark((f) => new validator(f).isAsync.answer);
  const t2 = v.benchmark((f) =>
    typeof f === "function" ? f.constructor.name === "AsyncFunction" : false
  );
  print("Async function", t1, t2);
});
