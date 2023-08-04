"use strict";
import * as errors from "./Errors/index.js";
import * as warnings from "./Warnings/index.js";
import * as models from "./Models/index.js";
const author = "Velislav S. Karastoychev";
const version = "3.0.0";
class validator {
  #not = null;
  #operand = null;
  #question = null;
  #warnings = false;
  /**
   * @param {any} parameter a javascript
   * valid variable. The type of the parameter
   * can be an arbitrary valid expression in
   * javascript or a type defined in this language.
   * @description The validator class is a javascript
   * library with tool for condition verification in
   * javascript. Every validator has properties answer,
   * value and internal (not for user usage) properties
   * #question, #operand, _required. Do declare an validator
   * expression just type new validator(<some expression>). To
   * verify if this expression covers some conditions use the
   * methods of the class and for more complex logical sentences
   * use the and, or and not methods. To compare the truth of two
   * validator expressions you have to use the bind method. See
   * the methods of the validator class for more information.
   */
  constructor(parameter) {
    this.value = parameter;
    this.answer = null;
    this.required = false;
    this.description = `This is a validator Object.` +
      `This library provides functionalities for checking, ` +
      `testing and validating of some data in javascript language.`;
  }
  get show_warnings() {
    return this.#warnings;
  }
  set show_warnings(warnings) {
    new validator(warnings)
      .isBoolean
      .on(true, () => this.#warnings = warnings);
  }
  /**
   * @internal an internal method for obtaining
   * of the result of some logical operations.
   * @returns {validator}
   */
  #set_answer() {
    if (this.#not) {
      this.#question = !this.#question;
    }
    if (this.#operand === "or") {
      this.answer = this.answer || this.#question;
    }
    if (this.#operand === "and") {
      this.answer = this.answer && this.#question;
    }
    if (this.#operand === null) {
      this.answer = this.#question;
    }
    this.#not = null;
    this.#operand = null;
    this.#question = null;
    return this;
  }
  /**
   * @method copy() creates a new instance
   * with value parameter the current value
   * of the validator and ignore the answer
   * parameter that was obtained.
   * @returns {validator} the answer property of the
   * returned instance is undefined.
   */
  copy() {
    return new validator(this.value);
  }
  /**
   * @method absolute_copy() create a new instance
   * of the current validator object and records
   * the obtained answer and other properties of
   * the instance...
   * @returns {validator} the answer property of the
   * returned instance is the same as the answer property
   * of the current validator instance.
   */
  absolute_copy() {
    let v = new validator(this.value);
    v.answer = this.answer;
    v.#not = this.#not;
    v.#operand = this.#operand;
    v.#question = this.#question;
    v.required = this.required;
    return v;
  }

