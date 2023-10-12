" use strict";
import * as errors from "./Errors/index.js";
import * as warnings from "./Warnings/index.js";
import * as models from "./Models/index.js";

/**
 * The `validator` class is a JavaScript library for conditional verification.
 * It allows you to create expressions and perform various tests on them.
 * Each validator instance has properties such as `answer`, `value`, and
 * description.
 */
class validator {
  static author = "Velislav S. Karastoychev";
  static version = "3.0.0";
  /**
   * @private {any} #value - field that stores the current parameter
   * of the validator instance.
   */
  #value = undefined;
  /**
   * @private {boolean} #not - Stores the current value of the not flag.
   */
  #not = null;
  /**
   * @private {string} #operand - Stores the current operand in the
   * validator queue.
   */
  #operand = null;
  /**
   * @private {boolean} #question - Stores the value of the question or
   * the truth of the last executed logical test from the validator.
   */
  #question = null;
  /**
   * @private {boolean} #answer - Stores the result of the logical operation.
   */
  #answer = null;
  /**
   * @private {boolean} #warnings - Stores the value of the show_warnings
   * setter value.
   */
  #warnings = false;
  /**
   * The constructor initializes a new `validator` instance with the given parameter.
   *
   * @param {any} parameter - A JavaScript valid variable or expression. The
   * type of the parameter can be any valid JavaScript expression or a type
   * defined in this language.
   */
  constructor(parameter) {
    this.value = parameter;
    this.description = "";
  }
  // In order to keep the code more clear and
  // to achieve logical and functional cohesion
  // and also according with the encapsulation
  // principle we will define getters and setters
  // for every state of the constructor.

  /**
   * Gets the current value property.
   *
   * @returns {any} The value property of the validator instance.
   */
  get value() {
    return this.#value;
  }

  /**
   * Sets the value property of the current validator instance.
   *
   * @param {any} parameter - The value to set for the validator instance.
   */
  set value(parameter) {
    try {
      this.#value = parameter;
    } catch (error) {
      this.value = error;
    }
  }

  /**
   * Resets internal state fields, including #not, #operand, and #question.
   */
  reset() {
    this.#not = null;
    this.#operand = null;
    this.#question = null;
  }

  /**
   * Gets the result from the validator's logical computations and reset
   * the operand and question states to null.
   * @returns {boolean} The result from the validator's logical computations.
   */
  get answer() {
    this.reset();
    return this.#answer;
  }

  /**
   * Gets the status of showing warning or error messages to the user.
   *
   * @returns {boolean} If true, warning messages will be printed to the console
   * when an inaccuracy is made by the user.
   */
  get show_warnings() {
    return this.#warnings;
  }

  /**
   * Sets the value of the status for error or warning printing in the console.
   *
   * @param {boolean} warnings - The status value to set.
   */
  set show_warnings(warnings) {
    new validator(warnings)
      .isBoolean
      .on(true, () => this.#warnings = warnings);
  }

  // In order to apply the functional cohesion
  // and DRY principles we insert here a method
  // which is private (according to the interface segregation
  // principle of the SOLID paradigm).The method
  // #set_answer() is crucial for the validator
  // library because in this method is implemented
  // the logical mechanism of the library.

  /**
   * @private Internal method for computing the result of logical operations.
   * This method is crucial for the validator library's logic.
   *
   * @returns {validator} The current validator instance, allowing method chaining.
   */
  #set_answer() {
    if (this.#not) {
      this.#question = !this.#question;
    }
    if (this.#operand === "or") {
      this.#answer = this.#answer || this.#question;
    }
    if (this.#operand === "and") {
      this.#answer = this.#answer && this.#question;
    }
    if (this.#operand === null) {
      this.#answer = this.#question;
    }
    this.reset();
    return this;
  }

  // In order to make logical decisions we need
  // some operators. According to the mathematical
  // logic to make a closed logical system, we need
  // to introduce (provide) at least three logical
  // operations - the negation (not), the conjunction
  // (and) and the disjunction (or). So we now implement
  // as getters the three logical operators
  // not, or and logical and. The not method sets the
  // #not field to true if is called and the other two
  // methods set the #operator field to "or" and "and.

  /**
   * Enables logical negation for the current validator instance.
   * When combined with other methods, it performs logical negation
   * of the result.
   *
   * @returns {validator} The current validator instance.
   */
  get not() {
    this.#not = true;
    return this;
  }

  /**
   * Sets the current validator instance to use logical AND (&&)
   * for subsequent validations.
   *
   * @returns {validator} The current validator instance.
   */
  get and() {
    this.#operand = "and";
    return this;
  }

  /**
   * Sets the current validator instance to use logical OR (||)
   * for subsequent validations.
   *
   * @returns {validator} The current validator instance.
   */
  get or() {
    this.#operand = "or";
    return this;
  }

  /**
   * Creates a new instance with the current value of the validator and
   * discards the obtained answer.
   *
   * @returns {validator} A new validator instance with an undefined answer.
   */
  copy() {
    return new validator(this.value);
  }

  /**
   * Creates a new instance of the current validator object and copies
   * the obtained answer and other properties.
   *
   * @returns {validator} A new validator instance with the same answer
   * and other properties as the current instance.
   */
  absoluteCopy() {
    let v = new validator(this.value);
    v.#answer = this.#answer;
    v.#not = this.#not;
    v.#operand = this.#operand;
    v.#question = this.#question;
    return v;
  }

  // test conditions for primary data types:

