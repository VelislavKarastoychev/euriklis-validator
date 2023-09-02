"use strict";
import validator from "./index.js";
const print = (method, t1, t2) => {
  console.log(`Testing of ${method} method/s:`);
  console.table({ "@euriklis/validator": t1, "inner js methods": t2 });
};
const boolArr = Array.from({ length: 1000000 }).map((_) => Math.random() > 0.5);
const numArr = Array.from({ length: 1000000 }).map(Math.random);
const intArray = numArr.map((item) => item * 100 | 0);
const negNumArr = numArr.map((item) => -item);
const negIntArr = intArray.map((item) => item ? -item : -1);
const strArr = numArr.map((el) => el + "");
const funcArr = numArr.map((_, i) => () => console.log(i));
const objArr = numArr.map((_) => {
  return {};
});
// objArr.push([]);
const matrix = Array.from({ length: 100 }).map((_) =>
  Array.from({ length: 1000 }).map(Math.random)
);
const matrix1 = Array.from({ length: 100 }).map((_) =>
  Array.from({ length: 100 }).map(Math.random)
);
const addMatrices = (m1, m2) => {
  if (!m1 || !m2) {
    const error = new Error();
    error.name = "Matrix funciton error message";
    error.message = "Incorrectly defined matrices in the add function.";
  }
  const n = m1.length;
  const m = m1[0].length;
  const sum = [];
  for (let i = 0; i < n; i++) {
    sum[i] = [];
    for (let j = 0; j < m; j++) {
      sum[i][j] = m1[i][j] + m2[i][j];
    }
  }
  return sum;
};
const intMatrix = matrix.map((row) => row.map((el) => el * 100 >> 0));
new validator(Math.PI).isNumber.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isNumber.answer);
  const t2 = v.benchmark((n) => typeof n === "number");
  print("isNumber", t1, t2);
});
const stringMatrix = intMatrix.map((row) =>
  row.map((el) => String.fromCharCode(el))
);
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
new validator(boolArr).isBooleanArray.Or.isBoolean.on(true, (v) => {
  const t1 = v.benchmark((b) => new validator(b).isBooleanArray.answer);
  const t2 = v.benchmark((
    b,
  ) => (b instanceof Array
    ? b.every((item) => typeof item === "boolean")
    : false)
  );
  print("isBooleanArray with 1000000 elements", t1, t2);
});
new validator(numArr).isNumberArray.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isNumberArray.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => typeof item === "number" && !isNaN(item))
      : false
  );
  print("isNumberArray for 1000000 elements", t1, t2);
});
new validator(strArr).isStringArray.on(true, (v) => {
  const t1 = v.benchmark((s) => new validator(s).isStringArray.answer);
  const t2 = v.benchmark((s) =>
    s instanceof Array ? s.every((item) => typeof item === "string") : false
  );
  print("isStringArray for 1000000 elements", t1, t2);
}).on(false, () => console.log("Something went wrong with isStringArray..."));
new validator(intArray).isIntegerArray.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isIntegerArray.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array ? n.every(Number.isInteger) : false
  );
  print("isIntegerArray for 1000000 elements", t1, t2);
});
new validator(negNumArr).isArrayOfNegativeNumbers.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfNegativeNumbers.answer
  );
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => typeof item === "number" && !isNaN(item) && item < 0)
      : false
  );
  print("isArrayOfNegativeNumbers with 1000000 elements", t1, t2);
});
new validator(negIntArr).isArrayOfNegativeIntegers.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfNegativeIntegers.answer
  );
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => Number.isInteger(item) && item < 0)
      : false
  );
  print("isArrayOfNegativeIntegers with 1000000 elements", t1, t2);
}).on(
  false,
  () => console.log("Something went wrong with isArrayOfNegativeIntegers!!!"),
);
new validator(numArr).isArrayOfPositiveNumbers.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfPositiveNumbers.answer
  );
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => typeof item === "number" && !isNaN(item) && item >= 0)
      : false
  );
  print("isArrayOfPositiveNumbers with 1000000 elements", t1, t2);
});
new validator(intArray).isArrayOfPositiveIntegers.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfPositiveIntegers.answer
  );
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => Number.isInteger(item) ? item >= 0 : false)
      : false
  );
  print("isArrayOfPositiveIntegers with 1000000 elements", t1, t2);
});
new validator(intArray).is_array_of_integers_in_range(-1, 100).on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).is_array_of_integers_in_range(-1, 100).answer
  );
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) =>
        Number.isInteger(item) ? item < 100 && item > -1 : false
      )
      : false
  );
  print("is_array_of_integers_in_range(-1, 100) with 1000000 elements", t1, t2);
}).on(false, () => console.log("Something went wrong ..."));
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