  /**
   * @method absoluteCopy
   * @returns {validator}
   * @description this is a getter variant of the
   * absolute_copy() method.
   */
  get absoluteCopy() {
    return this.absolute_copy();
  }
  /**
   * @method and() set the operator
   * of the current validator instance
   * to the logical and (&) and in the
   * next not operator method execute a
   * logical conjunction.
   * @returns {validator}
   */
  and() {
    this.#operand = "and";
    return this;
  }
  /**
   * @method And - a getter method.
   * @returns {validator}
   * @description this method simulates the and method and
   * is used for more comfort of the code. The user may Note
   * use the parenthesis symbol when uses this method.
   */
  get And() {
    return this.and();
  }
  /**
   * @method or() set the operator
   * to logical or (||) and in the next
   * non operational method executes the
   * operation disjunction.
   * @returns {validator}
   */
  or() {
    this.#operand = "or";
    return this;
  }
  /**
   * @method Or - a simulation of the or method.
   * @returns {validator}
   * @description this method is written for more comfort
   * of the code. The user may not use the parenthesis symbol
   * to generate or statement with the library.
   */
  get Or() {
    return this.or();
  }
  /**
   * @method not() set the operator to logical
   * negation for the current validator instance.
   * When the next non operational method is run
   * the operation of logical negation will be executed
   * and the obtained result will be written in the
   * value property of the validator instance.
   * @returns {validator}
   */
  not() {
    this.#not = true;
    return this;
  }
  /**
   * @method Not
   * @returns {validator}
   * @description this method is created for more comfort in the
   * codding procedure. The user may not use the parenthesis symbol
   * to generate the not statement method of the library.
   */
  get Not() {
    return this.not();
  }
  /**
   * @method required()
   * @deprecated
   * @description a method that set an internal
   * property of the current validator instance
   * and this property might be used in the interface()
   * validator method. See the description and commentaries
   * for the interface() method.
   * @returns {validator}
   */
  is_required() {
    this.required = true;
    return this;
  }
  /**
   * A callback function which will be executed
   * from the validator benchmark method in order
   * to measure its performance.
   *
   * @callback benchmarkCallback
   * @param {any} parameters the value of the current
   * validator instance.
   */
  /**
   * @param {benchmarkCallback} f a functin which will
   * be executed "iteration" times.
   * @param {number} iterations - a positive integer, which
   * is set to 100 by default. The number of iterations needed
   * to measure the benchmark of the benchmark callback function.
   * @returns {{mean: number, std: number}}
   */
  benchmark(f, iterations = 100) {
    return models.Benchmark(this.value, f, iterations);
  }
  /**
   * @method is_undefined()
   * @returns {validator}
   * @description this method checks if the
   * current value property is undefined and if this
   * condition is fulfilled returns true, otherwise
   * returns false.
   */
  is_undefined() {
    let q = models.IsUndefined(this.value);
    this.#question = q;
    return this.#set_answer();
  }
  /**
   * @method isUndefined
   * @returns {validator}
   * @description this method simulates the is_undefined method.
   */
  get isUndefined() {
    return this.is_undefined();
  }
  /**
   * @method is_boolean()
   * @returns {validator}
   * @description This method checks if the value property
   * of the current validator instance is of boolean type.
   */
  is_boolean() {
    this.#question = models.IsBoolean(this.value);
    return this.#set_answer();
  }
  /**
   * @method isBoolean
   * @returns {validator}
   * @description this method simulates the is_boolean() method.
   */
  get isBoolean() {
    return this.is_boolean();
  }
  /**
   * @method is_string()
   * @returns {validator}
   * @description This method estimates if the
   * value property of the current validator instance
   * is string and return true if this condition is
   * fulfilled, otherwise returns false.
   */
  is_string() {
    this.#question = models.IsString(this.value);
    return this.#set_answer();
  }
  /**
   * @method isString
   * @returns {validator}
   * @description this method simulates the is_string() method.
   */
  get isString() {
    return this.is_string();
  }
  /**
   * @method is_number()
   * @returns {validator}
   * @description This method checks if the property
   * value of the current validator instance if number
   * type and if this condition is fulfilled returns true
   * otherwise returns false. Note that the number can be of string type,
   * or can be floating point number or integer number.
   */
  is_number() {
    this.#question = models.IsNumber(this.value);
    return this.#set_answer();
  }
  /**
   * @method isNumber
   * @returns {validator}
   * @description this method simulates the is_number() method.
   */
  get isNumber() {
    return this.is_number();
  }
  /**
   * @method is_integer()
   * @returns {validator}
   * @description a void method that checks
   * if the value property of the current
   * validator instance is integer number or
   * not and returns true or false in the answer
   * property.
   */
  is_integer() {
    this.#question = models.IsInteger(this.value);
    return this.#set_answer();
  }
  /**
   * @method isInteger
   * @returns {validator}
   * @description this method is the getter variant
   * of the is_integer() method.
   */
  get isInteger() {
    return this.is_integer();
  }
  /**
   * @method is_positive_integer
   * @returns {validator}
   * @description this method tests
   * if the value parameter of the
   * current validator instance is
   * integer which is equals or bigger
   * than 0.
   */
  is_positive_integer() {
    this.#question = this.copy()
      .isInteger
      .And
      .is_equal_or_bigger_than(0)
      .answer;
    return this.#set_answer();
  }
  /**
   * @method isPositiveInteger
   * @returns {validator}
   * @description this method is a getter
   * variant of the is_positive_integer method
   * and tests if the value property of the
   * current validator instance is equals or
   * bigger than 0.
   */
  get isPositiveInteger() {
    return this.is_positive_integer();
  }
  /**
   * @method is_negative_integer
   * @returns {validator}
   * @description this method tests if the
   * value property of the current validator
   * instance integer which is smaller than 0.
   */
  is_negative_integer() {
    this.#question = this.copy()
      .isInteger
      .And
      .is_lesser_than(0)
      .answer;
    return this.#set_answer();
  }
  /**
   * @method isNegativeInteger
   * @returns {validator}
   * @description this method is a getter
   * variant and tests if the value property
   * of the current validator instance is
   * integer which is smaller than 0.
   */
  get isNegativeInteger() {
    return this.is_negative_integer();
  }
  /**
   * @method is_float()
   * @returns {validator}
   * @description a void method that checks if
   * the value property of the current validator
   * instance is floating point number or not and
   * sets the answer property of the returned instance
   * to true or false respectively.
   */
  is_float() {
    this.#question = this.copy()
      .isNumber.And.Not.isInteger
      .answer;
    return this.#set_answer();
  }
  /**
   * @method isFloat
   * @returns {validator}
   * @description this method is the getter variant of
   * the is_float() method of the validator library.
   */
  get isFloat() {
    return this.is_float();
  }
  /**
   * @method is_negative
   * @returns {validator}
   * @description this method tests if the
   * value property of the current validator
   * instance is a negative number.
   */
  is_negative() {
    this.copy().is_number().on(false, () => {
      if (this.show_warnings) {
        warnings.IncorrectValueInIsNegative();
      }
    });
    this.#question = this.copy()
      .is_lesser_than(0)
      .answer;
    return this.#set_answer();
  }
  /**
   * @method isNegative
   * @returns {validator}
   * @description this method is a getter
   * variant of the is_negative() method
   * and tests if the value property of
   * the current validator instance is
   * negative number (smaller than 0).
   */
  get isNegative() {
    return this.is_negative();
  }
  /**
   * @method is_positive
   * @returns {validator}
   * @description this method tests if the
   * value property of the current validator
   * instance is equals or bigger than 0.
   */
  is_positive() {
    this.copy().isNumber.on(false, () => {
      if (this.show_warnings) warnings.IncorrectValueInIsPositive();
    });
    this.#question = this.copy()
      .is_equal_or_bigger_than(0)
      .answer;
    return this.#set_answer();
  }
  /**
   * @method isPositive
   * @returns {validator}
   * @description this method tests if the value
   * property of the current validator instance
   * is positive number.
   */
  get isPositive() {
    return this.is_positive();
  }
  /**
   * @method is_number_like
   * @description this method tests if the
   * value property of the current validator
   * instance is number or a string which may
   * be converted to number.
   * @returns {validator}
   */
  is_number_like() {
    this.#question = models.IsNumberLike(this.value);
    return this.#set_answer();
  }
  /**
   * @method isNumberLike
   * @returns {validator}
   * @description this method tests if the
   * value property of the current validator
   * instance is number or string which may
   * be converted to number.
   */
  get isNumberLike() {
    return this.is_number_like();
  }
  /**
   * @method is_integer_like
   * @description this method tests if the value
   * property of the current validator instance is
   * an integer or a string which may be converted
   * to integer.
   * @returns {validator}
   */
  is_integer_like() {
    this.#question = models.IsIntegerLike(this.value);
    return this.#set_answer();
  }
  /**
   * @method isIntegerLike
   * @description this method tests if the
   * value property of the current validator
   * instance is an integer or a string which
   * may be converted to integer.
   * @returns {validator}
   */
  get isIntegerLike() {
    return this.is_integer_like();
  }
  /**
   * @method is_negative_number_like
   * @description this method tests if the value
   * property of the current validator instance is
   * a number or string which may be converted to
   * number and which is smaller than zero.
   * @returns {validator}
   */
  is_negative_number_like() {
    this.#question = models.IsNegativeNumberLike(this.value);
    return this.#set_answer();
  }
  /**
   * @method isNegativeNumberLike
   * @description this method tests if the value
   * property of the current validator instance is
   * number or string which may be converted to number
   * and is negative.
   * @returns {validator}
   */
  get isNegativeNumberLike() {
    return this.is_negative_number_like();
  }
  /**
   * @method is_positive_number_like
   * @description this method tests if the value
   * property of the current validator instance
   * is positive number or string which may be
   * converted to positive number.
   * @returns {validator}
   */
  is_positive_number_like() {
    this.#question = models.IsPositiveNumberLike(this.value);
    return this.#set_answer();
  }
  /**
   * @method isPositiveNumberLike
   * @description this method tests if the value
   * property of the current validator instance is positive
   * number or a string which may be converted to
   * positive number.
   * @returns {validator}
   */
  get isPositiveNumberLike() {
    return this.is_positive_number_like();
  }
  /**
   * @method is_negative_integer_like
   * @description this method tests if the value
   * property of the current validator instance is
   * negative integer or a string which may be
   * converted to negative integer.
   * @returns {validator}
   */
  is_negative_integer_like() {
    this.#question = models.IsNegativeIntegerLike(this.value);
    return this.#set_answer();
  }
  /**
   * @method isNegativeIntegerLike
   * @description this method tests if the value
   * property of the current validator instance is
   * negative integer or a string which may be
   * converted to negative integer.
   * @returns {validator}
   */
  get isNegativeIntegerLike() {
    return this.is_negative_integer_like();
  }
  /**
   * @method is_positive_integer_like
   * @description this method tests if the value
   * property of the current validator instance is
   * positive integer or is a string which may be
   * converted to positive integer.
   * @returns {validator}
   */
  is_positive_integer_like() {
    this.#question = models.IsPositiveIntegerLike(this.value);
    return this.#set_answer();
  }
  /**
   * @method isPositiveIntegerLike
   * @description this method tests if the
   * value property of the current validator
   * instance is positive integer or a string
   * which may be converted to positive integer.
   * @returns {validator}
   */
  get isPositiveIntegerLike() {
    return this.is_positive_integer_like();
  }
  /**
   * @method is_bigger_than()
   * @param {number} a a real number that
   * has to be lesser or equal to than the
   * validator instance value property.
   * @returns {validator}
   * @description a method that checks if the
   * value property of the current validator
   * instance is bigger than a real number, say a
   * and sets the answer property of the returned
   * validator instance to true or false respectively.
   */
  is_bigger_than(a) {
    if (new validator(a).Not.isNumber.answer) {
      errors.IncorrectArgumentInIsBiggerThan();
    }
    if (this.copy().isNumber.answer) {
      this.#question = this.value > a;
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method is_lesser_than(a)
   * @param {number} a a real number that
   * has to be greater or equal to the current
   * value property of the validator instance.
   * @returns {validator}
   * @description this method checks if the value
   * property of the current validator instance is
   * lesser than a real number say a, and sets the
   * answer property of the returned validator instance
   * to true or false respectively.
   */
  is_lesser_than(a) {
    if (new validator(a).Not.isNumber.answer) {
      errors.IncorrectArgumentInIsLesserThan();
    }
    if (this.copy().isNumber.answer) {
      this.#question = this.value < a;
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method is_in_range(a, b)
   * @param {number} a a real number that has to
   * be smaller than the value property
   * of the current validator instance.
   * @param {number} b a real number that has to be
   * greater than the value property of the current
   * validator instance.
   * @returns {validator}
   * @description a method that checks if the validator
   * value property is in the open interval range (a, b)
   * and sets the answer property of the returned validator
   * instance to true or false respectively.
   */
  is_in_range(a, b) {
    if (new validator([a, b]).Not.isNumberArray.answer) {
      errors.IncorrectArgumentsInIsInRange();
    }
    if (a >= b) errors.IncorrectArgumentsInIsInRange();
    this.#question = this.copy()
      .isNumber
      .And
      .is_bigger_than(a)
      .And
      .is_lesser_than(b).answer;
    return this.#set_answer();
  }
  /**
   * @method is_in_closed_range
   * @param {number} a a real number that has to
   * be smaller than or equal to the current value
   * property of the validator instance.
   * @param {number} b a real number that has to be
   * greater or equal to the current value property
   * of the validator instance.
   * @description  a method that checks if the value of
   * the current value property is in the closed range
   * of the real numbers , say [a, b] and sets the answer property
   * of the validator instance to true or false respectively.
   */
  is_in_closed_range(a, b) {
    if (new validator([a, b]).Not.isNumberArray.answer) {
      errors.IncorrectArgumentsInIsInClosedRange();
    }
    if (a >= b) errors.IncorrectArgumentsInIsInClosedRange();
    this.#question = this.copy()
      .is_equal_or_lesser_than(b)
      .And.is_equal_or_bigger_than(a).answer;
    return this.#set_answer();
  }
  /**
   * @method equal_or_bigger_than
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
  is_equal_or_bigger_than(a) {
    if (new validator(a).Not.isNumber.answer) {
      errors.IncorrectArgumentInIsEqualOrBiggerThan();
    }
    this.#question = this.copy()
      .is_same(a).Or.is_bigger_than(a).answer;
    return this.#set_answer();
  }
  /**
   * @method equal_or_lesser_than
   * @param {number} a a real number that has
   * to be greater or equal to the current value
   * property of the validator instance.
   * @returns {validator}
   * @description a method that checks if the value
   * property of the current validator instance is
   * lesser or equal to a real number say a and sets
   * the answer property of the returned validator
   * instance to true or false respectively.
   */
  is_equal_or_lesser_than(a) {
    if (new validator(a).Not.isNumber.answer) {
      errors.IncorrectArgumentInIsEqualOrLesserThan();
    }
    this.#question = this.copy()
      .is_same(a).Or.is_lesser_than(a).answer;
    return this.#set_answer();
  }
  /**
   * @method is_array()
   * @returns {validator}
   * @description a method that checks if
   * the value of the current validator instance
   * is of array type and sets the answer property
   * of the returned validator instance to true or
   * false respectively.
   */
  is_array() {
    this.#question = models.IsArray(this.value);
    return this.#set_answer();
  }
  /**
   * @method isArray
   * @returns {validator}
   * @description this method is the getter variant
   * of the is_array() method of the validator library.
   */
  get isArray() {
    return this.is_array();
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
    if (this.copy().isArray.answer) {
      this.#question = models.IsNumberArray(this.value);
    } else this.#question = false;
    return this.#set_answer();
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
    this.#question = true;
    if (this.copy().isArray.answer) {
     this.#question = models.IsIntegerArray(this.value); 
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
    if (this.copy().isArray.answer) {
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
    if (this.isArray.answer) {
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
    this.#question = true;
    if (this.copy().isArray.answer) {
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
    if (this.copy().isArray.answer) {
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
    this.#question = true;
    new validator(a).isInteger
      .And.bind(new validator(b).isInteger)
      .And.bind(
        new validator(a).is_lesser_than(b),
      ).on(false, () => errors.IllegalParametersInIsArrayOfIntegersInRange());
    if (this.copy().Not.isArray.answer) this.#question = false;
    else {
      const n = this.value.length;
      let i, j;
      for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (
          this.value[j] !== (this.value[j] | 0) ||
          (this.value[j] <= a || this.value[j] >= b)
        ) {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (
          this.value[j] !== (this.value[j] | 0) ||
          (this.value[j] <= a || this.value[j] >= b)
        ) {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (
          this.value[j] !== (this.value[j] | 0) ||
          (this.value[j] <= a || this.value[j] >= b)
        ) {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (
          this.value[j] !== (this.value[j] | 0) ||
          (this.value[j] <= a || this.value[j] >= b)
        ) {
          this.#question = false;
          break;
        }
      }
      if ((n % 4 >= 3) && this.#question) {
        j = n - 3;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
        } else if (
          this.value[j] !== (this.value[j] | 0) ||
          (this.value[j] <= a || this.value[j] >= b)
        ) {
          this.#question = false;
        }
      }
      if ((n % 4 >= 2) && this.#question) {
        j = n - 2;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
        } else if (
          this.value[j] !== (this.value[j] | 0) ||
          (this.value[j] <= a || this.value[j] >= b)
        ) {
          this.#question = false;
        }
      }
      if ((n % 4 >= 1) && this.#question) {
        j = n - 1;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
        } else if (
          this.value[j] !== (this.value[j] | 0) ||
          (this.value[j] <= a || this.value[j] >= b)
        ) {
          this.#question = false;
        }
      }
    }
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
    new validator(a).isNumber
      .And.bind(new validator(b).isNumber)
      .And.bind(
        new validator(a).is_lesser_than(b),
      ).on(
        false,
        () => errors.IllegalParametersInIsArrayOfIntegersInClosedRange(),
      );
    this.#question = true;
    if (this.copy().isArray.answer) {
      const n = this.value.length;
      let i, j;
      for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (
          this.value[j] !== (this.value[j] | 0) || this.value[j] < a ||
          this.value[j] > b
        ) {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (
          this.value[j] !== (this.value[j] | 0) || this.value[j] < a ||
          this.value[j] > b
        ) {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (
          this.value[j] !== (this.value[j] | 0) || this.value[j] < a ||
          this.value[j] > b
        ) {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (
          this.value[j] !== (this.value[j] | 0) || this.value[j] < a ||
          this.value[j] > b
        ) {
          this.#question = false;
          break;
        }
      }
      if (this.#question && (n % 4 >= 3)) {
        j = n - 3;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
        } else if (
          this.value[j] !== (this.value[j] | 0) || this.value[j] < a ||
          this.value[j] > b
        ) {
          this.#question = false;
        }
      }
      if (this.#question && (n % 4 >= 2)) {
        j = n - 2;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
        } else if (
          this.value[j] !== (this.value[j] | 0) || this.value[j] < a ||
          this.value[j] > b
        ) {
          this.#question = false;
        }
      }
      if (this.#question && (n % 4 >= 1)) {
        j = n - 1;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
        } else if (
          this.value[j] !== (this.value[j] | 0) || this.value[j] < a ||
          this.value[j] > b
        ) {
          this.#question = false;
        }
      }
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
    new validator(a).isNumber
      .And.bind(new validator(b).isNumber)
      .And.bind(
        new validator(a).is_lesser_than(b),
      ).on(false, () => errors.IllegalParametersInIsArrayOfNumbersInRange());
    this.#question = true;
    // check if every element of the array is a number
    // which belong in the open interval (a, b):
    if (this.copy().isArray.answer) {
      const n = this.value.length;
      let i, j;
      for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (this.value[j] <= a || this.value[j] >= b) {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (this.value[j] <= a || this.value[j] >= b) {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (this.value[j] <= a || this.value[j] >= b) {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (this.value[j] <= a || this.value[j] >= b) {
          this.#question = false;
          break;
        }
      }
      if ((n % 4 >= 3) && this.#question) {
        j = n - 3;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
        } else if (this.value[j] <= a || this.value[j] >= b) {
          this.#question = false;
        }
      }
      if ((n % 4 >= 2) && this.#question) {
        j = n - 2;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
        } else if (this.value[j] <= a || this.value[j] >= b) {
          this.#question = false;
        }
      }
      if ((n % 4 >= 1) && this.#question) {
        j = n - 1;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
        } else if (this.value[j] <= a || this.value[j] >= b) {
          this.#question = false;
        }
      }
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
    new validator(a).isNumber
      .And.bind(new validator(b).isNumber)
      .And.bind(
        new validator(a).is_lesser_than(b),
      ).on(
        false,
        () => errors.IllegalParametersInIsArrayOfNumbersInClosedRange(),
      );
    // check if every element of the array is number in the interval [a, b].
    this.#question = true;
    if (this.copy().isArray.answer) {
      const n = this.value.length;
      let i, j;
      for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (this.value[j] < a || this.value[j] > b) {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (this.value[j] < a || this.value[j] > b) {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (this.value[j] < a || this.value[j] > b) {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
          break;
        } else if (this.value[j] < a || this.value[j] > b) {
          this.#question = false;
          break;
        }
      }
      if (this.#question && (n % 4 >= 3)) {
        j = n - 3;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
        } else if (this.value[j] < a || this.value[j] > b) {
          this.#question = false;
        }
      }
      if (this.#question && (n % 4 >= 2)) {
        j = n - 2;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
        } else if (this.value[j] < a || this.value[j] > b) {
          this.#question = false;
        }
      }
      if (this.#question && (n % 4 >= 1)) {
        j = n - 1;
        if (typeof this.value[j] !== "number") {
          this.#question = false;
        } else if (this.value[j] < a || this.value[j] > b) {
          this.#question = false;
        }
      }
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
    this.#question = true;
    if (this.copy().isArray.answer) {
      const n = this.value.length;
      let i, j;
      for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (typeof this.value[j] !== "function") {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "function") {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "function") {
          this.#question = false;
          break;
        }
        ++j;
        if (typeof this.value[j] !== "function") {
          this.#question = false;
          break;
        }
      }
      if ((n % 4 >= 3) && this.#question) {
        j = n - 3;
        if (typeof this.value[j] !== "function") {
          this.#question = false;
        }
      }
      if ((n % 4 >= 2) && this.#question) {
        j = n - 2;
        if (typeof this.value[j] !== "function") {
          this.#question = false;
        }
      }
      if ((n % 4 >= 1) && this.#question) {
        j = n - 1;
        if (typeof this.value[j] !== "function") {
          this.#question = false;
        }
      }
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
    this.#question = true;
    let i, j, cp_arr = this.copy();
    if (cp_arr.isArray.answer) {
      const n = this.value.length;
      for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (!new validator(this.value[j]).isObject.answer) {
          this.#question = false;
          break;
        }
        ++j;
        if (!new validator(this.value[j]).isObject.answer) {
          this.#question = false;
          break;
        }
        ++j;
        if (!new validator(this.value[j]).isObject.answer) {
          this.#question = false;
          break;
        }
        ++j;
        if (!new validator(this.value[j]).isObject.answer) {
          this.#question = false;
          break;
        }
      }
      if (this.#question && (n % 4 >= 3)) {
        j = n - 3;
        if (!new validator(this.value[j]).isObject.answer) {
          this.#question = false;
        }
      }
      if (this.#question && (n % 4 >= 2)) {
        j = n - 2;
        if (!new validator(this.value[j]).isObject.answer) {
          this.#question = false;
        }
      }
      if (this.#question && (n % 4 >= 1)) {
        j = n - 1;
        if (!new validator(this.value[j]).isObject.answer) {
          this.#question = false;
        }
      }
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
    this.#question = true;
    if (this.copy().isArray.answer) {
      const n = this.value.length,
        is_first_item_array = new validator(this.value[0]).isArray.answer;
      let i, j;
      if (is_first_item_array) {
        const m = this.value[0].length;
        for (i = 0; i < n >> 2; i++) {
          j = i << 2;
          if (!new validator(this.value[j]).isArray.And.has_length(m).answer) {
            this.#question = false;
            break;
          }
          ++j;
          if (!new validator(this.value[j]).isArray.And.has_length(m).answer) {
            this.#question = false;
            break;
          }
          ++j;
          if (!new validator(this.value[j]).isArray.And.has_length(m).answer) {
            this.#question = false;
            break;
          }
          ++j;
          if (!new validator(this.value[j]).isArray.And.has_length(m).answer) {
            this.#question = false;
            break;
          }
        }
        if (this.#question && (n % 4 >= 3)) {
          j = n - 3;
          if (!new validator(this.value[j]).isArray.And.has_length(m).answer) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 2)) {
          j = n - 2;
          if (!new validator(this.value[j]).isArray.And.has_length(m).answer) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 1)) {
          j = n - 1;
          if (!new validator(this.value[j]).isArray.And.has_length(m).answer) {
            this.#question = false;
          }
        }
      } else this.#question = false;
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
    this.#question = true;
    if (this.copy().isArray.answer) {
      const is_first_item_array = new validator(this.value[0]).isArray.answer;
      const n = this.value.length;
      let i, j;
      if (is_first_item_array) {
        for (i = 0; i < n >> 2; i++) {
          j = i << 2;
          if (!new validator(this.value[j]).isNumberArray.answer) {
            this.#question = false;
            break;
          }
          ++j;
          if (!new validator(this.value[j]).isNumberArray.answer) {
            this.#question = false;
            break;
          }
          ++j;
          if (!new validator(this.value[j]).isNumberArray.answer) {
            this.#question = false;
            break;
          }
          ++j;
          if (!new validator(this.value[j]).isNumberArray.answer) {
            this.#question = false;
            break;
          }
        }
        if (this.#question && (n % 4 >= 3)) {
          j = n - 3;
          if (!new validator(this.value[j]).isNumberArray.answer) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 2)) {
          j = n - 2;
          if (!new validator(this.value[j]).isNumberArray.answer) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 1)) {
          j = n - 1;
          if (!new validator(this.value[j]).isNumberArray.answer) {
            this.#question = false;
          }
        }
      } else this.#question = false;
    } else this.#question = false;
    return this.#set_answer();
  }
  is_array_of_number_arrays_with_equal_size() {
    return this.isArrayOfNumberArraysWithEqualSize;
  }
  get isArrayOfNumberArraysWithEqualSize() {
    this.#question = true;
    if (this.copy().isArray.answer) {
      const is_first_item_array = new validator(this.value[0]).isArray.answer;
      const n = this.value.length;
      if (is_first_item_array) {
        const m = this.value[0].length;
        let i, j;
        for (i = 0; i < n >> 2; i++) {
          j = i << 2;
          if (
            !new validator(this.value[j]).isNumberArray.And.has_length(m).answer
          ) {
            this.#question = false;
            break;
          }
          ++j;
          if (
            !new validator(this.value[j]).isNumberArray.And.has_length(m).answer
          ) {
            this.#question = false;
            break;
          }
          ++j;
          if (
            !new validator(this.value[j]).isNumberArray.And.has_length(m).answer
          ) {
            this.#question = false;
            break;
          }
          ++j;
          if (
            !new validator(this.value[j]).isNumberArray.And.has_length(m).answer
          ) {
            this.#question = false;
            break;
          }
        }
        if (this.#question && (n % 4 >= 3)) {
          j = n - 3;
          if (
            !new validator(this.value[j]).isNumberArray.And.has_length(m).answer
          ) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 2)) {
          j = n - 2;
          if (
            !new validator(this.value[j]).isNumberArray.And.has_length(m).answer
          ) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 1)) {
          j = n - 1;
          if (
            !new validator(this.value[j]).isNumberArray.And.has_length(m).answer
          ) {
            this.#question = false;
          }
        }
      } else this.#question = false;
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
    this.#question = true;
    if (this.copy().isArray.answer) {
      const is_first_item_array = new validator(this.value[0]).isArray.answer;
      const n = this.value.length;
      if (is_first_item_array) {
        let i, j;
        for (i = 0; i < n >> 2; i++) {
          j = i << 2;
          if (!new validator(this.value[0]).isIntegerArray.answer) {
            this.#question = false;
            break;
          }
          ++j;
          if (!new validator(this.value[0]).isIntegerArray.answer) {
            this.#question = false;
            break;
          }
          ++j;
          if (!new validator(this.value[0]).isIntegerArray.answer) {
            this.#question = false;
            break;
          }
          ++j;
          if (!new validator(this.value[0]).isIntegerArray.answer) {
            this.#question = false;
            break;
          }
        }
        if (this.#question && (n % 4 >= 3)) {
          j = n - 3;
          if (!new validator(this.value[0]).isIntegerArray.answer) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 2)) {
          j = n - 2;
          if (!new validator(this.value[0]).isIntegerArray.answer) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 1)) {
          j = n - 1;
          if (!new validator(this.value[0]).isIntegerArray.answer) {
            this.#question = false;
          }
        }
      } else this.#question = false;
    } else this.#question = false;
    return this.#set_answer();
  }
  is_array_of_integer_arrays_with_equal_size() {
    return this.isArrayOfIntegerArraysWithEqualSize;
  }
  get isArrayOfIntegerArraysWithEqualSize() {
    this.#question = true;
    if (this.copy().isArray.answer) {
      const is_first_item_array = new validator(this.value[0]).isArray.answer;
      const n = this.value.length;
      if (is_first_item_array) {
        const m = this.value[0].length;
        let i, j;
        for (i = 0; i < n >> 2; i++) {
          j = i << 2;
          if (
            !new validator(this.value[j]).isIntegerArray.And.has_length(m)
              .answer
          ) {
            this.#question = false;
            break;
          }
          ++j;
          if (
            !new validator(this.value[j]).isIntegerArray.And.has_length(m)
              .answer
          ) {
            this.#question = false;
            break;
          }
          ++j;
          if (
            !new validator(this.value[j]).isIntegerArray.And.has_length(m)
              .answer
          ) {
            this.#question = false;
            break;
          }
          ++j;
          if (
            !new validator(this.value[j]).isIntegerArray.And.has_length(m)
              .answer
          ) {
            this.#question = false;
            break;
          }
        }
        if (this.#question && (n % 4 >= 3)) {
          j = n - 3;
          if (
            !new validator(this.value[j]).isIntegerArray.And.has_length(m)
              .answer
          ) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 2)) {
          j = n - 2;
          if (
            !new validator(this.value[j]).isIntegerArray.And.has_length(m)
              .answer
          ) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 1)) {
          j = n - 1;
          if (
            !new validator(this.value[j]).isIntegerArray.And.has_length(m)
              .answer
          ) {
            this.#question = false;
          }
        }
      } else this.#question = false;
    } else this.#question = false;
    return this.#set_answer();
  }
  is_array_of_string_arrays() {
    return this.isArrayOfStringArrays;
  }
  get isArrayOfStringArrays() {
    this.#question = true;
    if (this.copy().isArray.answer) {
      const is_first_item_array = new validator(this.value[0]).isArray.answer;
      const n = this.value.length;
      if (is_first_item_array) {
        let i, j;
        for (i = 0; i < n >> 2; i++) {
          j = i << 2;
          if (!new validator(this.value[j]).isStringArray.answer) {
            this.#question = false;
            break;
          }
          ++j;
          if (!new validator(this.value[j]).isStringArray.answer) {
            this.#question = false;
            break;
          }
          ++j;
          if (!new validator(this.value[j]).isStringArray.answer) {
            this.#question = false;
            break;
          }
          ++j;
          if (!new validator(this.value[j]).isStringArray.answer) {
            this.#question = false;
            break;
          }
        }
        if (this.#question && (n % 4 >= 3)) {
          j = n - 3;
          if (!new validator(this.value[j]).isStringArray.answer) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 2)) {
          j = n - 2;
          if (!new validator(this.value[j]).isStringArray.answer) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 1)) {
          j = n - 1;
          if (!new validator(this.value[j]).isStringArray.answer) {
            this.#question = false;
          }
        }
      } else this.#question = false;
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
    this.#question = true;
    if (this.copy().isArray.answer) {
      const is_first_item_array = new validator(this.value[0]).isArray.answer;
      const n = this.value.length;
      if (is_first_item_array) {
        const m = this.value[0].length;
        let i, j;
        for (i = 0; i < n >> 2; i++) {
          j = i << 2;
          if (
            !new validator(this.value[j]).isStringArray.And.has_length(m).answer
          ) {
            this.#question = false;
            break;
          }
          ++j;
          if (
            !new validator(this.value[j]).isStringArray.And.has_length(m).answer
          ) {
            this.#question = false;
            break;
          }
          ++j;
          if (
            !new validator(this.value[j]).isStringArray.And.has_length(m).answer
          ) {
            this.#question = false;
            break;
          }
          ++j;
          if (
            !new validator(this.value[j]).isStringArray.And.has_length(m).answer
          ) {
            this.#question = false;
            break;
          }
        }
        if (this.#question && (n % 4 >= 3)) {
          j = n - 3;
          if (
            !new validator(this.value[j]).isStringArray.And.has_length(m).answer
          ) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 2)) {
          j = n - 2;
          if (
            !new validator(this.value[j]).isStringArray.And.has_length(m).answer
          ) {
            this.#question = false;
          }
        }
        if (this.#question && (n % 4 >= 1)) {
          j = n - 1;
          if (
            !new validator(this.value[j]).isStringArray.And.has_length(m).answer
          ) {
            this.#question = false;
          }
        }
      } else this.#question = false;
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method is_array_with_elements_that_satisfy
   * @param {{conditions : string}} options
   * an object parameter
   * with condition key property with
   * string value that is a legal validator
   * expression method or a string that is
   * a legal validator method expression.
   * @example
   * let a =new validator([12, 'a', 9, 'b', 6, 'c'])
   * .is_array_with_elements_that_satisfy({
   * conditions : 'is_number().or().is_string()'
   * })
   * // output:
   * console.log(a.answer) // --> true
   * @description a method that checks if every element
   * of its content satisfy a condition and sets the
   * answer property to true or false respectively.
   * @deprecated
   */
  is_array_with_elements_that_satisfy(options) {
    let i,
      k,
      temp_methods,
      temp_validator,
      methods = Object.getOwnPropertyNames(validator.prototype),
      conditions,
      tmpv,
      areLegalMethods,
      step = "Initialization";
    while (step) {
      switch (step) {
        case "Initialization":
          if (this.copy().not().is_array().answer) {
            this.description = `In the validator method ` +
              `"is_array_with_elements_that_satisfy" the value` +
              `property is not of array type.Error value type.`;
            step = "Error or false result";
          }
          if (new validator(options).is_string().answer) {
            options = { conditions: options };
            step = "Preparation";
          } else if (
            new validator(options)
              .interface2({
                conditions: (c) => c.is_string().is_required(),
              }).answer
          ) {
            step = "Preparation";
          } else {
            this.description = `In the validator method ` +
              `"is_array_with_elements_that_satisfy" the argument options ` +
              `is not of object type with conditions key parameter.Error incorrect parameter.`;
            step = "Error or false result";
          }
          break;
        case "Preparation":
          conditions = options.conditions;
          temp_methods = conditions.split(".");
          step = "Is validator-type expressions";
          break;
        case "Is validator-type expressions":
          for (i = 0; i < temp_methods.length; i++) {
            for (k = 0; k < methods.length; k++) {
              tmpv = temp_methods[i].split(methods[k]);
              if (tmpv.length === 1) areLegalMethods = false;
              else if (
                tmpv[0] === "" &&
                tmpv[1][0] === "(" &&
                tmpv[1][tmpv[1].length - 1] === ")"
              ) {
                areLegalMethods = true;
                temp_methods[i] = {
                  method: methods[k],
                  argument: eval(
                    tmpv[1].substring(0, tmpv[1][tmpv[1].length - 1]),
                  ),
                };
                break;
              } else areLegalMethods = false;
            }
            if (!areLegalMethods) break;
          }
          if (!areLegalMethods) {
            this.description = `In the validator method ` +
              `"is_array_with_elements_that_satisfy" the ` +
              `method ${conditions.split(".")[i]} is illegal ` +
              `validator expression method.Error invalid validator method.`;
            step = "Error or false result";
          } else {
            i = 0;
            step = "Validate array data";
          }
          break;
        case "Validate array data":
          if (i === this.value.length) step = "Return true and success result";
          else {
            temp_validator = new validator(this.value[i]);
            temp_methods.forEach((temp_method) => {
              let method = temp_method.method,
                argument = temp_method.argument;
              temp_validator = temp_validator[method](argument);
            });
            if (temp_validator.answer) ++i;
            else {
              this.description = `In the validator method ` +
                `"is_array_with_elements_that_satisfy" the element ${i} of the ` +
                `value array, i.e. ${
                  this.value[i]
                } do not satisfy the required conditions.` +
                `Successful executed method.`;
              step = "Error or false result";
            }
          }
          break;
        case "Error or false result":
          this.#question = false;
          step = 0;
          break;
        case "Return true and success result":
          this.#question = true;
          step = 0;
          break;
      }
    }
    return this.#set_answer();
  }
  /**
   * @method is_object()
   * @returns {validator}
   * @description a method that checks if the
   * value property of the current validator
   * instance is an object and sets the answer
   * property of the returned validator instance to
   * true or false respectively.
   */
  is_object() {
    this.#question =
      Object.prototype.toString.call(this.value) === "[object Object]";
    return this.#set_answer();
  }
  /**
   * @method isObject
   * @returns {validator}
   * @description this method is a getter variant of the
   * is_object() method of the validator library.
   */
  get isObject() {
    return this.is_object();
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
    this.copy().is_undefined()
      .on(true, () => {
        this.#question = true;
      })
      .on(false, () => {
        if (this.copy().is_array().answer) {
          this.#question = this.value.length === 0;
        } else if (this.copy().is_object().answer) {
          this.#question = Object.keys(this.value).length === 0;
        } else if (this.copy().is_string().answer) {
          this.#question = this.value === "";
        } else errors.IncorrectArgumentInIsEmpty();
      });
    return this.#set_answer();
  }
  /**
   * @method isEmpty
   * @returns {validator}
   * @description this method is a getter variant of the
   * is_empty() method of the validator library.
   */
  get isEmpty() {
    return this.is_empty();
  }
  /**
   * @method for_all
   * @param {function(validator, number)} callback
   * @description This method can
   * be active if and only if the
   * this.value is of type array
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
    let i, keys, item;
    // check if the parameters are correct
    callback_val.is_function()
      .on(false, () => {
        errors.IncorrectFunctionArgumentInForAll();
      })
      .on(true, () => {
        val.isArray
          .on(true, () => {
            // the parameters are correct
            // and we have to check every
            // element (key value) of the
            // array (object). Case array:
            /*for (i = 0; i < val.value.length; i++) {
                            item = new validator(val.value[i])
                            if (callback(item, i).answer) {
                                this.#question = true
                            }
                            else {
                                this.#question = false
                                break
                            }
                        }*/
            for (i = 0; i < val.value.length >> 2; i++) {
              item = new validator(val.value[i << 2]);
              if (callback(item, i << 2).answer) {
                this.#question = true;
              } else {
                this.#question = false;
                break;
              }
              item = new validator(val.value[(i << 2) + 1]);
              if (callback(item, (i << 2) + 1).answer) {
                this.#question = true;
              } else {
                this.#question = false;
                break;
              }
              item = new validator(val.value[(i << 2) + 2]);
              if (callback(item, (i << 2) + 2).answer) {
                this.#question = true;
              } else {
                this.#question = false;
                break;
              }
              item = new validator(val.value[(i << 2) + 3]);
              if (callback(item, (i << 2) + 3).answer) {
                this.#question = true;
              } else {
                this.#question = false;
                break;
              }
            }
            if (val.value.length % 4 >= 1 && this.#question !== false) {
              i = val.value.length - 1;
              item = new validator(val.value[i]);
              if (callback(item, i).answer) this.#question = true;
              else this.#question = false;
            }
            if (val.value.length % 4 >= 2 && this.#question !== false) {
              i = val.value.length - 2;
              item = new validator(val.value[i]);
              if (callback(item, i).answer) this.#question = true;
              else this.#question = false;
            }
            if (val.value.length % 4 >= 3 && this.#question !== false) {
              i = val.value.length - 3;
              item = new validator(val.value[i]);
              if (callback(item, i).answer) this.#question = true;
              else this.#question = false;
            }
          })
          .on(false, () => {
            // Here we will examine the
            // case in which the this.value
            // is object type...
            val.is_object().and()
              .not().is_empty()
              .on(true, () => {
                // get the keys of the
                // this.value and check
                // every value...
                keys = Object.keys(val.value);
                /*for (i = 0; i < keys.length; i++) {
                                    item = new validator(val.value[keys[i]])
                                    if (callback(item, i).answer) this.#question = true;
                                    else {
                                        this.#question = false;
                                        break;
                                    }
                                }*/
                for (i = 0; i < keys.length >> 2; i++) {
                  item = new validator(val.value[keys[i << 2]]);
                  if (callback(item, i << 2).answer) {
                    this.#question = true;
                  } else {
                    this.#question = false;
                    break;
                  }
                  item = new validator(val.value[keys[(i << 2) + 1]]);
                  if (callback(item, (i << 2) + 1).answer) {
                    this.#question = true;
                  } else {
                    this.#question = false;
                    break;
                  }
                  item = new validator(val.value[keys[(i << 2) + 2]]);
                  if (callback(item, (i << 2) + 2).answer) {
                    this.#question = true;
                  } else {
                    this.#question = false;
                    break;
                  }
                  item = new validator(val.value[keys[(i << 2) + 3]]);
                  if (callback(item, (i << 2) + 3).answer) {
                    this.#question = true;
                  } else {
                    this.#question = false;
                    break;
                  }
                }
                if (keys.length % 4 >= 1 && this.#question !== false) {
                  i = keys.length - 1;
                  item = new validator(val.value[keys[i]]);
                  if (callback(item, i).answer) this.#question = true;
                  else this.#question = false;
                }
                if (keys.length % 4 >= 2 && this.#question !== false) {
                  i = keys.length - 2;
                  item = new validator(val.value[keys[i]]);
                  if (callback(item, i).answer) this.#question = true;
                  else this.#question = false;
                }
                if (keys.length % 4 >= 3 && this.#question !== false) {
                  i = keys.length - 3;
                  item = new validator(val.value[keys[i]]);
                  if (callback(item, i).answer) this.#question = true;
                  else this.#question = false;
                }
              })
              .on(false, () => {
                this.#question = false;
              });
          });
      });
    return this.#set_answer();
  }
  /**
   * @method for_any
   * @param {function(validator, number)} callback
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
    // Initializations:
    const val = this;
    const callback_val = new validator(callback);
    let i, keys, item;
    // Check if callback is correct:
    callback_val.is_function()
      .on(true, () => {
        // Check if the this.value is
        // array type and is not empty:
        val.copy().is_array().and()
          .not().is_empty()
          .on(true, () => {
            // this.value is array case...
            /*for (i = 0; i < val.value.length; i++) {
                            item = new validator(val.value[i])
                            if (callback(item, i).answer) {
                                this.#question = true
                                break
                            } else {
                                this.#question = false
                                continue
                            }
                        }*/
            for (i = 0; i < val.value.length >> 2; i++) {
              item = new validator(val.value[i << 2]);
              if (callback(item, i << 2).answer) {
                this.#question = true;
                break;
              } else this.#question = false;
              item = new validator(val.value[(i << 2) + 1]);
              if (callback(item, (i << 2) + 1).answer) {
                this.#question = true;
                break;
              } else this.#question = false;
              item = new validator(val.value[(i << 2) + 2]);
              if (callback(item, (i << 2) + 2).answer) {
                this.#question = true;
                break;
              } else this.#question = false;
              item = new validator(val.value[(i << 2) + 3]);
              if (callback(item, (i << 2) + 3).answer) {
                this.#question = true;
                break;
              } else this.#question = false;
            }
            if (val.value.length % 4 >= 1 && !this.#question) {
              i = val.value.length - 1;
              item = new validator(val.value[i]);
              if (callback(item, i).answer) this.#question = true;
              else this.#question = false;
            }
            if (val.value.length % 4 >= 2 && !this.#question) {
              i = val.value.length - 2;
              item = new validator(val.value[i]);
              if (callback(item, i).answer) this.#question = true;
              else this.#question = false;
            }
            if (val.value % 4 >= 3 && !this.#question) {
              i = val.value.length - 3;
              item = new validator(val.value[i]);
              if (callback(item, i).answer) this.#question = true;
              else this.#question = false;
            }
          })
          .on(false, () => {
            // Check if this.value is
            // an object non empty instance
            val.copy().is_object().and()
              .not().is_empty()
              .on(true, () => {
                // this.value is non empty object
                keys = Object.keys(val.value);
                /*for (i = 0; i < keys[i].length; i++) {
                                    item = new validator(val.value[keys[i]])
                                    if (callback(item, i).answer) {
                                        this.#question = true
                                        break
                                    } else {
                                        this.#question = false
                                        continue
                                    }
                                }*/
                for (i = 0; i < keys.length >> 2; i++) {
                  item = new validator(val.value[keys[i << 2]]);
                  if (callback(item, i << 2).answer) {
                    this.#question = true;
                    break;
                  } else this.#question = false;
                  item = new validator(val.value[keys[(i << 2) + 1]]);
                  if (callback(item, (i << 2) + 1).answer) {
                    this.#question = true;
                    break;
                  }
                  this.#question = false;
                  item = new validator(val.value[keys[(i << 2) + 2]]);
                  if (callback(item, (i << 2) + 2).answer) {
                    this.#question = true;
                    break;
                  } else this.#question = false;
                  item = new validator(val.value[keys[(i << 2) + 3]]);
                  if (callback(item, (i << 2) + 3).answer) {
                    this.#question = true;
                    break;
                  } else this.#question = false;
                }
                if (keys.length % 4 >= 1 && !this.#question) {
                  i = keys.length - 1;
                  item = new validator(val.value[keys[i]]);
                  if (callback(item, i).answer) this.#question = true;
                  else this.#question = false;
                }
                if (keys.length % 4 >= 2 && !this.#question) {
                  i = keys.length - 2;
                  item = new validator(val.value[keys[i]]);
                  if (callback(item, i).answer) this.#question = true;
                  else this.#question = false;
                }
                if (keys.length % 4 >= 3 && !this.#question) {
                  i = keys.length - 3;
                  if (callback(item, i).answer) this.#question = true;
                  else this.#question = false;
                }
              })
              .on(false, () => errors.IllegalTypeInForAny(this.value));
          });
      })
      .on(false, () => {
        errors.IncorrectFunctionArgumentInForAny();
      });
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
    if (cp_instance.is_array().or().is_string().answer) {
      this.#question = this.value.length === n;
    } else if (cp_instance.isObject.answer) {
      this.#question = Object.keys(cp_instance.value).length === n;
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
    if (cp_instance.isArray.Or.isString.answer) {
      this.#question = this.value.length > n;
    } else if (cp_instance.isObject.answer) {
      this.#question = Object.keys(cp_instance.value).length > n;
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
    if (cp_instance.isArray.Or.isString.answer) {
      this.#question = this.value.length >= n;
    } else if (cp_instance.isObject.answer) {
      this.#question = Object.keys(cp_instance.value).length >= n;
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
    if (cp_instance.isArray.Or.isString.answer) {
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
    if (cp_instance.isArray.Or.isString.answer) {
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
    if (cp_instance.isArray.Or.isString.answer) {
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
    if (cp_instance.isArray.Or.isString.answer) {
      this.#question = this.value.length >= a && this.value.length <= b;
    } else if (cp_instance.isObject.answer) {
      const len = Object.keys(cp_instance.value).length;
      this.#question = len >= a && len <= b;
    } else this.#question = false;
    return this.#set_answer();
  }
  /**
   * @method is_this_string_contains_expression_k_times
   * @param {string | object} options
   * @description this method checks if
   * a given string contains an expression
   * k times, where the k is an integer.
   * If the options is string, the k is
   * assumed to be equals to 1, otherwise
   * if options is an object, then it has
   * to contains the properties "expression"
   * and "count". If "count" do not exists
   * then is assumed to be equals to 1 (k = 1).
   */
  is_this_string_contains_expression_k_times(options) {
    // initializations:
    let k;
    // check if the validator value
    // is string
    if (this.not().is_string().answer) {
      this.#question = false;
    } else {
      const opt_validator = new validator(options);
      // check if options
      // is correctly inserted.
      opt_validator
        .not().is_string()
        .and()
        .not().is_object()
        .on(true, () => errors.IncorrectArgumentInStringContainsExpression())
        .on(false, () => {
          // if options is string
          // then assume k or the
          // count to be equals to 1.
          opt_validator.copy()
            .is_string()
            .on(true, () => {
              k = 1;
              // get the length of
              // the options (string)
              let ol = opt_validator.value.length;
              // search into the string
              let s = String(this.value),
                count = 0;
              for (let i = 0; i < s.length - ol + 1; i++) {
                if (s.substring(i).startsWith(options)) {
                  ++count;
                  if (k === count) {
                    this.#question = true;
                    break;
                  } else this.#question = false;
                }
              }
            });
          opt_validator.copy()
            .is_object()
            .on(true, () => {
              // check if options.expression
              // is a legal string. If no throw Error
              new validator(options.expression)
                .not().is_undefined().and()
                .is_string()
                .on(true, () => {
                  // if options.count do not
                  // exists then assume k = 1
                  if (typeof options.count !== "number") k = 1;
                  else k = options.count | 0;
                  // search in the string
                  let c = 0;
                  let s = String(this.value);
                  let ol = options.expression.length;
                  let expression = options.expression;
                  for (let i = 0; i < s.length - ol + 1; i++) {
                    if (s.substring(i).startsWith(expression)) {
                      ++c;
                      if (k === c) {
                        this.#question = true;
                        break;
                      } else this.#question = false;
                    }
                  }
                })
                .on(false, () => {
                  errors.IncorrectTypeInStringContains();
                });
            });
        });
    }
    return this.#set_answer();
  }
  /**
   * @method is_function()
   * @returns {validator}
   * @description a method that checks if
   * the value property of the current validator
   * instance is a javascript function object and
   * sets the answer property of the returned validator
   * instance to true or false respectively.
   */
  is_function() {
    this.#question = this.value instanceof Function ||
      typeof this.value === "function";
    return this.#set_answer();
  }
  /**
   * @method isFunction
   * @returns {validator}
   * @description this method is a getter variant of the
   * is_function() validator method.
   */
  get isFunction() {
    return this.is_function();
  }
  /**
   * @param {Array | String | number} elements an array
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
    this.#question = this.copy().is_array().answer;
    let eltype = new validator(elements)
      .is_array()
      .or()
      .is_number()
      .or()
      .is_string().answer;
    if (this.#question && eltype) {
      // the value has to contain
      // all elements of the element.
      new validator(elements).is_array()
        .on(true, () => {
          this.#question = this.copy().for_all((item) => {
            return new validator(elements).for_any((element) =>
              element.is_same(item.value)
            );
          }).answer;
        }).on(
          false,
          () =>
            this.#question = this.copy().for_any((item) =>
              item.is_same(elements)
            ).answer,
        );
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
    if (param_type.is_string().or().is_number().answer) {
      this.#question = this.value === param;
    }
    if (
      param_type.copy()
        .is_array()
        .or().is_object()
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
   *     .and().bind(
   *         new validator('Alias').is_string().and().not().is_empty()
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
   *         a : a => {return a.is_number().and().is_integer()},
   *         rand : r => {return r.is_function()},
   *         sqrt : sqrt => {return sqrt.is_function()}
   *     }).answer // true
   */
  interface2(params) {
    new validator(params).is_object().and()
      .bind(this.copy().is_object())
      .on(false, () => this.#question = false)
      .on(true, () => {
        new validator(Object.keys(params)).not().is_empty()
          .and().bind(
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
   * @param {function (validator, number):validator} func_arg
   * @description this method gets like argument
   * a function with validator argument and returns
   * true if the function is true for every elements of
   * the array. If the value property of the validator
   * is not array or the func_arg parameter is not a function
   * then the function returns false.
   */
  is_array_and_for_every(func_arg) {
    let i, j, item, n;
    new validator(func_arg).is_function()
      .on(true, () => {
        new validator(this.value).is_array()
          .on(true, () => {
            n = this.value.length;
            /*for (let i = 0; i < this.value.length; i++) {
                            let item = this.value[i]
                            this.#question = func_arg(new validator(item), i).answer
                            new validator(this.#question).not().is_boolean()
                                .on(true, () => {
                                    throw new Error('Illegal usage of the argument function of the method. The function has to return validator type.')
                                })
                            if (this.#question) continue
                            else break
                        }*/
            for (i = 0; i < n >> 2; i++) {
              j = i << 2;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(
                  true,
                  () => errors.IllegalUsageOfArgumentInIsArrayAndForEvery(),
                );
              if (!this.#question) break;
              j = (i << 2) + 1;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(
                  true,
                  () => errors.IllegalUsageOfArgumentInIsArrayAndForEvery(),
                );
              if (!this.#question) break;
              j = (i << 2) + 2;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(
                  true,
                  () => errors.IllegalUsageOfArgumentInIsArrayAndForEvery(),
                );
              if (!this.#question) break;
              j = (i << 2) + 3;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(
                  true,
                  () => errors.IllegalUsageOfArgumentInIsArrayAndForEvery(),
                );
              if (!this.#question) break;
            }
            if (n % 4 >= 1 && this.#question !== false) {
              j = n - 1;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(
                  true,
                  () => errors.IllegalUsageOfArgumentInIsArrayAndForEvery(),
                );
            }
            if (n % 4 >= 2 && this.#question !== false) {
              j = n - 2;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(
                  true,
                  () => errors.IllegalUsageOfArgumentInIsArrayAndForEvery(),
                );
            }
            if (n % 4 >= 3 && this.#question !== false) {
              j = n - 3;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(
                  true,
                  () => errors.IllegalUsageOfArgumentInIsArrayAndForEvery(),
                );
            }
          }).on(false, () => this.#question = false);
      }).on(false, () => this.#question = false);
    return this.#set_answer();
  }
  /**
   * @method is_array_and_for_any
   * @param {function (validator, number)} func_arg
   * @returns {validator}
   * @description returns a validator instance that is
   * the result of the execution of the function of
   * all elements. The method stops if for some element the
   * validator is true.
   * @example
   * new validator([1, 2, 3, 4, 5, 6, 7])
   *     .is_array_and_for_any(element => {
   *         return element.is_integer().and().is_in_range(0, 8)
   *     }) // true value.
   */
  is_array_and_for_any(func_arg) {
    let j, item;
    new validator(func_arg).is_function()
      .on(true, () => {
        new validator(this.value).is_array()
          .on(true, () => {
            for (let i = 0; i < this.value.length >> 2; i++) {
              j = i << 2;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(true, () => {
                  errors.IncorrectArgumentInIsArrayAndForAny();
                });
              if (this.#question) break;
              ++j;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(true, () => {
                  errors.IncorrectArgumentInIsArrayAndForAny();
                });
              if (this.#question) break;
              ++j;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(true, () => {
                  errors.IncorrectArgumentInIsArrayAndForAny();
                });
              if (this.#question) break;
              ++j;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(true, () => {
                  errors.IncorrectArgumentInIsArrayAndForAny();
                });
              if (this.#question) break;
            }
            if (this.value.length % 4 >= 1 && !this.#question) {
              j = this.value.length - 1;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(true, () => {
                  errors.IncorrectArgumentInIsArrayAndForAny();
                });
            }
            if (this.value.length % 4 >= 2 && !this.#question) {
              j = this.value.length - 2;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(true, () => {
                  errors.IncorrectArgumentInIsArrayAndForAny();
                });
            }
            if (this.value.length % 4 >= 3 && !this.#question) {
              j = this.value.length - 3;
              item = this.value[j];
              this.#question = func_arg(new validator(item), j).answer;
              new validator(this.#question).not().is_boolean()
                .on(true, () => {
                  errors.IncorrectArgumentInIsArrayAndForAny();
                });
            }
          }).on(false, () => this.#question = false);
      }).on(false, () => this.#question = false);
    return this.#set_answer();
  }
  /**
   * @method on()
   * @param {boolean} state - true or false
   * @param {function(validator)} callback
   * the function that will be run when the condition of the
   * answer property has value equals to state.
   * @returns {validator}
   * @description This method is very significant for the
   * library. It execute a function recorded in the input
   * argument callback when the answer property is in state.
   */
  on(state, callback) {
    let incorrectState = new validator(state)
      .not()
      .is_boolean()
      .and().not()
      .is_same("true")
      .and().not()
      .is_same("false")
      .answer;
    let incorrectFunction = new validator(callback)
      .not().is_function()
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
  static version = version;
  static author = author;
}
export default validator;