  /**
   * Checks if the value property of the current validator instance is a boolean.
   *
   * @returns {validator} The current validator instance.
   */
  get isBoolean() {
    this.#question = models.CheckType(this.value, "Boolean");
    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator instance is undefined.
   *
   * @returns {validator} The current validator instance.
   */
  get isUndefined() {
    this.#question = models.CheckType(this.value, "Undefined");
    return this.#set_answer();
  }
  /**
   * Checks if the value property of the current validator instance is null.
   *
   * @returns {validator} The updated current validator instance.
   */
  get isNull() {
    this.#question = models.CheckType(this.value, "Null");
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is a Symbol data type in JavaScript.
   *
   * @method isSymbol
   * @returns {validator} The updated current validator instance
   * with the "answer" property set to true if the "value" is a Symbol,
   * otherwise, sets the "answer" to false.
   */
  get isSymbol() {
    this.#question = models.CheckType(this.value, "Symbol");
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property is a BigInt data type.
   *
   * @method isBigInt
   * @returns {validator} The updated current validator instance
   * with the "answer" property set to true if the value is a BigInt,
   * otherwise set to false.
   */
  get isBigInt() {
    this.#question = models.CheckType(this.value, "BigInt");
    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator instance is a string.
   * @returns {validator} The updated current validator instance.
   */
  get isString() {
    this.#question = models.CheckType(this.value, "String");
    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator instance is a number.
   *
   * @returns {validator} The updated current validator instance.
   */
  get isNumber() {
    this.#question = models.CheckType(this.value, "Number");
    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator instance is an integer.
   *
   * @returns {validator} The updated current validator instance.
   */
  get isInteger() {
    this.#question = models.IsInteger(this.value);
    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator instance is a non-integer number (float).
   * @returns {validator} The updated current validator instance.
   */
  get isFloat() {
    this.#question = this.copy()
      .isNumber.and.not.isInteger
      .answer;
    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator
   * instance is convertible to a number.
   *
   * @returns {validator} The updated current validator instance.
   */
  get isConvertibleToNumber() {
    this.#question = models.IsNumberLike(this.value);
    return this.#set_answer();
  }

  /**
   * Checks if the value property of the
   * current validator instance is an integer
   * or a string that may be converted
   * to an integer.
   *
   * @returns {validator} The updated current validator instance.
   */
  get isConvertibleToInteger() {
    this.#question = models.IsIntegerLike(this.value);
    return this.#set_answer();
  }

  // We use an utility function named "TestCondtions",
  // which is nicely written and encapsulates
  // the comparison logic in a clean and reusable way.
  // This will indeed facilitate the reuse of the logic
  // in other methods, promoting consistency and reducing
  // redundancy. This function is modified to be used
  // in the isBigger/Lesser/Equals as well as in the
  // methods in the form hasLength.

  /**
   * Checks if the value property of the current validator
   * instance is greater than a given real number, 'a'.
   *
   * @method isGreaterThan
   * @param {number} a - A real number that must be
   * lesser or equal to the validator instance value property.
   * @returns {validator} A validator instance with the answer
   * property set to true or false based on the comparison.
   */
  isGreaterThan(a) {
    if (new validator(a).not.isNumber.answer) {
      errors.IncorrectArgumentInIsBiggerThan();
    }

    if (this.copy().isNumber.answer) {
      this.#question = models.TestCondition(this.value, undefined, a, "gt");
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator
   * instance is less than a given real number, 'a'.
   *
   * @method isLessThan
   * @param {number} a - A real number that must be
   * greater or equal to the validator instance value property.
   * @returns {validator} A validator instance with the answer
   * property set to true or false based on the comparison.
   */
  isLessThan(a) {
    if (new validator(a).not.isNumber.answer) {
      errors.IncorrectArgumentInIsLesserThan();
    }

    if (this.copy().isNumber.answer) {
      this.#question = models.TestCondition(this.value, undefined, a, "lt");
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * @method isGreaterThanOrEqual
   * @param {number} a a real number that
   * has to be smaller or equal to the value
   * property of the current validator instance
   * @returns {validator}
   * @description a method that checks if the value
   * property of the current validator instance is
   * greater or equals to a real number , say a and
   * sets the answer property of the returned validator
   * instance to true or false respectively.
   */
  isGreaterThanOrEqual(a) {
    if (new validator(a).not.isNumber.answer) {
      errors.IncorrectArgumentInIsEqualOrBiggerThan();
    }

    this.#question = models.TestCondition(this.value, undefined, a, "geq");

    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator
   * instance is less than or equal to a given real number, 'a'.
   *
   * @method isLessThanOrEqual
   * @param {number} a - A real number that has to be greater
   * or equal to the current value property of the validator instance.
   * @returns {validator} A validator instance with the answer
   * property set to true or false based on the comparison.
   */
  isLessThanOrEqual(a) {
    if (new validator(a).not.isNumber.answer) {
      errors.IncorrectArgumentInIsEqualOrLesserThan();
    }

    this.#question = models.TestCondition(this.value, undefined, a, "leq");

    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator
   * instance is a number which is equals to some real number
   * say "a".
   *
   * @method isEqual
   * @returns {validator} the updated validator instance
   * with the answer property set to true or false based
   * on the comparison.
   */
  isEqual(a) {
    if (new validator(a).not.isNumber.answer) {
      errors.IncorrectArgumentInIsEqual();
    }

    this.#question = models.TestCondition(this.value, undefined, a, "eq");

    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator instance
   * is not equal to some real number, "a".
   *
   * @method isNotEqual
   * @returns {validator} the updated validator instance with
   * the answer property set to true or false based on the comparison.
   */
  isNotEqual(a) {
    if (new validator(a).not.isNumber.answer) {
      errors.IncorrectArgumentInIsNotEqual();
    }

    this.#question = models.TestCondition(this.value, undefined, a, "neq");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is a number within the open interval (a, b).
   *
   * @method isInRange
   * @param {number} a - A real number that must be smaller than
   * the "value" property of the validator instance.
   * @param {number} b - A real number that must be greater than
   * the "value" property of the validator instance.
   * @returns {validator} The updated validator instance with the
   * "answer" property set to true if the "value" is in the specified
   * range, or false otherwise.
   * @throws {Error} If the provided arguments are not valid numbers,
   * or if 'a' is greater than or equal to 'b'.
   */
  isInRange(a, b) {
    if (new validator([a, b]).not.isNumberArray.answer) {
      errors.IncorrectArgumentsInIsInRange();
    }
    if (a >= b) errors.IncorrectArgumentsInIsInRange();
    this.#question = this.copy().isNumber.answer
      ? models.TestCondition(this.value, undefined, a, "gt") &&
        models.TestCondition(this.value, undefined, b, "lt")
      : false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property is in the closed range [a, b].
   *
   * @method isInClosedRange
   * @param {number} a - A real number that must be smaller than or equal to
   * the "value" property of the validator instance.
   * @param {number} b - A real number that must be greater or equal to
   * the "value" property of the validator instance.
   * @returns {validator} The updated validator instance with the "answer"
   * property set to true if the "value" is in the closed range [a, b], or false
   * otherwise.
   * @throws {Error} If the provided arguments are not valid numbers, or if 'a'
   * is greater than 'b'.
   */
  isInClosedRange(a, b) {
    if (new validator([a, b]).not.isNumberArray.answer) {
      errors.IncorrectArgumentsInIsInClosedRange();
    }
    if (a >= b) errors.IncorrectArgumentsInIsInClosedRange();

    this.#question = this.copy().isNumber.answer
      ? models.TestCondition(this.value, undefined, a, "geq") &&
        models.TestCondition(this.value, undefined, b, "leq")
      : false;

    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current
   * validator instance is a positive number.
   *
   * @method isPositive
   * @returns {validator} The updated validator
   * instance with the answer property set to
   * true or false based on the comparison with zero.
   */
  get isPositive() {
    if (this.copy().not.isNumber.answer) {
      if (this.show_warnings) warnings.IncorrectValueInIsPositive();
    }

    this.#question = models.TestCondition(this.value, undefined, 0, "geq");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property is a number, which is
   * lesser than zero (negative number).
   *
   * @method isNegative
   * @returns {validator} the updated validator instance
   * with the "answer" property to be true or false based
   * on the comparision with 0.
   */
  get isNegative() {
    if (this.copy().not.isNumber.answer) {
      if (this.show_warnings) warnings.IncorrectValueInIsNegative();
      this.#question = false;
    } else {
      this.#question = models.TestCondition(this.value, undefined, 0, "lt");
    }

    return this.#set_answer();
  }
  /**
   * Checks if the "value" property is a positive integer.
   *
   * @method isPositiveInteger
   * @returns {validator} the updated validator instance
   * with the "answer" property to be true or false based
   * on the comparison with 0.
   */
  get isPositiveInteger() {
    if (this.copy().isInteger.answer) {
      this.#question = models.TestCondition(this.value, undefined, 0, "geq");
    } else this.#question = false;

    return this.#set_answer();
  }
  /**
   * Checks if the "value" property is integer, which is less than zero.
   *
   * @method isNegativeInteger
   * @returns {validator} the updated validator instance with the
   * "answer" property to be set to true or false based on the
   * comparison with 0.
   */
  get isNegativeInteger() {
    if (this.copy().isInteger.answer) {
      this.#question = models.TestCondition(this.value, undefined, 0, "lt");
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property is a positive number
   * or if it is a string which may be converted to a positive
   * number.
   *
   * @method isConvertibleToPositiveNumber
   * @returns {validator} the updated validator instance with
   * "answer" property set to true or false based on whether
   * the "value" property is a positive number or if it is a
   * string which may be converted to a positive number.
   */
  get isConvertibleToPositiveNumber() {
    this.#question = models.IsPositiveNumberLike(this.value);

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property is a negative number or
   * a string which may be converted to a negative number.
   *
   * @method isConvertibleToNegativeNumber
   * @returns {validator} the updated validator instance with
   * "answer" property set to true or false based on whether
   * the "value" property is a negative number or a string
   * which may be converted to a negative number.
   */
  get isConvertibleToNegativeNumber() {
    this.#question = models.IsNegativeNumberLike(this.value);

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property is a positive
   * integer or a string which may be converted to
   * a positive integer.
   *
   * @method isConvertibleToPositiveInteger
   * @returns {validator} the updated validator instance with
   * "answer" property set to true or false based on the
   * whether the "value" is positive integer or a string,
   * which may be converted to positive integer.
   */
  get isConvertibleToPositiveInteger() {
    this.#question = models.IsPositiveIntegerLike(this.value);

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the validator instance
   * is a negative integer or a string which may be converted
   * to negative integer.
   *
   * @method isConvertedToNegativeInteger
   * @returns {validator} the updated validator instance with
   * "answer" property set to true or false based on whether
   * the "value" is negative integer or a string which may be
   * converted to negative integer.
   */
  get isConvertibleToNegativeInteger() {
    this.#question = models.IsNegativeIntegerLike(this.value);

    return this.#set_answer();
  }

  /**
   * Checks if the "value" of the current validator instance
   * is a primitive data type.
   *
   * @method isPrimitiveType
   * @returns {validator} The updated current validator instance.
   * The "answer" property is set to true if the "value" is a primitive
   * type (string, number, bigInt, symbol, boolean, undefined, or null),
   * otherwise, it is set to false.
   */
  get isPrimitiveType() {
    this.#question = this.copy().isString
      .or.isNumber
      .or.isBigInt
      .or.isBoolean
      .or.isUndefined
      .or.isNull
      .or.isSymbol.answer;

    return this.#set_answer();
  }

  // Implementation of methods which tests the type of
  // reference data types in JavaScript.
  // First we will implement the methods of the family
  // "isArrayBuffer" which deals with buffers
  // and typed arrays.
  // Then we will implement the methods which are
  // related to the "isArray" family.
  // Finally we will implement the so called Object
  // methods (isObject, isFunction, isPromise etc)
  // as well as the utility methods (isSame, throwsErrorWith,
  // executeWith etc).

  /**
   * Checks if the "value" property of the current validator
   * instance is an ArrayBuffer data type in JavaScript.
   *
   * @returns {validator} The updated validator instance with
   * the "answer" property set to true or false based on the
   * type of the "value" property.
   */
  get isArrayBuffer() {
    this.#question = models.CheckType(this.value, "ArrayBuffer");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current
   * validator instance is an Int8Array in JavaScript.
   *
   * Note: This method does not ensure that all elements
   * of the "array" are not NaN.
   *
   * @returns {validator} The updated validator instance with
   * the "answer" property set to true if the type is Int8Array,
   * false otherwise.
   */
  get isInt8Array() {
    this.#question = models.CheckType(this.value, "Int8Array");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a Uint8Array in JavaScript.
   *
   * Note: This method
   * does not ensure that all elements of the "array" are not NaN.
   *
   * @returns {validator} the updated validator instance with
   * the "answer" property set to true if the type is Uint8Array,
   * false otherwise.
   */
  get isUint8Array() {
    this.#question = models.CheckType(this.value, "Uint8Array");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a Uint8CLampedArray in JavaScript.
   *
   * Note: This method
   * does not ensure that all elements of the "array" are not NaN.
   *
   * @returns {validator} the updated current validator instance with
   * the "answer" property set to true if the type is Uint8ClampedArray,
   * false otherwise.
   */
  get isUint8ClampedArray() {
    this.#question = models.CheckType(this.value, "Uint8ClampedArray");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is Int16Array in JavaScript.
   *
   * Note: This method does not ensure that all the elements of
   * the "array" are not NaN.
   *
   * @returns {validator} The updated current validator instance
   * with the "answer" property set to true if the "value" is Int16Array,
   * false otherwise.
   */
  get isInt16Array() {
    this.#question = models.CheckType(this.value, "Int16Array");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is Uint16Array in JavaScript.
   *
   * Note: This method does not ensure that all elements of the
   * "array" are not NaN.
   *
   * @returns {validator} The updated current validator instance
   * with the "answer" property set to true if the type is Uint16Array,
   * false otherwise.
   */
  get isUint16Array() {
    this.#question = models.CheckType(this.value, "Uint16Array");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is Int32Array in JavaScript.
   *
   * Note: This method does not ensure that all the elements of
   * the "array" are not NaN.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is Int32Array,
   * false otherwise.
   */
  get isInt32Array() {
    this.#question = models.CheckType(this.value, "Int32Array");

    return this.#set_answer();
  }

  /**
   * Implements the is_error() method or as getter isError.
   * If the current "value" property is of Error type and this error is not thrown,
   * then the method sets the answer property to true accounting the other constraints.
   * @returns {validator} the updated validator property.
   */
  get isError() {
    this.#question = models.CheckType(this.value, "Error");
    return this.#set_answer();
  }
  /**
   * Implements the throwsError method.
   * If the "value" property of the current validator
   * instance is function, then the method executes the
   * function with arguments the inserted parameters in the
   * method. It is good practice to use the copy method before
   * this method.
   * @param {...any} params
   * @returns {validator} the current validator with "value" property
   * which is equals to the result of the previous "value" property.
   */
  throws_error_with(...params) {
    let value = null;
    try {
      value = this.copy().execute_with(...params).value;
    } catch (error) {
      value = error;
    }
    this.#question = models.IsError(value);
    return this.#set_answer();
  }
  /**
   * This method sets the current validator value
   * property to the result of the execution of the
   * current "value" property if it is a function.
   * If the current "value" property is asynchronous
   * function, then the it will be changed to the executeion
   * of this async function and will return promise.
   * If the "value" is neither function or async function,
   * then returns the current "value" property
   * without any changes. If the show_warnings property
   * is set to true for this instance, then when the "value"
   * is not function or asyncchronous function, the
   * method  prints a warning message.
   * @param {...any} params
   * @returns {validator}
   */
  execute_with(...params) {
    if (this.copy().isFunction.answer) {
      try {
        this.#value = this.copy().value(...params);
      } catch (error) {
        this.#value = error;
      }
    } else if (this.copy().isAsync.answer) {
      let response = null;
      const obtainResponse = async () => {
        try {
          response = await this.copy().value(...params);
        } catch (error) {
          response = error;
        }
        return response;
      };
      this.#value = obtainResponse();
    } else if (this.show_warnings) {
      warnings.IncorrectTypeInExecuteWith();
    }
    return this;
  }

  /**
   * Checks if the current validator value is instanceof
   * the "instance" parameter.
   * @param {InstanceType} instance
   * @returns {validator}
   */
  is_instanceof(instance) {
    if (models.IsInstanceType(instance)) {
      this.#question = models.IsInstanceof(this.value, instance);
    } else errors.IncorrectArgumentInIsInstanceof();
    return this.#set_answer();
  }

  /**
   * @method isArray
   * @returns {validator}
   * @description a method that checks if
   * the value of the current validator instance
   * is of array type and sets the answer property
   * of the returned validator instance to true or
   * false respectively.
   */
  get isArray() {
    this.#question = models.CheckType(this.value, "Array");

    return this.#set_answer();
  }
  get isTypedArray() {
    this.#question = models.IsTypedArray(this.value);
    return this.#set_answer();
  }
  is_typed_array() {
    return this.isTypedArray;
  }
  /**
   * @description this method tests if the
   * current validator instance is an array
   * of boolean elements.
   * @returns {validator}
   */
  is_boolean_array() {
    return this.isBooleanArray;
  }
  /**
   * @description this method tests if the
   * current validator instance is an array
   * of boolean elements.
   * @returns {validator}
   */
  get isBooleanArray() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsBooleanArray(this.value, this.#question);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method is_string_array()
   * @returns {validator}
   * @description a method that checks if the
   * value property of the current validator
   * instance is an array, all elements of which
   * are strings and set the answer property of the
   * returned validator instance to true or false
   * respectively.
   */
  is_string_array() {
    return this.isStringArray;
  }
  /**
   * @method isStringArray
   * @returns {validator}
   * @description this method is the getter variant of the
   * is_string_array() kkkmethod of the validator library.
   * Note that this method is faster than the equivalent
   * is_string_array() normal method. In this case we do not
   * recall the corresponded method but implement an other
   * approach.
   */
  get isStringArray() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsStringArray(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }

  /**
   * @method is_number_array()
   * @returns {validator}
   * @description a method that checks if
   * the value property of the current
   * validator instance is an array, all
   * elements of which are arbitrary numbers
   * and sets the answer property of the returned
   * validator instance to true or false respectively.
   */
  is_number_array() {
    return this.isNumberArray;
  }
  /**
   * @method isNumberArray
   * @returns {validator}
   * @description this is a getter variant of the
   * method is_number_array of the validator library.
   * Note that this method is faster than the conventional method,
   * because we use different approach.
   */
  get isNumberArray() {
    const cp = this.copy();
    if (cp.isArray.answer) {
      this.#question = models.IsNumberArray(this.value);
    } else if (cp.isTypedArray.answer) {
      this.#question = !models.HasNaNInTypedArray(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }

  /**
   * This method sets the "answer" property of the current validator instance to true if the "value" property is Uint32Array instance. The method does ensures that every element of the typed array is not NaN.
   * @returns {validator} the updated current validator instance.
   */
  get isUint32Array() {
    this.#question = models.IsUint32Array(this.value);
    return this.#set_answer();
  }
  
  /**
   * This method sets the current "answer" property to true if the "value" property is instance of the [U]Int[8,16, 32]Array or Uint8clampedArray. Note that it is possible some of the elements of the typed array to be NaN, so if you want to test if the array is correct integer array use isIntegerArray method.
   * @returns {validator} the current validator property with updated "answer" property.
   */
  get isIntegerTypedArray() {
    this.#question = this.copy()
      .isInt8Array
      .or.isUint8Array
      .or.isUint8ClampedArray
      .or.isInt16Array
      .or.isUint16Array
      .or.isInt32Array
      .or.isUint32Array.answer;
    return this.#set_answer();
  }
  /**
   * This method sets the current "answer" property to true if the "value" property is instance of the [U]Int[8,16, 32]Array or Uint8clampedArray. Note that it is possible some of the elements of the typed array to be NaN, so if you want to test if the array is correct integer array use isIntegerArray method.
   * @returns {validator} the current validator property with updated "answer" property.
   */
  is_integer_typed_array() {
    return this.isIntegerTypedArray;
  }
  /**
   * This method sets the "answer" property of the current validator instance to true if the "value" property is Float32Array. The method does not ensures that every element of the typed array is not NaN.
   * @returns {validator} the updated current validator instance.
   */
  get isFloat32Array() {
    this.#question = models.IsFloat32Array(this.value);
    return this.#set_answer();
  }
  /**
   * This method sets the "answer" property of the current validator instance to true if the "value" property is Float32Array. The method does not ensures that every element of the typed array is not NaN.
   * @returns {validator} the updated current validator instance.
   */
  is_float_32_array() {
    return this.isFloat32Array;
  }
  /**
   * This method sets the "answer" property of the current validator instance to true if the "value" is an Float64Array instance, otherwise sets the "answer" to false. The method does not ensures that every element of the typed array is nto NaN
   * @returns {validator} the updated current validator instance.
   */
  get isFloat64Array() {
    this.#question = models.IsFloat64Array(this.value);
    return this.#set_answer();
  }
  /**
   * This method sets the "answer" property of the current validator instance to true if the "value" is an Float64Array instance, otherwise sets the "answer" to false. The method does not ensures that every element of the typed array is nto NaN
   * @returns {validator} the updated current validator instance.
   */
  is_float64_array() {
    return this.isFloat64Array;
  }
  /**
   * This method sets the "answer" property of the current validator instance to true if the "value" property is Float32Array or Float64Array instance. The method does not ensures that every element of the typed array is not NaN.
   * @returns {validator} the updated current validator instance.
   */
  get isFloatTypedArray() {
    this.#question = this.copy().isFloat32Array.or.isFloat64Array.answer;
    return this.#set_answer();
  }
  /**
   * This method sets the "answer" property of the current validator instance to true if the "value" property is Float32Array or Float64Array instance. The method does not ensures that every element of the typed array is not NaN.
   * @returns {validator} the updated current validator instance.
   */
  is_float_typed_array() {
    return this.isFloatTypedArray;
  }
  /**
   * @method is_integer_array
   * @returns {validator}
   * @description this method tests if the
   * value property of the current validator
   * instance is array of which each element
   * is integer number.
   */
  is_integer_array() {
    return this.isIntegerArray;
  }
  /**
   * @method isIntegerArray
   * @returns {validator}
   * @description this method tests if the value
   * property of the current validator instance is
   * array each element of which is integer.
   */
  get isIntegerArray() {
    const copy = this.copy();
    if (copy.isArray.answer) {
      this.#question = models.IsIntegerArray(this.value);
    } else if (copy.isIntegerTypedArray.answer) {
      this.#question = !models.HasNaNInTypedArray(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method is_array_of_positive_integers
   * @description this method tests if the
   * value property of the current validator
   * instance is array of positive integers.
   * @returns {validator}
   */
  is_array_of_positive_integers() {
    return this.isArrayOfPositiveIntegers;
  }
  /**
   * @method isArrayOfPositiveIntegers
   * @description this method tests if
   * the value property of the current
   * validator instance is an array of
   * positive integers.
   * @returns {validator}
   */
  get isArrayOfPositiveIntegers() {
    const cp = this.copy();
    if (cp.isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfPositiveIntegers(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method is_array_of_negative_integers
   * @description this method tests if the
   * value property of the current validator
   * instance is an array of negative integers.
   * @returns {validator}
   */
  is_array_of_negative_integers() {
    return this.isArrayOfNegativeIntegers;
  }
  /**
   * @method isArrayOfNegativeIntegers
   * @description this method tests if the value
   * property of the current validator instance
   * is an array of negative integers.
   * @returns {validator}
   */
  get isArrayOfNegativeIntegers() {
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfNegativeIntegers(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method is_array_of_positive_numbers
   * @description this method tests if the
   * value property of the current validator
   * instance is an array of positive numbers.
   * @returns {validator}
   */
  is_array_of_positive_numbers() {
    return this.isArrayOfPositiveNumbers;
  }
  /**
   * @method isArrayOfPositiveNumbers
   * @description this method tests if the
   * value property of the current validator
   * instance is an array of positive numbers.
   * @returns {validator}
   */
  get isArrayOfPositiveNumbers() {
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfPositiveNumbers(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method is_array_of_negative_numbers
   * @description this method tests if
   * the value property of the current
   * validator instance is an array of
   * negative numbers.
   * @returns {validator}
   */
  is_array_of_negative_numbers() {
    return this.isArrayOfNegativeNumbers;
  }
  /**
   * @method isArrayOfNegativeNumbers
   * @description this method tests if the
   * value property of the current validator
   * instance is an array of negative numbers.
   * @returns {validator}
   */
  get isArrayOfNegativeNumbers() {
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfNegativeNumbers(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {validator}
   * @description this method checks if the validator
   * value is an array which element of which is an
   * integer in the open interval (a, b).
   */
  is_array_of_integers_in_range(a, b) {
    new validator([a, b]).isIntegerArray
      .and.bind(
        new validator(a).is_lesser_than(b),
      ).on(false, () => errors.IllegalParametersInIsArrayOfIntegersInRange());
    if (this.copy().not.isArray.and.not.isTypedArray.answer) {
      this.#question = false;
    } else this.#question = models.IsArrayOfIntegersInRange(this.value, a, b);
    return this.#set_answer();
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {validator}
   * @description this method checks if the
   * current validator instance is an array of
   * integer elements which lies on the closed
   * interval [a, b], where the a and b are
   * arbitrary NUMBER$S.
   */
  is_array_of_integers_in_closed_range(a, b) {
    new validator([a, b]).isNumberArray
      .and.bind(
        new validator(a).is_lesser_than(b),
      ).on(
        false,
        () => errors.IllegalParametersInIsArrayOfIntegersInClosedRange(),
      );
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfIntegersInClosedRange(this.value, a, b);
    } else this.#question = true;
    return this.#set_answer();
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {validator}
   * @description this method checks if the
   * current validator instance is an array with elements
   * which are numbers in an open interval (a, b).
   */
  is_array_of_numbers_in_range(a, b) {
    new validator([a, b]).isNumberArray
      .and.bind(
        new validator(a).is_lesser_than(b),
      ).on(false, () => errors.IllegalParametersInIsArrayOfNumbersInRange());
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfNumbersInRange(this.value, a, b);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {validator}
   * @description this method checks if
   * the current validator instance is an
   * array of numbers which lies on the closed
   * interval [a, b].
   */
  is_array_of_numbers_in_closed_range(a, b) {
    new validator([a, b]).isNumberArray
      .and.bind(
        new validator(a).is_lesser_than(b),
      ).on(
        false,
        () => errors.IllegalParametersInIsArrayOfNumbersInClosedRange(),
      );
    // check if every element of the array is number in the interval [a, b].
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfNumbersInClosedRange(this.value, a, b);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @description this method checks if the
   * current validator instance is an array
   * with elements that satisfy the condition
   * to be a javascript function type.
   * @returns {validator}
   */
  is_array_of_functions() {
    return this.isArrayOfFunctions;
  }
  /**
   * @description this method checks if the
   * current validator instance is an array
   * with elements that satisfy the condition
   * to be a javascript function type.
   * @returns {validator}
   */
  get isArrayOfFunctions() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfFunctions(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method is_object_array
   * @returns {validator}
   * @description this method tests
   * if the value property of the current
   * validator instance is array each element
   * of which is object.
   */
  is_object_array() {
    return this.isObjectArray;
  }
  /**
   * @method isObjectArray
   * @returns {validator}
   * @description this method tests if
   * the value property of the current
   * validator instance is array, each element
   * of which is object.
   */
  get isObjectArray() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsObjectArray(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @description this method checks if the
   * current validator instance is an array
   * with elements which are arrays with equal
   * size (length). The elements of the nested
   * arrays may be of arbitrary type.
   * @returns {validator}
   */
  is_array_of_arrays_with_equal_size() {
    return this.isArrayOfArraysWithEqualSize;
  }
  /**
   * @description this method checks if the
   * current validator instance is an array
   * with elements which are arrays with equal
   * size (length). The elements of the nested
   * arrays may be of arbitrary type.
   * @returns {validator}
   */
  get isArrayOfArraysWithEqualSize() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfArraysWithEqualSize(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @description this method checks if the
   * current validator instance value is an
   * array, which contains only number arrays.
   * The length of every array is not interested.
   * @returns {validator}
   */
  is_array_of_number_arrays() {
    return this.isArrayOfNumberArrays;
  }
  /**
   * @description this method checks if the current
   * validator instance is an array which consists
   * of number arrays.
   * @returns {validator}
   */
  get isArrayOfNumberArrays() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfNumberArrays(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  is_array_of_number_arrays_with_equal_size() {
    return this.isArrayOfNumberArraysWithEqualSize;
  }
  get isArrayOfNumberArraysWithEqualSize() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfNumberArraysWithEqualSize(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @description this method checks if the
   * current validator instance is an array
   * in which every element is array of integers.
   * @returns {validator}
   */
  is_array_of_integer_arrays() {
    return this.isArrayOfIntegerArrays;
  }
  get isArrayOfIntegerArrays() {
    if (this.copy().isArray.answer) {
      /*   */ this.#question = models.IsArrayOfIntegerArrays(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * This getter method checks if the current validator
   * property is integer matrix.
   *
   * @returns {validator} if the current value property
   * is an array of integer arrays with equal size or
   * integer matrix, then the current validator answer
   * property will be set to true, otherwese, the
   * answer property will be set to false.
   */

  is_array_of_integer_arrays_with_equal_size() {
    return this.isArrayOfIntegerArraysWithEqualSize;
  }
  /**
   * This getter method checks if the current validator
   * property is integer matrix.
   *
   * @returns {validator} if the current value property
   * is an array of integer arrays with equal size or
   * integer matrix, then the current validator answer
   * property will be set to true, otherwese, the
   * answer property will be set to false.
   */
  get isArrayOfIntegerArraysWithEqualSize() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfIntegerArraysWithEqualSize(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  is_array_of_string_arrays() {
    return this.isArrayOfStringArrays;
  }
  get isArrayOfStringArrays() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfStringArrays(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @description this method checks if the current
   * validator instance is an array contained from
   * string arrays with every array to has the same
   * length with the other arrays.
   * @returns {validator}
   */
  is_array_of_string_arrays_with_equal_size() {
    return this.isArrayOfStringArraysWithEqualSize;
  }
  get isArrayOfStringArraysWithEqualSize() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfStringArraysWithEqualSize(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * This method tests if the
   * "value" property of the current validator
   * instance is an object and sets the "answer"
   * property of the returned validator instance to
   * true or false respectively.
   * @method is_object()
   * @returns {validator} the updated current validator instance.
   */
  is_object() {
    return this.isObject;
  }
  /**
   * This method tests if the
   * "value" property of the current validator
   * instance is an object and sets the "answer"
   * property of the returned validator instance to
   * true or false respectively.
   * @returns {validator} the updated current validator instance.
   */
  get isObject() {
    this.#question = models.CheckType(this.value, "Object");
    return this.#set_answer();
  }
  /**
   * @method is_empty()
   * @returns {validator}
   * @description this method checks if the value
   * property of the current validator instance is
   * an empty object or an empty array or a empty
   * string or is an undefined type.
   */
  is_empty() {
    return this.isEmpty;
  }
  /**
   * @method is_empty()
   * @returns {validator}
   * @description this method checks if the value
   * property of the current validator instance is
   * an empty object or an empty array or a empty
   * string or is an undefined type.
   */
  get isEmpty() {
    const test = this.copy();
    if (test.isUndefined.answer) {
      this.#question = true;
    } else {
      if (
        test
          .isArray
          .or.isArrayBuffer
          .or.isMap
          .or.isObject
          .or.isSet
          .or.isString
          .or.isTypedArray
      ) this.#question = test.has_length(0).answer;
      else errors.IncorrectArgumentInIsEmpty();
    }
    return this.#set_answer();
  }
  /**
   * @method for_all
   * @param {function(validator, number | string)} callback
   * @description This method can
   * be active if and only if the
   * this.value is of type arraiiiiiiiiiiiiiiiiiiiiiiikkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjy
   * or object. The callback is a
   * function with argument that is
   * of validator type (instance).
   * @example
   * let a = new validator([12, 32, 998.3, 89, 0.9839])
   *     .for_all(elements => {
   *         return elements.is_float()
   *     })
   * console.log(a.answer) // true
   */
  for_all(callback) {
    // initialization
    const val = this.copy();
    const callback_val = new validator(callback);
    if (callback_val.not.isFunction.answer) {
      errors.IncorrectFunctionArgumentInForAll();
    }
    if (val.isArray.and.not.isEmpty.answer) {
      this.#question = models.ForAllArrayEdition(val.value, callback);
    } else if (val.isObject.and.not.isEmpty) {
      this.#question = models.ForAllObjectEdition(val.value, callback);
    } else if (val.isSet.and.not.isEmpty.answer) {
      this.#question = models.ForAllSetEdition(val.value, callback);
    } else if (val.isMap.and.not.isEmpty.answer) {
      this.#question = models.ForAllMapEdition(this.value, callback);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method for_any
   * @param {function(validator, number | string)} callback
   * @description this method is
   * valid for array and object
   * and compute if some item of the
   * this.value satisfy the condition
   * defined in the callback function.
   * The callback function gets as
   * argument an validator type and
   * have to return a validator value.
   * @returns {validator}
   * @example
   * let a = new validator([1, 2, ,3, 4, 5])
   *     .for_any((element) => {
   *         return element.is_undefined()
   *     })
   * console.log(a.answer) // true
   */
  for_any(callback) {
    const val = this.copy();
    const callbackIsNotFunction = new validator(callback).not.isFunction.answer;
    if (callbackIsNotFunction) {
      errors.IncorrectFunctionArgumentInForAny();
    }
    if (val.isArray.or.isTypedArray.answer) {
      this.#question = models.ForAnyArrayEdition(val.value, callback);
    } else if (val.isObject.and.not.isEmpty.answer) {
      this.#question = models.ForAnyObjectEdition(val.value, callback);
    } else if (val.isSet.and.not.isEmpty.answer) {
      this.#question = models.ForAnySetEdition(this.value, callback);
    } else if (val.isMap.and.not.isEmpty.answer) {
      this.#question = models.ForAnyMapEdition(this.value, callback);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method has_length
   * @param {number} n an integer number that
   * describes the length of the array/string/Object
   * @returns {validator}
   * @description a method that checks if the
   * value property of the current validator instance
   * is String or Array or Object javascript type that
   * has length n and sets the answer property of the
   * returned validator instance to true or false respectively.
   */
  has_length(n) {
    if (Number.isInteger(n)) n = Number(n);
    else errors.IncorrectArgumentInHasLength();
    let cp_instance = this.copy();
    if (cp_instance.isArray.or.isTypedArray.or.isString.answer) {
      this.#question = models.TestCondition(this.value, "length", n);
    } else if (cp_instance.isObject.answer) {
      this.#question = models.TestCondition(
        Object.keys(cp_instance.value),
        "length",
        n,
      );
    } else if (cp_instance.isArrayBuffer.answer) {
      this.#question = models.TestCondition(this.value, "byteLength", n);
    } else if (cp_instance.isMap.or.isSet.answer) {
      this.#question = models.TestCondition(this.value, "size", n);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method has_length_bigger_than
   * @param {number} n
   * @returns {validator}
   * @description this method tests if a string or an array
   * has length which is bigger than the integer number n.
   * If the n is not integer, then the method will throw an
   * error for incorrect argument.
   */
  has_length_bigger_than(n) {
    if (Number.isInteger(n)) n = Number(n);
    else errors.IncorrectArgumentInHasLengthBiggerThan(n);
    let cp_instance = this.copy();
    if (cp_instance.isArrayBuffer.answer) {
      this.#question = models.TestCondition(this.value, "byteLength", n, "gt");
    } else if (cp_instance.isArray.or.isTypedArray.isString.answer) {
      this.#question = models.TestCondition(this.value, "length", n, "gt");
    } else if (cp_instance.isObject.answer) {
      this.#question = models.TestCondition(
        Object.keys(cp_instance.value),
        "length",
        n,
        "gt",
      );
    } else if (cp_instance.isSet.or.isMap.answer) {
      this.#question = models.TestCondition(this.value, "size", n, "gt");
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method has_length_equals_or_bigger_than
   * @param {number} n
   * @returns {validator}
   * @description this method tests if a string
   * or an array has length which is equals or
   * bigger than the integer number n. If the n
   * is not integer, then an error message for
   * incorrect argument will be thrown.
   */
  has_length_equals_or_bigger_than(n) {
    if (Number.isInteger(n)) n = Number(n);
    else errors.IncorrectArgumentInHasLengthEqualsOrBiggerThan(n);
    let cp_instance = this.copy();
    if (cp_instance.isArrayBuffer.answer) {
      this.#question = models.TestCondition(this.value, "byteLength", n, "geq");
    } else if (cp_instance.isArray.or.isTypedArray.or.isString.answer) {
      this.#question = models.TestCondition(this.value, "length", n, "geq");
    } else if (cp_instance.isObject.answer) {
      this.#question = models.TestCondition(
        Object.keys(cp_instance.value),
        "length",
        n,
        "geq",
      );
    } else if (cp_instance.isSet.or.isMap.answer) {
      this.#question = models.TestCondition(this.value, "size", n, "geq");
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method has_length_lesser_than
   * @param {number} n
   * @returns {validator}
   * @description this method tests if a string or
   * an array has length which is smaller than an
   * integer number n. If n is not integer, then
   * an error message will be thrown for incorrect
   * argument.
   */
  has_length_lesser_than(n) {
    if (Number.isInteger(n)) n = Number(n);
    else errors.IncorrectArgumentInHasLengthLesserThan();
    let cp_instance = this.copy();
    if (cp_instance.isArray.or.isString.answer) {
      this.#question = this.value.length < n;
    } else if (cp_instance.isObject.answer) {
      this.#question = Object.keys(cp_instance.value).length < n;
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method has_length_equals_or_lesser_than
   * @param {number} n
   * @returns {validator}
   * @description this method tests if the current value
   * of the validator instance is string or array with
   * length which is equals or lesser than n. If n is
   * not integer, then an error message will be thrown.
   */
  has_length_equals_or_lesser_than(n) {
    if (Number.isInteger(n)) n = Number(n);
    else errors.IncorrectArgumentInHasLengthEqualsOrLesserThan();
    let cp_instance = this.copy();
    if (cp_instance.isArray.or.isString.answer) {
      this.#question = this.value.length <= n;
    } else if (cp_instance.isObject.answer) {
      this.#question = Object.keys(cp_instance.value).length <= n;
    } else this.#question = false;
    return this.#set_answer();
  }
  has_length_in_range(a, b) {
    if (Number.isInteger(a) && Number.isInteger(b)) {
      a = Number(a);
      b = Number(b);
      if (a >= b) errors.IncorrectArgumentsInHasLengthInRange();
    } else errors.IncorrectArgumentsInHasLengthInRange();
    let cp_instance = this.copy();
    if (cp_instance.isArray.or.isString.answer) {
      this.#question = this.value.length > a && this.value.length < b;
    } else if (cp_instance.isObject.answer) {
      const len = Object.keys(cp_instance.value).length;
      this.#question = len > a && len < b;
    } else this.#question = false;
    return this.#set_answer();
  }
  has_length_in_closed_range(a, b) {
    if (Number.isInteger(a) && Number.isInteger(b)) {
      a = Number(a);
      b = Number(b);
      if (a >= b) errors.IncorrectArgumentsInHasLengthInClosedRange();
    } else errors.IncorrectArgumentsInHasLengthInClosedRange();
    let cp_instance = this.copy();
    if (cp_instance.isArray.or.isString.answer) {
      this.#question = this.value.length >= a && this.value.length <= b;
    } else if (cp_instance.isObject.answer) {
      const len = Object.keys(cp_instance.value).length;
      this.#question = len >= a && len <= b;
    } else this.#question = false;
    return this.#set_answer();
  }

  /**
   * A method that checks if
   * the value property of the current validator
   * instance is a javascript function object and
   * sets the answer property of the returned validator
   * instance to true or false respectively.
   * @method is_function()
   * @returns {validator} the updated validator property.
   */
  is_function() {
    return this.isFunction;
  }
  /**
   * A method that checks if
   * the value property of the current validator
   * instance is a javascript function object and
   * sets the answer property of the returned validator
   * instance to true or false respectively.
   * @returns {validator} the updated validator property.
   */
  get isFunction() {
    this.#question = models.CheckType(this.value, "Function");
    return this.#set_answer();
  }
  /**
   * This method sets the "answer" property of the current validator instance
   * to true if the "value" property is asyncronous function otherwise set it to false..
   * @returns {validator} the updated current validator instance.
   */
  get isAsync() {
    this.#question = models.CheckType(this.value, "AsyncFunction");
    return this.#set_answer();
  }
  /**
   * This method sets the "answer" property of the current validator instance
   * to true if the "value" property is asyncronous function otherwise set it to false..
   * @returns {validator} the updated current validator instance.
   */
  is_async() {
    return this.isAsync;
  }
  /**
   * This method sets the "answer" property to true if the "value" property
   * is GeneratorFunction or Generator object, otherwise sets it to false.
   * @returns {validator} the updated current validator instance.
   */
  get isGenerator() {
    this.#question = models.CheckType(this.value, "GeneratorFunction") ||
      models.CheckType(this.value, "Generator");
    return this.#set_answer();
  }
  /**
   * This method sets the "answer" property to true if the "value" property
   * is GeneratorFunction or Generator object, otherwise sets it to false.
   * @returns {validator} the updated current validator instance.
   */
  is_generator() {
    return this.isGeneratorFunction;
  }
  /**
   * This method tests if the "value" property of the current validator instance
   * is Promise type and sets the "answer" property to true or false respectively.
   * Note that if the "value" property is an async function then the method will set
   * the "answer" to false. To check if the function is asynchronous you have to use
   * the isAsync method.
   * @returns {validator} the updated current validator instance.
   */
  get isPromise() {
    this.#question = models.CheckType(this.value, "Promise");
    return this.#set_answer();
  }
  /**
   * This method tests if the "value" property of the current validator instance
   * is Promise type and sets the "answer" property to true or false respectively.
   * Note that if the "value" property is an async function then the method will set
   * the "answer" to false. To check if the function is asynchronous you have to use
   * the isAsync method.
   * @returns {validator} the updated current validator instance.
   */
  is_promise() {
    return this.isPromise;
  }
  /**
   * This method sets the "answer" property of the current validator
   * instance to true if the "value" property is a Map instance,
   * otherwise sets the "answer" to false.
   * @returns {validator} the updated current validator instance.
   */
  get isMap() {
    this.#question = models.CheckType(this.value, "Map");
    return this.#set_answer();
  }
  /**
   * This method sets the "answer" property of the current validator
   * instance to true if the "value" property is a Map instance,
   * otherwise sets the "answer" to false.
   * @returns {validator} the updated current validator instance.
   */
  is_map() {
    return this.isMap;
  }
  /**
   * This method sets the "answer" property to true if the "value"
   * property is a Set instance, otherwise sets the "answer" to false.
   * @returns {validator} the updated current validator instance.
   */
  get isSet() {
    this.#question = models.CheckType(this.value, "Set");
    return this.#set_answer();
  }
  /**
   * This method sets the "answer" property to true if the "value"
   * property is a Set instance, otherwise sets the "answer" to false.
   * @returns {validator} the updated current validator instance.
   */
  is_set() {
    return this.isSet;
  }
  /**
   * @todo TO BE IMPLEMENTED WITH MORE EFFICIENT WAY.
   * @param {any} elements an array
   * or string element has to be compared with
   * the value property of the current validator
   * instance.
   * @returns {validator}
   * @description a method that checks if the value
   * property of the current validator instance is array
   * that contains all the items of the elements when the
   * elements is of array type or if in this array (the value property)
   * exists item that is equals to the elements, when the elements
   * argument is string and sets the answer property of the returned
   * validator instance to true or false respectively.
   */
  contains(elements) {
    const cp = this.copy();
    const elementsValidator = new validator(elements);
    const isInstanceArray = cp.isArray.or.isTypedArray.answer;
    if (isInstanceArray) {
      if (elementsValidator.isArray.or.isTypedArray.or.isSet.answer) {
        this.#question = cp.for_all((item) => {
          const ans = elementsValidator.for_any((element) => {
            return element.is_same(item.value);
          });
          return ans;
        }).answer;
      } else {
        this.#question = cp.for_any((item) => item.is_same(elements)).answer;
      }
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method is_same(param)
   * @param {String | Number | Array | Object | boolean} param
   * @returns {validator}
   * @description This method checks if the
   * current value of the validator constructor
   * is equal to the param argument of the method.
   */
  is_same(param) {
    let param_type = new validator(param);
    this.#question = false;
    if (param_type.is_string().or.is_number().answer) {
      this.#question = this.value === param;
    }
    if (
      param_type.copy()
        .is_array()
        .or.is_object()
        .answer
    ) {
      this.#question = JSON.stringify(this.value) === JSON.stringify(param);
    }
    if (param_type.copy().is_function().answer) {
      this.#question = this.value.toString() === param.toString();
    }
    if (
      this.copy().is_undefined().answer &&
      param_type.copy().is_undefined().answer
    ) {
      this.#question = true;
    }
    if (
      this.copy().is_boolean().answer && param_type.copy().is_boolean().answer
    ) {
      this.#question = this.value === param_type.value;
    }
    if (param_type.value === null) {
      this.#question = param_type.value === this.value;
    }
    return this.#set_answer();
  }
  /**
   * @method is_same_with_any
   * @param {Array} arr_param an array
   * with arbitrary elements.
   * @returns {validator}
   * @description This method checks if
   * the current validator value in the constructor
   * is identical to one and only one of the elements
   * of the argument of the method (that is an array
   * with arbitrary type elements). Note that the method
   * checking procedure continues until the first equal
   * element is found and then stops, so if the array
   * contains more than one times the given parameter
   * this could not be verified with this method.
   */
  is_same_with_any(arr_param) {
    let q, n, i = 0, ans;
    new validator(arr_param).is_array()
      .on(false, () => {
        q = false;
      }).on(true, () => {
        n = arr_param.length;
        while (1) {
          if (i === n) break;
          else {
            q = this.copy().is_same(arr_param[i]).answer;
            if (q) break;
            else i += 1;
          }
        }
      });
    this.#question = q;
    return this.#set_answer();
  }
  /**
   * @method bind(otherValidator)
   * @param {validator} otherValidator
   * an validator expression
   * @description this is a crucial method in the
   * validator library. The method gets in the arguments a
   * valid validator expression and estimates/checks if the
   * two validator instances are true (the first one is the
   * current validator instance and the second is the validator
   * expression in the bind method). The method sets the answer property
   * of the returned validator instance to true or false respectively.
   * @example
   * let a = new validator(7.9889).is_float()
   *     .and.bind(
   *         new validator('Alias').is_string().and.not().is_empty()
   *     )
   * console.log(a.answer) // true
   */
  bind(otherValidator) {
    if (!(otherValidator instanceof validator)) {
      errors.IncorrectArgumentInBindMethod();
    }
    this.#question = otherValidator.answer;
    return this.#set_answer();
  }

  /**
   * @method interface(params)
   * @param {{}} params an object
   * with keys and values stringified
   * valid validator-like expressions
   * @description an object that
   * contains the key parameters
   * of the this.value object and
   * string-like valid expressions
   * of the validator methods to
   * tests or validate the validator
   * object
   * @returns {validator}
   * @example
   * let a = new validator({
   *         "name" : "Stephan",
   *         "age" : "23",
   *         "courses" : ['Mathematics', 'Economics', 'Econometrics']
   *     }).interface({
   *         "name" : "is_string()",
   *         "age" : "is_integer()",
   *         "courses" : "is_string_array()"
   *     })
   * console.log(a.answer) // true
   * @deprecated
   */
  interface(params) {
    let i,
      j,
      k,
      methods,
      keys,
      types,
      temp_key,
      temp_methods,
      areLegalMethods,
      tmpv,
      temp_validator,
      step = 1;
    while (step) {
      switch (step) {
        case 1:
          if (this.copy().is_object().answer) {
            step = 3;
          } else {
            step = 2;
            this.description = `In the validator method ` +
              `"interface" the value parameter is not object type.` +
              `Note that this method runs only when the this.value parameter ` +
              `is of Object type.Error value parameter.`;
          }
          break;
        case 2:
          this.#question = false;
          step = 0;
          break;
        case 3:
          temp_validator = new validator(params).is_object();
          if (temp_validator.answer) {
            step = 4;
          } else {
            this.description = `In the validator method interface ` +
              `the required parameter "params" is not of Object type.` +
              `Note that for the correct functionality of this method the ` +
              `parameter "params" has to be an Object type with keys the ` +
              `key properties of the this.value object, i.e ${
                Object.keys(this.value)
              }.` +
              `Error params parameter.`;
            step = 2;
          }
          break;
        case 4:
          let val_len = Object.keys(this.value).length,
            param_len = Object.keys(temp_validator.value).length;
          if (val_len > param_len) {
            this.description = `In the validator method interface ` +
              `the length of the this.value is bigger than the length of the ` +
              `controllable parameter "params", i.e the length of the this.value is ` +
              `${val_len} and the length of the "params" is ${param_len}.Error length of the parameters.`;
            step = 2;
          } else step = 5;
          break;
        case 5:
          keys = Object.keys(params);
          methods = Object.getOwnPropertyNames(validator.prototype);
          types = Object.values(params);
          areLegalMethods = true, i = 0;
          step = 6;
          break;
        case 6:
          if (new validator(types).is_string_array().answer) {
            step = 7;
          } else {
            this.description = `In the validator method interface ` +
              `the values of the "params" object parameter have to be ` +
              `only of string type.Error "params" values type.`;
            step = 2;
          }
          break;
        case 7:
          if (i === keys.length) step = 11;
          else {
            temp_key = keys[i];
            temp_methods = params[temp_key];
            // split the temp methods and
            // transform it from string to
            // array type...
            temp_methods = temp_methods.split(".");
            for (j = 0; j < temp_methods.length; j++) {
              for (k = 0; k < methods.length; k++) {
                tmpv = temp_methods[j].split(methods[k]);
                if (tmpv.length === 1) areLegalMethods = false;
                else if (
                  tmpv[0] === "" &&
                  tmpv[1][0] === "(" &&
                  tmpv[1][tmpv[1].length - 1] === ")"
                ) {
                  areLegalMethods = true;
                  temp_methods[j] = {
                    method: methods[k],
                    argument: eval(tmpv[1].substring(1, tmpv[1].length - 1)),
                  };
                  break;
                } else areLegalMethods = false;
              }
              if (!areLegalMethods) break;
            }
            if (!areLegalMethods) {
              this.description = `In the validator method interface ` +
                `the value of the key ${temp_key} contains invalid method code, i.e. ` +
                `the value is ${
                  temp_methods.join(".")
                }.Error invalid methods in "params" argument.`;
              step = 2;
            } else step = 8;
          }
          break;
        case 8:
          if (typeof this.value[temp_key] === "undefined") {
            step = 9;
          } else step = 10;
          break;
        case 9:
          if (
            temp_methods.findIndex((element) => {
              return element.method === "is_required";
            }) !== -1
          ) {
            this.description = `In the validator method interface ` +
              `the property of the this.value object ${temp_key} is required.Error required key in the value parameter.`;
            step = 2;
          } else {
            ++i;
            step = 7;
          }
          break;
        case 10:
          temp_validator = new validator(this.value[temp_key]);
          temp_methods.forEach((method_obj) => {
            temp_validator = temp_validator[method_obj.method](
              method_obj.argument,
            );
          });
          if (temp_validator.answer) {
            ++i;
            step = 7;
          } else {
            this.description = `In the validator method interface ` +
              `the this.value property ${temp_key} has wrong type.Successful execution.`;
            step = 2;
          }
          break;
        case 11:
          this.#question = true;
          step = 0;
          break;
      }
    }
    return this.#set_answer();
  }
  /**
   * @method interface2
   * @param {{keys : function(validator)}} params
   * @description This method is a variation of the
   * interface method. The difference between these two
   * methods is that the second accept arrow functions as
   * value. The argument of the arrow (or the conventional)
   * javascript function is assumed to be the validaor instance of
   * the key value of the this.value object.
   * @example
   * new validator({a : 12, rand : Math.random, sqrt : Math.sqrt })
   *     .instance2({
   *         a : a => {return a.is_number().and.is_integer()},
   *         rand : r => {return r.is_function()},
   *         sqrt : sqrt => {return sqrt.is_function()}
   *     }).answer // true
   */
  interface2(params) {
    new validator(params).is_object().and
      .bind(this.copy().is_object())
      .on(false, () => this.#question = false)
      .on(true, () => {
        new validator(Object.keys(params)).not().is_empty()
          .and.bind(
            new validator(Object.values(params)).not()
              .for_any((parameter) => {
                return parameter.not().is_function();
              }),
          )
          .on(true, () => {
            for (let key of Object.keys(params)) {
              this.#question =
                params[key](new validator(this.value[key])).answer;
              new validator(this.#question).not().is_boolean()
                .on(true, () => errors.IncorrectArgumentsInInterface2());
              if (this.#question) continue;
              else break;
            }
          })
          .on(false, () => this.#question = false);
      });
    return this.#set_answer();
  }
  /**
   * @method is_array_and_for_every(func_arg)
   * @param {function (validator, number):validator} callback
   * @description this method gets as argument
   * a function with validator argument and returns
   * true if the function is true for every elements of
   * the array. If the value property of the validator
   * is not array or the func_arg parameter is not a function
   * then the function returns false.
   */
  is_array_and_for_every(callback) {
    if (this.copy().isArray.answer) {
      this.#question = models.ForAllArrayEdition(this.value, callback);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method is_array_and_for_any
   * @param {function (validator, number)} callback
   * @returns {validator}
   * @description returns a validator instance that is
   * the result of the execution of the function of
   * all elements. The method stops if for some element the
   * validator is true.
   * @example
   * new validator([1, 2, 3, 4, 5, 6, 7])
   *     .is_array_and_for_any(element => {
   *         return element.is_integer().and.is_in_range(0, 8)
   *     }) // true value.
   */
  is_array_and_for_any(callback) {
    if (this.copy().isArray.answer) {
      this.#question = models.ForAnyArrayEdition(this.value, callback);
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @callback eventCallback
   * @param {validator} value - the current validator property.
   */
  /**
   * @method on()
   * @param {boolean} state - true or false
   * @param {eventCallback} callback
   * the function that will be run when the condition of the
   * answer property has value equals to state.
   * @returns {validator}
   * @description This method is very significant for the
   * library. It execute a function recorded in the input
   * argument callback when the answer property is in state.
   */
  on(state, callback) {
    let incorrectState = new validator(state)
      .not
      .isBoolean
      .and.not
      .is_same("true")
      .and.not
      .is_same("false")
      .answer;
    let incorrectFunction = new validator(callback)
      .not.isFunction
      .answer;
    if (!incorrectState && !incorrectFunction) {
      if (state === this.answer) {
        callback(this);
      }
    } else if (incorrectFunction) {
      if (this.show_warnings) warnings.IncorrectFunctionInOnMethod();
    } else if (incorrectState) {
      if (this.show_warnings) warnings.IncorrectStateInOnMethod();
    }
    return this;
  }
  /**
   * @method is_date()
   * @returns {validator}
   * @description a method that checks if the value
   * property of the current validator instance is
   * valid date or not and sets the answer property of
   * the returned validator instance to true or false
   * respectively.
   */
  is_date() {
    let cp = this.copy();
    if (cp.value instanceof Date || cp.value.toString() === "[object Date]") {
      this.#question = true;
    } else this.#question = false;
    return this.#set_answer();
  }

  /**
   * A callback function that will be executed
   * during the validator benchmark to measure its performance.
   *
   * @callback benchmarkCallback
   * @param {any} parameter - The value of the current
   * validator instance.
   */

  /**
   * Measures the execution time of a given callback function
   * when called with the current validator instance's value.
   *
   * @param {benchmarkCallback} f - The function to benchmark.
   * @param {number} iterations - The number of iterations to run
   *                             the benchmark (default is 100).
   * @returns {{mean: number, std: number, iterations: number}} An object
   *          with keys "mean" (average time), "std" (standard deviation),
   *          and "iterations" (number of iterations).
   */
  benchmark(f, iterations = 100) {
    if (new validator(iterations).not.isInteger.answer) {
      errors.IncorrectIterationsParameterInBenchmark();
    }
    return models.Benchmark(this.value, f, iterations);
  }

  test() {
    if (this.answer) {
      validator.successMessage(this.description);
    } else if (this.answer === false) {
      validator.errorMessage(this.description);
    } else validator.info(this.description);
  }
}
export default validator;