new validator(numArr).is_array_of_numbers_in_range(-1, 100).on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).is_array_of_numbers_in_range(-1, 100).answer
  );
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) =>
        (typeof item === "number" && !isNaN(item))
          ? item < 100 && item > -1
          : false
      )
      : false
  );
  print("is_array_of_numbers_in_range(-1, 100) with 1000000 elements", t1, t2);
}).on(false, () => console.log("Something went wrong ..."));
new validator(numArr).is_array_of_numbers_in_closed_range(0, 100).on(
  true,
  (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).is_array_of_numbers_in_closed_range(0, 100).answer
    );
    const t2 = v.benchmark((n) =>
      n instanceof Array
        ? n.every((item) =>
          (typeof item === "number" && !isNaN(item))
            ? item <= 100 && item >= 0
            : false
        )
        : false
    );
    print(
      "is_array_of_numbers_in_closed_range(0, 100) with 1000000 elements",
      t1,
      t2,
    );
  },
).on(false, () => console.log("Something went wrong ..."));
new validator(funcArr).isArrayOfFunctions.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isArrayOfFunctions.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array ? n.every((item) => typeof item === "function") : false
  );
  print("isArrayOfFunctions with 1000000 elements", t1, t2);
});
new validator(objArr).isObjectArray.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isObjectArray.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => item instanceof Object && !(item instanceof Array))
      : false
  );
  print("isObjectArray with 1000000 elements", t1, t2);
});
new validator(matrix).isArrayOfArraysWithEqualSize.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfArraysWithEqualSize.answer
  );
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) =>
        item instanceof Array ? item.length === n[0].length : false
      )
      : false
  );
  print("isArrayOfArraysWithEqualSize with 1000000 elements", t1, t2);
});
new validator(matrix).isArrayOfNumberArrays.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isArrayOfNumberArrays.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) =>
        item.every((el) => typeof el === "number" && !isNaN(el))
      )
      : false
  );
  print("isArrayOfNumberArrays with 1000000 elements", t1, t2);
});
new validator(matrix).isArrayOfNumberArraysWithEqualSize.on(true, (v) => {
  const t1 = v.benchmark((m) =>
    new validator(m).isArrayOfNumberArraysWithEqualSize.answer
  );
  const t2 = v.benchmark((m) =>
    m instanceof Array
      ? m.every((row) => {
        const isRowArray = row instanceof Array;
        const n = isRowArray ? row[0].length : -1;
        return isRowArray
          ? row.every((item) =>
            typeof item === "number" && !isNaN(item) && row.length === n
          )
          : false;
      })
      : false
  );
  print("isArrayOfNumberArraysWithEqualSize with 1000000 elements", t1, t2);
});
intMatrix[0].push(Math.PI >> 0);
new validator(intMatrix).isArrayOfIntegerArrays.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isArrayOfIntegerArrays.answer);
  const t2 = v.benchmark((n) =>
    n.every((row) =>
      row instanceof Array ? row.every((el) => Number.isInteger(el)) : false
    )
  );
  print("isArrayOfIntegerArrays", t1, t2);
}).on(
  false,
  () => console.log("Something went wrong in isArrayOfIntegerArrays!"),
);
intMatrix[0].pop();
new validator(intMatrix).isArrayOfIntegerArraysWithEqualSize.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfIntegerArraysWithEqualSize.answer
  );
  const t2 = v.benchmark((n) => {
    const l = n instanceof Array ? n[0].length : -1;
    return n instanceof Array
      ? n.every((row) =>
        row.every((el) => Number.isInteger(el)) && row.length === l
      )
      : false;
  });
  print("isArrayOfIntegerArraysWithEqualSize", t1, t2);
}).on(
  false,
  () =>
    console.log(
      "Something went wrong with isArrayOfIntegerArraysWithEqualSize!",
    ),
);
stringMatrix[0].push("Hello");
new validator(stringMatrix).isArrayOfStringArrays.on(true, (v) => {
  const t1 = v.benchmark((s) => new validator(s).isArrayOfStringArrays.answer);
  const t2 = v.benchmark((s) =>
    s instanceof Array
      ? s.every((row) =>
        row instanceof Array ? row.every((el) => typeof el === "string") : false
      )
      : false
  );
  print("isArrayOfStringArrays", t1, t2);
}).on(
  false,
  () => console.log("Something went wrong in isArrayOfStringArrays!"),
);
stringMatrix[0].pop();
new validator(stringMatrix).isArrayOfStringArraysWithEqualSize.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfStringArraysWithEqualSize.answer
  );
  const t2 = v.benchmark((n) => {
    const l = n instanceof Array
      ? n[0] instanceof Array ? n[0].length : -1
      : -1;
    return n instanceof Array
      ? n.every((row) =>
        row instanceof Array
          ? row.length === l && row.every((el) => typeof el === "string")
          : false
      )
      : false;
  });
  print("isArrayOfStringArraysWithEqualSize", t1, t2);
}).on(
  false,
  () =>
    console.log("Something went wrong in isArrayOfStringArraysWithEqualSize!"),
);
objArr.push(() => Math.random());
new validator(objArr).isObjectArray.on(false, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isObjectArray.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((el) => el instanceof Object && !(el instanceof Array))
      : false
  );
  print(`isObjectArray with ${v.value.length} elements`, t1, t2);
  objArr.pop(); // finally the objArr will remain an objArr.
}).on(
  true,
  () => console.log("Something went wrong with isObjectArray method!"),
);

