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
   * Checks if the "value" property of the current validator
   * instance is a number or if it is a string, which may be
   * converted to a number.
   *
   * @returns {validator} The updated validator property with
   * "answer" property set to true if the "value" is a number
   * or if it is a string which may be converted to a number.
   */
  get isConvertibleToNumber() {
    this.#question = models.IsNumberLike(this.value);

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
    this.#question = this.copy()
      .isString
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
   * Checks if the "value" property of the current validator instance
   * is a Uint332Array in JavaScript.
   *
   * Note: This method does not ensure that all elements of the
   * "array" are not NaN.
   *
   * @returns {validator} the updated current validator instance with
   * answer property set to true if the "value" is Uint32Array, false
   * otherwise.
   */
  get isUint32Array() {
    this.#question = models.CheckType(this.value, "Uint32Array");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is an integer typed array (Int8Array, Uint8Array, Uint8ClampedArray,
   * Int16Array, Uint16Array, Int32Array, or Uint32Array).
   *
   * Note: This method does not ensure that all elements of the "array"
   * are not NaN.
   *
   * @returns {validator} The updated current validator instance with
   * "answer" property set to true if the "value" is an integer typed array,
   * false otherwise.
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
   * Checks if the "value" property of the current validator instance
   * is Float32Array in JavaScript.
   *
   * Note: This method does not ensure that all elements of the "array"
   * are not NaN.
   *
   * @returns {validator} The updated current validator instance with
   * "answer" property set to true if the "value" is Float32Array,
   * false otherwise.
   */
  get isFloat32Array() {
    this.#question = models.CheckType(this.value, "Float32Array");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is Float64Array in JavaScript.
   *
   * Note: This method does not ensure that all elements of the "array"
   * are not NaN.
   *
   * @returns {validator} the updated current validator instance
   * with "answer" property set to true if the "value" is Float64Array,
   * false otherwise.
   */
  get isFloat64Array() {
    this.#question = models.CheckType(this.value, "Float64Array");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is a float typed array (Float32Array or Float64Array).
   *
   * Note: This method does not ensure that all elements of the "array"
   * are not NaN.
   *
   * @returns {validator} the updated current validator instance with
   * "answer" property set to true if the "value" is some instance of
   * float - typed array, false otherwise.
   */
  get isFloatTypedArray() {
    this.#question = this.copy().isFloat32Array.or.isFloat64Array.answer;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is likely to be some kind of a TypedArray in JavaScript.
   *
   * Note: This method does not ensure that all elements of the "array"
   * are not NaN.
   *
   * @returns {validator} The updated validator instance with
   * "answer" property set to true if the "value" is likely to be
   * a typed array, false otherwise.
   */
  get isTypedArray() {
    this.#question = models.IsTypedArray(this.value);

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is a generic array type in JavaScript.
   *
   * @returns {validator} The updated validator instance with "answer"
   * property set to true if the "value" is an array, false otherwise.
   */
  get isArray() {
    this.#question = models.CheckType(this.value, "Array");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of boolean elements.
   *
   * @returns {validator} The updated validator instance with
   * the "answer" property set to true if the "value" is an array
   * of boolean elements and false otherwise.
   */
  get isBooleanArray() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsBooleanArray(this.value, this.#question);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current
   * validator instance is an array of number elements.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * a number array, false otherwise.
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
   * Checks if the "value" property of the current
   * validator instance is an array of integer numbers.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * an integer array, false otherwise.
   */
  get isIntegerArray() {
    const copy = this.copy();
    if (copy.isArray.or.isFloatTypedArray.answer) {
      this.#question = models.IsIntegerArray(this.value);
    } else if (copy.isIntegerTypedArray.answer) {
      this.#question = !models.HasNaNInTypedArray(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of positive numbers.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * positive numeric array, false otherwise.
   */
  get isArrayOfPositiveNumbers() {
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfPositiveNumbers(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array whose elements are negative numbers.
   *
   * @returns {validator} The updated validator instance with
   * the "answer" property set to true if all the elements of
   * the "value" array are negative numbers.
   */
  get isArrayOfNegativeNumbers() {
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfNegativeNumbers(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of positive integers.
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value"
   * is an array of positive integers.
   */
  get isArrayOfPositiveIntegers() {
    const cp = this.copy();
    if (cp.isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfPositiveIntegers(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is an array of negative integer number elements.
   *
   * @returns {validator} The updated validator instance with the
   * "answer" property set to true if the "value" is an array of
   * negative integers.
   */
  get isArrayOfNegativeIntegers() {
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfNegativeIntegers(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current
   * validator instance is an array and in addition
   * if all elements of the array are numbers which
   * belongs to the open interval (a, b), where "a"
   * and "b" are the parameters of the method.
   *
   * @param {number} a
   * @param {number} b
   * @throws {Error} if "a" and "b" are not numbers or "a"
   * is not less than "b".
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * numeric array with elements in an open interval (a, b),
   * false otherwise.
   */
  isArrayOfNumbersInRange(a, b) {
    const isInputIncorrect = new validator([a, b]).not.isNumberArray
      .or.bind(
        new validator(a).isGreaterThanOrEqual(b),
      ).answer;

    if (isInputIncorrect) errors.IllegalParametersInIsArrayOfNumbersInRange();
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfNumbersInRange(this.value, a, b);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of numbers in the closed range [a, b],
   * where "a" and "b" are the parameters of the method.
   *
   * @param {number} a
   * @param {number} b
   * @throws {Error} if "a" and "b" are not numbers or "a"
   * is not less than "b".
   * @returns {validator} The updated validator instance
   * with "answer" proeprty set to true if the "value" is
   * an array of numbers in an closed range [a, b]
   */
  isArrayOfNumbersInClosedRange(a, b) {
    const isInputIncorrect = new validator([a, b]).not.isNumberArray
      .or.bind(
        new validator(a).isGreaterThanOrEqual(b),
      ).answer;

    if (isInputIncorrect) {
      errors.IllegalParametersInIsArrayOfNumbersInClosedRange();
    }

    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfNumbersInClosedRange(this.value, a, b);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if "value" property of the current validator
   * instance is an array of integers which lie in the
   * open interval (a, b).
   *
   * @param {number} a
   * @param {number} b
   * @throws {Error} if "a" and "b" are not integers or
   * "a" is not less than "b"
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * an integer array with all elements to be in the
   * open interval (a, b).
   */
  isArrayOfIntegersInRange(a, b) {
    const isInputIncorrect = new validator([a, b]).not.isIntegerArray
      .or.bind(
        new validator(a).isGreaterThanOrEqual(b),
      ).answer;

    if (isInputIncorrect) {
      errors.IllegalParametersInIsArrayOfIntegersInRange();
    }

    if (this.copy().not.isArray.and.not.isTypedArray.answer) {
      this.#question = false;
    } else this.#question = models.IsArrayOfIntegersInRange(this.value, a, b);

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an integer array whoose elements lies in the
   * closed range [a, b], where "a" and "b" are the parameters
   * of the method.
   *
   * @param {number} a
   * @param {number} b
   * @throws {Error} if "a" and "b" are not integers or "a" is
   * not lesser than "b".
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * an integer array with elements in the closed range [a, b].
   */
  isArrayOfIntegersInClosedRange(a, b) {
    const isInputIncorrect = new validator([a, b]).not.isNumberArray
      .or.bind(
        new validator(a).isGreaterThanOrEqual(b),
      ).answer;

    if (isInputIncorrect) {
      errors.IllegalParametersInIsArrayOfIntegersInClosedRange();
    }

    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfIntegersInClosedRange(this.value, a, b);
    } else this.#question = true;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of string elements.
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value"
   * is array of string elements.
   */
  get isStringArray() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsStringArray(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of object elements.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is an
   * array of object elements, false otherwise.
   */
  get isObjectArray() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsObjectArray(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array whoose elements are all functions.
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value"
   * is an array of function components, false otherwise.
   */
  get isArrayOfFunctions() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfFunctions(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property is an array of arbitrary
   * array elements.
   *
   * @returns {validator} The updated validator instance
   * witht the "answer" property set to true if the "value"
   * porpeorty is an array of arbitrary array elements.
   */
  get isArrayOfArrays() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfArrays(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of arbitrary arrays with equal size.
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value"
   * is an array of arrays and every element of the "value"
   * has the same length, false otherwise.
   */
  get isArrayOfArraysWithEqualSize() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfArraysWithEqualSize(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of numeric arrays with have arbitrary
   * length.
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value"
   * is an array of numeric arrays with arbitrary length,
   * false otherwise.
   */
  get isArrayOfNumberArrays() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfNumberArrays(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a numeric matrix.
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value"
   * is a numeric matrix, false otherwise.
   */
  get isArrayOfNumberArraysWithEqualSize() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfNumberArraysWithEqualSize(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array whoose elements are integer arrays
   * with arbitrary length.
   *
   * @returns {validator} The updated validator instance with
   * "answer" property set to true if the "value" is an array
   * of integer arrays, false otherwise.
   */
  get isArrayOfIntegerArrays() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfIntegerArrays(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an integer matrix.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * an array of integer arrays with equal size (integer matrix).
   */
  get isArrayOfIntegerArraysWithEqualSize() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfIntegerArraysWithEqualSize(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of string arrays with arbitrary length.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * an array of string arrays with arbitrary length, false otherwise.
   */
  get isArrayOfStringArrays() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfStringArrays(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a string matrix.
   *
   * @returns {validator} The updated validator isntance
   * with "answer" property set to true if the "value" is
   * a string matrix, false otherwies.
   */
  get isArrayOfStringArraysWithEqualSize() {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfStringArraysWithEqualSize(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current
   * validator instance is an array of object arrays
   * with arbitrary length.
   *
   * @returns {validator} The updated validator instances
   * with "answer" property set to true if the "value" is
   * an array of object arrays, false otherwise.
   */
  get isArrayOfObjectArrays() {
    if (this.copy().not.isArray.answer) this.#question = false;
    else this.#question = models.IsArrayOfObjectArrays(this.value);

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a matrix of object elements.
   *
   * @returns {validator} The updated validator instance with
   * "answer" property set to true if the "value"is an matrix of
   * object elements, false otherwise.
   */
  get isArrayOfObjectArraysWithEqualSize() {
    if (this.copy().not.isArray.answer) this.#question = false;
    else this.#question = models.IsArrayOfObjectArraysWithEqualSize(this.value);

    return this.#set_answer();
  }

  // Methods for more abstract data types.
  // Methods for validation of Objects,
  // maps, sets, functions, asyncronous
  // functions, generators, promises,
  // errors and instances.

  /**
   * Checks if the "value" property of the current validator
   * instance is an object.
   *
   * @returns {validator} The updated current validator instance
   * with the "answer" property set to true if the "value" is an
   * object type, false otherwise.
   */
  get isObject() {
    this.#question = models.CheckType(this.value, "Object");
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is a Map data type in JavaScript.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is a Map
   * data type, false otherwise.
   */
  get isMap() {
    this.#question = models.CheckType(this.value, "Map");
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a Set data type in JavaScript.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is a Set,
   * false otherwise.
   */
  get isSet() {
    this.#question = models.CheckType(this.value, "Set");
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a Function data type in JavaScript.
   *
   * @returns {validator} The updated validator instance with
   * "answer" property set to true if the "value" is a Function,
   * false otherwise.
   */
  get isFunction() {
    this.#question = models.CheckType(this.value, "Function");
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an asynchronous function.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is an
   * asynchronous function, false otherwise.
   */
  get isAsync() {
    this.#question = models.CheckType(this.value, "AsyncFunction");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a Generator or GeneratorFunction in JavaScript.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is a Generator
   * or Generator function, false otherwise.
   */
  get isGenerator() {
    this.#question = models.CheckType(this.value, "GeneratorFunction") ||
      models.CheckType(this.value, "Generator");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is a Promise in JavaScript.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is a Promise,
   * false otherwise.
   */
  get isPromise() {
    this.#question = models.CheckType(this.value, "Promise");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an Error object.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * an Error object in JavaScript, false otherwise.
   */
  get isError() {
    this.#question = models.CheckType(this.value, "Error");

    return this.#set_answer();
  }

  // Higher order utility methods.
  // Implementation of methods which
  // are realated with more than one
  // data types or classes and which
  // allows as to extract information
  // for properties of generalized and
  // abstract objects.
  // The methods which we will be implemented
  // are isInstanceOf, hasLength, hasLengthLessThan,
  // hasLengthGreaterThan, hasLengthLessThanOrEqualTo,
  // hasLengthGreaterThanOrEqualTo, hasLengthInRange,
  // hasLengthInClosedRange, isEmpty (may be applied
  // on different data types as strings, arrays, objects,
  // array buffers, typed arrays, sets and maps among all),
  // forEvery, forAny, isArrayAndForEvery, isArrayAndForAny,
  // contains, isSame, isSameWithAnyOf methods etc.

  /**
   * Checks if the current validator value is instanceof
   * the "instance" parameter. The "instance" can be
   * defined with its constructor or as a string, equal
   * to the name of the instance type.
   *
   * @param {InstanceType | string} instance
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * instance of the "instance" parameter, false otherwise.
   */
  isInstanceof(instance) {
    if (models.IsInstanceType(instance)) {
      this.#question = models.IsInstanceof(this.value, instance);
    } else errors.IncorrectArgumentInIsInstanceof();

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance has a length-like property (e.g., length, byteLength, size)
   * and if that property is equals to the specified value "n".
   *
   * @param {number} n - An integer value to compare with the length-like property.
   * @throws {Error} if the "n" parameter is not an integer number.
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value" has a
   * length-like property that is equals to the "n" parameter.
   */
  hasLength(n) {
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
   * Checks if the "value" property of the current validator
   * instance has a length-like property (e.g., length, byteLength, size)
   * and if that property is greater than the specified value "n".
   *
   * @param {number} n - An integer value to compare with the length-like property.
   * @throws {Error} if "n" parameter is not an integer number.
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value" has a
   * length-like property that is greater than the "n" parameter.
   */
  hasLengthGreaterThan(n) {
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
   * Checks if the "value" property of the current validator
   * instance has a length-like property (e.g., length, byteLength, size)
   * and if that property is equal to or greater than the specified value "n".
   *
   * @param {number} n - An integer value to compare with the length-like property.
   * @throws {Error} if "n" parameter is not an integer number.
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value" has a
   * length-like property that is equal to or greater than the "n" parameter.
   */
  hasLengthEqualsOrGreaterThan(n) {
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
   * Checks if the "value" property of the current validator
   * instance has a length-like property (e.g., length, byteLength, size)
   * and if that property is less than the specified value "n".
   *
   * @param {number} n - An integer value to compare with the length-like property.
   * @throws {Error} if "n" parameter is not an integer number.
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value" has a
   * length-like property that is less than the "n" parameter.
   */
  hasLengthLessThan(n) {
    if (Number.isInteger(n)) n = Number(n);
    else errors.IncorrectArgumentInHasLengthLesserThan(n);
    let cp_instance = this.copy();
    if (cp_instance.isArrayBuffer.answer) {
      this.#question = models.TestCondition(this.value, "byteLength", n, "lt");
    } else if (cp_instance.isArray.or.isTypedArray.or.isString.answer) {
      this.#question = models.TestCondition(this.value, "length", n, "lt");
    } else if (cp_instance.isObject.answer) {
      this.#question = models.TestCondition(
        Object.keys(cp_instance.value),
        "length",
        n,
        "lt",
      );
    } else if (cp_instance.isSet.or.isMap.answer) {
      this.#question = models.TestCondition(this.value, "size", n, "lt");
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance has a length-like property (e.g., length, byteLength, size)
   * and if that property is equal to or less than the specified value "n".
   *
   * @param {number} n - An integer value to compare with the length-like property.
   * @throws {TypeError} If the "n" parameter is not an integer number.
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value" has a
   * length-like property that is equal to or less than the "n" parameter.
   */
  hasLengthEqualsOrLessThan(n) {
    if (Number.isInteger(n)) n = Number(n);
    else errors.IncorrectArgumentInHasLengthEqualsOrLesserThan();
    let cp_instance = this.copy();
    if (cp_instance.isArrayBuffer.answer) {
      this.#question = models.TestCondition(this.value, "byteLength", n, "leq");
    } else if (cp_instance.isArray.or.isTypedArray.or.isString.answer) {
      this.#question = models.TestCondition(this.value, "length", n, "leq");
    } else if (cp_instance.isObject.answer) {
      this.#question = models.TestCondition(
        Object.keys(cp_instance.value),
        "length",
        n,
        "leq",
      );
    } else if (cp_instance.isSet.or.isMap.answer) {
      this.#question = models.TestCondition(this.value, "size", n, "leq");
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance has a length-like property (e.g., length) that falls within
   * the specified open range defined by "a" and "b".
   *
   * @param {number} a - An integer representing the lower bound of the range.
   * @param {number} b - An integer representing the upper bound of the range.
   * @throws {TypeError} If either "a" or "b" is not an integer, or if "a" is greater than or equal to "b".
   * @returns {validator} The updated validator instance with the "answer" property
   * set to true if the length-like property is within the open range (a < length < b),
   * false otherwise.
   */
  hasLengthInRange(a, b) {
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

  /**
   * Checks if the "value" property of the current validator
   * instance has a length-like property (e.g., length) that falls within
   * the specified closed range defined by "a" and "b".
   *
   * @param {number} a - An integer representing the lower bound of the closed range.
   * @param {number} b - An integer representing the upper bound of the closed range.
   * @returns {validator} The updated validator instance with the "answer" property
   * set to true if the length-like property is within the closed range (a ≤ length ≤ b),
   * false otherwise.
   * @throws {TypeError} If either "a" or "b" is not an integer, or if "a" is greater than or equal to "b".
   */
  hasLengthInClosedRange(a, b) {
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
   * Checks if the "value" property of the current validator instance is empty,
   * depending on the data type. For undefined or null values, it's considered empty.
   * For arrays, array buffers, maps, objects, sets, strings, and typed arrays,
   * it checks if the length or similar property is equal to 0.
   *
   * @throws {Error} If the "value" is an incorrect argument.
   * @returns {validator} The updated validator instance with the "answer" property
   * set to true if the "value" is empty according to its data type, false otherwise.
   */
  get isEmpty() {
    const test = this.copy();
    if (test.isUndefined.or.isNull.answer) {
      this.#question = true;
    } else if (
      test
        .isArray
        .or.isArrayBuffer
        .or.isMap
        .or.isObject
        .or.isSet
        .or.isString
        .or.isTypedArray
    ) this.#question = test.hasLength(0).answer;
    else errors.IncorrectArgumentInIsEmpty();

    return this.#set_answer();
  }

  /**
   * Iterates over the elements of the "value" property of the current validator instance,
   * applying the provided callback function to each element. The callback function should
   * return a validator instance. This method returns true if the callback function returns
   * a "truthy" validator instance for all elements in the value, false otherwise.
   *
   * @param {function(validator, number | string): validator} callback - A function that
   * takes a validator instance and an optional key or index and returns a validator instance.
   *
   * @example
   * let a = new validator([12, 32, 998.3, 89, 0.9839])
   *     .forEvery(element => {
   *         return element.isFloat();
   *     });
   * console.log(a.answer) // true
   *
   * @throws {Error} If the "callback" parameter is not a function.
   *
   * @returns {validator} The updated validator instance with the "answer" property set to true
   * if the callback function returns "truthy" validator instances for all elements, false otherwise.
   */
  forEvery(callback) {
    // initialization
    const val = this.copy();
    const callback_val = new validator(callback);

    if (callback_val.not.isFunction.answer) {
      errors.IncorrectFunctionArgumentInForAll();
    }

    if (val.not.isEmpty.answer) {
      if (val.isArray.answer) {
        this.#question = models.ForEveryArrayEdition(val.value, callback);
      } else if (val.isObject.answer) {
        this.#question = models.ForEveryObjectEdition(val.value, callback);
      } else if (val.isSet.answer) {
        this.#question = models.ForEverySetEdition(val.value, callback);
      } else if (val.isMap.answer) {
        this.#question = models.ForEveryMapEdition(this.value, callback);
      } else this.#question = false;
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Iterates through the elements of the current
   * validator's "value" property and checks if the
   * provided callback function returns a "truthy"
   * validator instance for any of the elements.
   *
   * @param {function(validator, number): validator} callback - A
   * function that jtakes a validator instance and an optional key
   * or index and returns a validator instance.
   *
   * @example
   * let a = new validator([12, 32, 998.3, 89, 0.9839])
   *     .forAny(element => {
   *         return element.isFloat();
   *     });
   * console.log(a.answer); // true
   *
   * @throws {Error} if the "callback" parameter is not a function.
   *
   * @returns {validator} The updated validator instance with the "answer"
   * property set to true if the "callback" function returns a "truthy"
   * validator instance for any of the elements, false otherwise.
   */
  forAny(callback) {
    const val = this.copy();
    const callbackIsNotFunction = new validator(callback).not.isFunction.answer;

    if (callbackIsNotFunction) {
      errors.IncorrectFunctionArgumentInForAny();
    }

    if (val.not.isEmpty.answer) {
      if (val.isArray.or.isTypedArray.answer) {
        this.#question = models.ForAnyArrayEdition(val.value, callback);
      } else if (val.isObject.answer) {
        this.#question = models.ForAnyObjectEdition(val.value, callback);
      } else if (val.isSet.answer) {
        this.#question = models.ForAnySetEdition(this.value, callback);
      } else if (val.isMap.answer) {
        this.#question = models.ForAnyMapEdition(this.value, callback);
      } else this.#question = false;
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the current validator instance's value
   * is an array and if a given callback function
   * returns a truthy result for every element in the array.
   *
   * @param {function(validator, number | string): validator} callback - A
   * function that takes a validator instance and an optional
   * key or index and returns a validator instance.
   * @throws {Error} If the "callback" parameter is not a function.
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the current
   * instance's value is an array and the callback function
   * returns "truthy" for every element,false otherwise.
   */
  isArrayAndForEvery(callback) {
    if (new validator(callback).not.isFunction.answer) {
      errors.IncorrectFunctionArgumentInForAll();
    }
    if (this.copy().isArray.answer) {
      this.#question = models.ForEveryArrayEdition(this.value, callback);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the current validator instance's value
   * is an array and if a given callback function returns
   * a truthy result for at least one element in the array.
   *
   * @param {function(validator, number | string): validator} callback - A
   * function that takes a validator instance and an optional
   * key or index and returns a validator instance.
   * @throws {Error} If the "callback" parameter is not a function.
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the current
   * instance's value is an array and the callback function
   * returns "truthy" for at least one element, false otherwise.
   */
  isArrayAndForAny(callback) {
    if (new validator(callback).not.isFunction.answer) {
      errors.IncorrectFunctionArgumentInForAny();
    }
    if (this.copy().isArray.answer) {
      this.#question = models.ForAnyArrayEdition(this.value, callback);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property the current
   * validator instance is equals to (same with)
   * the "param" argument of the method.
   *
   * @param {any} param
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * same with the "param" argument of the method.
   */
  isSame(param) {
    const v = new validator(param);
    const t = this.copy();

    if (t.isPrimitiveType.answer) {
      if (v.isPrimitiveType.answer) {
        this.#question = String(this.value) === String(param);
      } else this.#question = false;
    } else if (t.isFunction.or.isAsync.or.isGenerator.answer) {
      if (v.isFunction.or.isAsync.or.isGenerator.answer) {
        this.#question = this.value.toString() === param.toString();
      } else this.#question = false;
    } else if (t.isArray.or.isTypedArray.or.isObject.answer) {
      if (v.isArray.or.isTypedArray.or.isObject.answer) {
        this.#question = t.forEvery((item, index) =>
          item.isSame(param[index])
        ).answer;
      } else this.#question = false;
    } else if (t.isArrayBuffer.answer) {
      if (v.isArrayBuffer.answer) {
        const tf64 = new validator(new Float64Array(this.value));
        const vf64 = new Float64Array(v.value);
        this.#question = tf64.forEvery((item, index) =>
          item.isSame(vf64[index])
        ).answer;
      } else this.#question = false;
    } else errors.InappropriateValueInIsSame();

    return this.#set_answer();
  }

  /**
   * Checks if the value of the
   * current validator instance
   * is the same as any of the
   * values in the provided array.
   *
   * @param {Array|TypedArray} arrParam - The array to compare with.
   * @returns {validator} The updated validator
   * instance with the "answer" property set
   * to true if there's a match, false otherwise.
   */
  isSameWithAny(arrParam) {
    let i, j;
    const t = this.copy();
    const isArrayLike = new validator(arrParam).isArray.or.isTypedArray.answer;
    this.#question = false;

    if (isArrayLike) {
      const n = arrParam.length;
      for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (
          (t.isSame(arrParam[j]).answer) ||
          (t.isSame(arrParam[j + 1]).answer) ||
          (t.isSame(arrParam[j + 2]).answer) ||
          (t.isSame(arrParam[j + 3]).answer)
        ) {
          this.#question = true;
          return this.#set_answer();
        }
      }

      j = i << 2;
      for (; j < n; j++) {
        if (t.isSame(arrParam[j]).answer) {
          this.#question = true;
          return this.#set_answer();
        }
      }
    }

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
  throwsErrorWith(...params) {
    let value = null;
    try {
      value = this.copy().executeWith(...params).value;
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
  executeWith(...params) {
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
    new validator(params).isObject.and
      .bind(this.copy().isObject)
      .on(false, () => this.#question = false)
      .on(true, () => {
        new validator(Object.keys(params)).not.isEmpty
          .and.bind(
            new validator(Object.values(params)).not
              .forAny((parameter) => {
                return parameter.not.isFunction;
              }),
          )
          .on(true, () => {
            for (let key of Object.keys(params)) {
              this.#question =
                params[key](new validator(this.value[key])).answer;
              new validator(this.#question).not.isBoolean
                .on(true, () => errors.IncorrectArgumentInInterface());
              if (this.#question) continue;
              else break;
            }
          })
          .on(false, () => this.#question = false);
      });
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
      .isSame("true")
      .and.not
      .isSame("false")
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
  get isDate() {
    this.#question = models.CheckType(this.value, "Date");
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
