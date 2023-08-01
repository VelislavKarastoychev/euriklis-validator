"use strict";
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