new validator({
  name: "Dubatur",
  computeAge: () => this.name.length * 10 * Math.random() >> 0,
})
  .isObject
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isObject.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Object]"
    );
    print("isObject", t1, t2);
  }).on(false, () => console.log("Something went wrong with isObject method!"));
const test = new validator(123);

const tests = {
  "value": test.value,
  "is string": test.isString.answer,
  "is number": test.isNumber.answer,
  "is object": test.isObject.answer,
  "is integer": test.isInteger.answer,
  "is negative integer": test.isNegativeInteger.answer,
  "is numeric array": test.isNumberArray.answer,
  "is number like": test.isNumberLike.answer,
  "is integer and is in range (0, 200) or is string":
    test.isInteger.And.is_in_range(0, 200).Or.isString.answer,
  "is object + And": test.isObjectArray.And.answer,
  "is positive (number)": test.isPositive.answer,
};
console.table(tests);
new validator(new Error()).isError.on(true, (v) => {
  const t1 = v.benchmark((err) => new validator(err).isError.answer);
  const t2 = v.benchmark((err) => err instanceof Error);
  print("isError", t1, t2);
}).on(false, () => console.log("Something went wrong with isError method!"));
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
new validator(matrix).isArrayOfNumberArraysWithEqualSize
  .And.bind(
    new validator(matrix1).isArrayOfNumberArraysWithEqualSize,
  ).on(true, (v) => {
    const t1 = v.benchmark((n) => {
      return new validator(n).isArrayOfNumberArraysWithEqualSize
        .And.bind(
          new validator(matrix1).isArrayOfNumberArraysWithEqualSize,
        ).answer;
    });
    const t2 = v.benchmark((n) => {
      return n instanceof Array && matrix1 instanceof Array
        ? n.every((row) => {
          return row.length === n[0].length &&
            row.every((el) => typeof el === "number");
        }) && matrix1.every((row) => {
          return row.length === matrix1[0].length &&
            row.every((el) => typeof el === "number");
        })
        : false;
    });
    print("bind", t1, t2);
  });
new validator(undefined).isEmpty.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isEmpty.answer);
  const t2 = v.benchmark((n) =>
    typeof (n === "undefined") || (n === "") ||
    (n instanceof Array ? n.length === 0 : false) ||
    (n instanceof Object ? Object.keys(n).length === 0 : false)
  );
  print("is empty", t1, t2);
});
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
