'use strict';
const ErrorMessage = 'Euriklis validator error message:';
const IllegalTypeInForAny = (value) => `Illegal type of the this.value in the "for_any" method of euriklis validator module. The value has to be array or object type. The value of the current validator is ${typeof value} type.`
const IllegalUsageOfArgumentInIsArrayAndForEvery = 'Illegal usage of the argument function of the method. The function has to return validator type.';
const IncorrectArgumentInIsArrayAndForAny = 'Error in the is_array_and_for_any(). Illegal argument in the parameter of the method.';
const IncorrectArgumentInBindMethod = 'The argument has to be validator type.';
const IncorrectArgumentInIsEmpty = 'This method can be used only for string, array and object types.';
const IncorrectArgumentInIsEqualOrBiggerThan = 'Incorrect argument in the is_equal_or_bigger_than() method. Note that this argument has to be an arbitrary number.';
const IncorrectArgumentInIsEqualOrLesserThan = 'Incorrect argument in is_equal_or_lesser_than() method. Note that the parameter has to be an arbitrary number.';
const IncorrectArgumentInHasLength = 'The argument of the has length method is not integer.';
const IncorrectArgumentInHasLengthBiggerThan = 'Incorrect argument parameter in the has_length_bigger_than() method. Note that the parameter has to be an Integer.';
const IncorrectArgumentInHasLengthEqualsOrBiggerThan = 'Incorrect argument in the has_length_equals_or_bigger_than() method of the current validator instance. Note that this parameter has to be an integer.';
const IncorrectArgumentInHasLengthEqualsOrLesserThan = 'Incorrect argument in the has_length_equals_or_lesser_than() method. Note that the parameter has to be an integer.';
const IncorrectArgumentInHasLengthLesserThan = 'Incorrect argument in the has_length_lesser_than() method. Note that the parameter has to be an integer number.';
const IncorrectArgumentInIsBiggerThan = 'Incorrect argument parameter of the is_bigger_than() method. Note that this parameter has to be an arbitrary number.';
const IncorrectArgumentInIsLesserThan = 'Incorrect argument parameter of the is_lesser_than() method. Note that this parameter has to be an arbitrary number.';
const IncorrectArgumentInStringContainsExpression = 'The argument of the "is_this_string_contains_expression_k_times" method has to be string or object type.';
const IncorrectArgumentInInterface2 = 'The argument function of the interface2 method has to return a validator instance.';
const IncorrectArgumentsInHasLengthInClosedRange = 'Incorrect arguments in has_length_in_closed_range() method. Note that the both parameters have to be integers and the first parameter has to be smaller than the second.';
const IncorrectArgumentsInHasLengthInRange = 'Incorrect arguments in has_length_in_range() method. Note that the both parameters have to be integers with the first element to be smaller than the second.';
const IncorrectArgumentsInIsInClosedRange = 'Incorrect arguments in is_in_closed_range() method. Note that both of these arguments have to be numbers with the first argument to be smaller than the second.';
const IncorrectArgumentsInIsInRange = 'Incorrect arguments in the is_in_range() method of the validator instance. Note that these parameters have to be arbitrary numbers and in addition the first has to be smaller than the second.';
const IncorrectFunctionArgumentInForAll = 'The callback argument of the for_all method of the euriklis validator module has to be function type.';
const IncorrectFunctionArgumentInForAny = 'The callback argument of the for_any method of the euriklis validator module has to be a function with argument a validator instance.';
const IncorrectTypeInStringContains = 'The expression property of the argument in the "is_this_string_contains_expression_k_times" method is incorrectly defined.';
export {
    ErrorMessage,
    IllegalTypeInForAny,
    IllegalUsageOfArgumentInIsArrayAndForEvery,
    IncorrectArgumentInBindMethod,
    IncorrectArgumentInIsEmpty,
    IncorrectArgumentInIsEqualOrBiggerThan,
    IncorrectArgumentInIsEqualOrLesserThan,
    IncorrectArgumentInHasLength,
    IncorrectArgumentInHasLengthBiggerThan,
    IncorrectArgumentInHasLengthEqualsOrBiggerThan,
    IncorrectArgumentInHasLengthEqualsOrLesserThan,
    IncorrectArgumentInHasLengthLesserThan,
    IncorrectArgumentInIsBiggerThan,
    IncorrectArgumentInIsLesserThan,
    IncorrectArgumentInStringContainsExpression,
    IncorrectArgumentInInterface2,
    IncorrectArgumentsInHasLengthInClosedRange,
    IncorrectArgumentsInHasLengthInRange,
    IncorrectArgumentsInIsInClosedRange,
    IncorrectArgumentsInIsInRange,
    IncorrectFunctionArgumentInForAll,
    IncorrectFunctionArgumentInForAny,
    IncorrectArgumentInIsArrayAndForAny,
    IncorrectTypeInStringContains,
};