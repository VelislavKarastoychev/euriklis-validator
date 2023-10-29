"use strict";
export const ErrorMessage = "Euriklis validator error message:";
export const IllegalParametersInIsArrayOfIntegersInClosedRangeTxt =
  "Illegal parameters in the is_array_of_integers_in_closed_range() method. Note that the parameters of this method have to be numbers with the first parameter to be less than the second.";
export const IllegalParametersInIsArrayOfIntegersInRangeTxt =
  "Illegal parameters in the is_array_of_integers_in_range() method. The parameters have to be integers and the first to be smaller than the second.";
export const IllegalParametersInIsArrayOfNumbersInClosedRangeTxt =
  "Illegal parameters in is_array_of_numbers_in_closed_range(a, b) method. Note that the parameters of the method have to be numbers and in addition the first has to be smaller than the second.";
export const IllegalParametersInIsArrayOfNumbersInRangeTxt =
  "Illegal parameters in the is_array_of_numbers_in_range() method. Note that these parameters have to be numbers and in addition the first parameter has to be less than the second.";
export const IllegalTypeInForAnyTxt = (value) =>
  `Illegal type of the this.value in the "for_any" method of euriklis validator module. The value has to be array or object type. The value of the current validator is ${typeof value} type.`;
export const IllegalUsageOfArgumentInIsArrayAndForEveryTxt =
  "Illegal usage of the argument function of the method. The function has to return validator type.";
export const InappropriateValueInIsSameTxt =
  "Inappropriate value property of the validator instance in the isSame method. You may use this method only if the value is a primitive type, function (async, generator, arrow or conventional function), array, typed array, object or array buffer type.";
export const IncorrectArgumentInIsArrayAndForAnyTxt =
  "Error in the is_array_and_for_any(). Illegal argument in the parameter of the method.";
export const IncorrectArgumentInBindMethodTxt =
  "The argument has to be validator type.";
export const IncorrectArgumentInIsEmptyTxt =
  "This method can be used only for string, array and object types.";
export const IncorrectArgumentInIsEqual =
  "The argument of the method isEqual is not a valid real number";
export const IncorrectArgumentInIsEqualOrBiggerThanTxt =
  "Incorrect argument in the is_equal_or_bigger_than() method. Note that this argument has to be an arbitrary number.";
export const IncorrectArgumentInIsEqualOrLesserThanTxt =
  "Incorrect argument in is_equal_or_lesser_than() method. Note that the parameter has to be an arbitrary number.";
export const IncorrectArgumentInIsNotEqual =
  "The argument of the method has to be a valid real number.";
export const IncorrectArgumentInHasLengthTxt =
  "The argument of the has length method is not integer.";
export const IncorrectArgumentInHasLengthBiggerThanTxt =
  "Incorrect argument parameter in the has_length_bigger_than() method. Note that the parameter has to be an Integer.";
export const IncorrectArgumentInHasLengthEqualsOrBiggerThanTxt =
  "Incorrect argument in the has_length_equals_or_bigger_than() method of the current validator instance. Note that this parameter has to be an integer.";
export const IncorrectArgumentInHasLengthEqualsOrLesserThanTxt =
  "Incorrect argument in the has_length_equals_or_lesser_than() method. Note that the parameter has to be an integer.";
export const IncorrectArgumentInHasLengthLesserThanTxt =
  "Incorrect argument in the has_length_lesser_than() method. Note that the parameter has to be an integer number.";
export const IncorrectArgumentInIsBiggerThanTxt =
  "Incorrect argument parameter of the is_bigger_than() method. Note that this parameter has to be an arbitrary number.";
export const IncorrectArgumentInIsLesserThanTxt =
  "Incorrect argument parameter of the is_lesser_than() method. Note that this parameter has to be an arbitrary number.";
export const IncorrectArgumentInStringContainsExpressionTxt =
  'The argument of the "is_this_string_contains_expression_k_times" method has to be string or object type.';
export const IncorrectArgumentInInterfaceTxt =
  "The argument function of the interface method has to return a validator instance.";
export const IncorrectArgumentsInHasLengthInClosedRangeTxt =
  "Incorrect arguments in has_length_in_closed_range() method. Note that the both parameters have to be integers and the first parameter has to be smaller than the second.";
export const IncorrectArgumentsInHasLengthInRangeTxt =
  "Incorrect arguments in has_length_in_range() method. Note that the both parameters have to be integers with the first element to be smaller than the second.";
export const IncorrectArgumentsInIsInClosedRangeTxt =
  "Incorrect arguments in is_in_closed_range() method. Note that both of these arguments have to be numbers with the first argument to be smaller than the second.";
export const IncorrectArgumentsInIsInRangeTxt =
  "Incorrect arguments in the is_in_range() method of the validator instance. Note that these parameters have to be arbitrary numbers and in addition the first has to be smaller than the second.";
export const IncorrectDescriptionPropertyTxt = "Incorrectly defined description property. The description has to be a string or a number.";
export const IncorrectArgumentInIsInstanceofTxt =
  "Incorrect parameter instance. The instance has to be InstanceType.";
export const IncorrectFunctionArgumentInForAllTxt =
  "The callback argument of the for_all method of the euriklis validator module has to be function type.";
export const IncorrectFunctionArgumentInForAnyTxt =
  "The callback argument of the for_any method of the euriklis validator module has to be a function with argument a validator instance.";
export const IncorrectIterationsParameterInBenchmarkTxt =
  'Incorrect parameter iterations in the benchmark function. The "iterations" has to be a positive integer.';
export const IncorrectTypeInStringContainsTxt =
  'The expression property of the argument in the "is_this_string_contains_expression_k_times" method is incorrectly defined.';
