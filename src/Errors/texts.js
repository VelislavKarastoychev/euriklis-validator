'use strict';
const ErrorMessage = 'Euriklis validator error message:';
const IllegalTypeInForAny = (value) => `Illegal type of the this.value in the "for_any" method of euriklis validator module. The value has to be array or object type. The value of the current validator is ${typeof value} type.`
const IllegalUsageOfArgumentInIsArrayAndForEvery = 'Illegal usage of the argument function of the method. The function has to return validator type.';
const IncorrectArgumentInIsArrayAndForAny = 'Error in the is_array_and_for_any(). Illegal argument in the parameter of the method.';
const IncorrectArgumentInBindMethod = 'The argument has to be validator type.';
const IncorrectArgumentInIsEmpty = 'This method can be used only for string, array and object types.';
const IncorrectArgumentInHasLength = 'The argument of the has length method is not integer.';
const IncorrectArgumentInStringContainsExpression = 'The argument of the "is_this_string_contains_expression_k_times" method has to be string or object type.';
const IncorrectArgumentInInterface2 = 'The argument function of the interface2 method has to return a validator instance.';
const IncorrectFunctionArgumentInForAll = 'The callback argument of the for_all method of the euriklis validator module has to be function type.';
const IncorrectFunctionArgumentInForAny = 'The callback argument of the for_any method of the euriklis validator module has to be a function with argument a validator instance.';
const IncorrectTypeInStringContains = 'The expression property of the argument in the "is_this_string_contains_expression_k_times" method is incorrectly defined.';
export {
    ErrorMessage,
    IllegalTypeInForAny,
    IllegalUsageOfArgumentInIsArrayAndForEvery,
    IncorrectArgumentInBindMethod,
    IncorrectArgumentInIsEmpty,
    IncorrectArgumentInHasLength,
    IncorrectArgumentInStringContainsExpression,
    IncorrectArgumentInInterface2,
    IncorrectFunctionArgumentInForAll,
    IncorrectFunctionArgumentInForAny,
    IncorrectArgumentInIsArrayAndForAny,
    IncorrectTypeInStringContains,
};