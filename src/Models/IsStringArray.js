"use strict";
/**
 * Utility function for the isStringArray method.
 * This funciton sets the value of the private question
 * property of the current validator instance.
 * 
 * @param {string []} value - the current validator value
 * property, which has to be a string array.
 * @param {boolean} question - the private property question of the
 * current validator instance.
 * 
 })
 **/
export const IsStringArray = (value, question) => {
  let i, j, n = value.length;
      for (i = 0; i < n; i++) {
        j = i << 2;
        if (typeof value[j] !== "string") {
          question = false;
          break;
        } else question = true;
        ++j;
        if (typeof value[j] !== "string") {
          question = false;
          break;
        } else question = true;
        ++j;
        if (typeof value[j] !== "string") {
          question = false;
          break;
        } else question = true;
        ++j;
        if (typeof value[j] !== "string") {
          question = false;
          break;
        } else question = true;
      }
      if (question && n % 4 >= 1) {
        j = n - 1;
        if (typeof value[j] !== "string") question = false;
        else question = true;
      }
      if (question && n % 4 >= 2) {
        j = n - 2;
        if (typeof value[j] !== "string") question = false;
        else question = true;
      }
      if (question && n % 4 >= 3) {
        j = n - 3;
        if (typeof this.value[j] !== "string") question = false;
        else question = true;
      }
}
