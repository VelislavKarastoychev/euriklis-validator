'use strict';
import * as texts from "./texts.js";
const executeError = (message) => {
  const error = new Error();
  error.name = texts.ErrorMessage;
  error.message = message;
  throw error;
}
export const IllegalParametersInIsArrayOfIntegersInClosedRange = () => executeError(texts.IllegalParametersInIsArrayOfIntegersInClosedRangeTxt);
export const IllegalParametersInIsArrayOfIntegersInRange = () => executeError(texts.IllegalParametersInIsArrayOfIntegersInRangeTxt);
export const IllegalParametersInIsArrayOfNumbersInClosedRange = () => executeError(texts.IllegalParametersInIsArrayOfNumbersInClosedRangeTxt);
export const IllegalParametersInIsArrayOfNumbersInRange = () => executeError(texts.IllegalParametersInIsArrayOfNumbersInRangeTxt);
export const IllegalTypeInForAny = () => executeError(texts.IllegalTypeInForAnyTxt);
export const IllegalUsageOfArgumentInIsArrayAndForEvery = () => executeError(texts.IllegalUsageOfArgumentInIsArrayAndForEveryTxt);
export { default as IncorrectArgumentInBindMethod } from './IncorrectArgumentInBindMethod.js';
export { default as IncorrectArgumentInIsEmpty } from './IncorrectArgumentInIsEmpty.js';
export { default as IncorrectArgumentInIsEqualOrBiggerThan } from './IncorrectArgumentInIsEqualOrBiggerThan.js';
export { default as IncorrectArgumentInIsEqualOrLesserThan } from './IncorrectArgumentInIsEqualOrLesserThan.js';
export { default as IncorrectArgumentInStringContainsExpression } from './IncorrectArgumentInStringContainsExpression.js';
export { default as IncorrectArgumentInHasLength } from './IncorrectArgumentInHasLength.js';
export { default as IncorrectArgumentInHasLengthBiggerThan } from './IncorrectArgumentInHasLengthBiggerThan.js';
export { default as IncorrectArgumentInHasLengthEqualsOrBiggerThan } from './IncorrectArgumentInHasLengthEqualsOrBiggerThan.js';
export { default as IncorrectArgumentInHasLengthLesserThan } from './IncorrectArgumentInHasLengthLesserThan.js';
export { default as IncorrectArgumentInHasLengthEqualsOrLesserThan } from './IncorrectArgumentInHasLengthEqualsOrLesserThan.js';
export { default as IncorrectArgumentInIsBiggerThan } from './IncorrectArgumentInIsBiggerThan.js';
export { default as IncorrectArgumentInIsLesserThan } from './IncorrectArgumentInIsLesserThan.js';
export { default as IncorrectArgumentsInInterface2 } from './IncorrectArgumentsInInterface2.js';
export { default as IncorrectArgumentsInHasLengthInRange } from './IncorrectArgumentsInHasLengthInRange.js';
export { default as IncorrectArgumentsInHasLengthInClosedRange } from './IncorrectArgumentsInHasLengthInClosedRange.js';
export { default as IncorrectArgumentsInIsInClosedRange } from './IncorrectArgumentsInIsInClosedRange.js';
export { default as IncorrectArgumentsInIsInRange } from './IncorrectArgumentsInIsInRange.js';
export { default as IncorrectFunctionArgumentInForAll } from './IncorrectFunctionArgumentInForAll.js';
export { default as IncorrectFunctionArgumentInForAny } from './IncorrectFunctionArgumentInForAny.js';
export { default as IncorrectTypeInStringContains } from './IncorrectTypeInStringContains.js'
