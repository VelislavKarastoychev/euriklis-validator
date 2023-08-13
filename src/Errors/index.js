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
export const IncorrectArgumentInHasLengthBiggerThan = () => executeError(texts.IncorrectArgumentInHasLengthBiggerThanTxt);
export const IncorrectArgumentInHasLength = () => executeError(texts.IncorrectArgumentInHasLengthTxt);
export const IncorrectArgumentInBindMethod = () => executeError(texts.IncorrectArgumentInBindMethodTxt);
export const IncorrectArgumentInHasLengthEqualsOrBiggerThan = () => executeError(texts.IncorrectArgumentInHasLengthEqualsOrBiggerThanTxt);
export const IncorrectArgumentInHasLengthEqualsOrLesserThan = () => executeError(texts.IncorrectArgumentInHasLengthEqualsOrLesserThanTxt);
export const IncorrectArgumentInHasLengthLesserThan = () => executeError(texts.IncorrectArgumentInHasLengthLesserThanTxt);
export const IncorrectArgumentInIsArrayAndForAny = () => executeError(texts.IncorrectArgumentInIsArrayAndForAnyTxt);
export const IncorrectArgumentInIsBiggerThan = () => executeError(texts.IncorrectArgumentInIsBiggerThanTxt);
export const IncorrectArgumentInIsEmpty = () => executeError(texts.IncorrectArgumentInIsEmptyTxt);
export const IncorrectArgumentInIsEqualOrBiggerThan = () => executeError(texts.IncorrectArgumentInIsEqualOrBiggerThanTxt);
export const IncorrectArgumentInIsEqualOrLesserThan = () => executeError(texts.IncorrectArgumentInIsEqualOrLesserThanTxt);
export { default as IncorrectArgumentInStringContainsExpression } from './IncorrectArgumentInStringContainsExpression.js';
export { default as IncorrectArgumentInIsLesserThan } from './IncorrectArgumentInIsLesserThan.js';
export { default as IncorrectArgumentsInInterface2 } from './IncorrectArgumentsInInterface2.js';
export { default as IncorrectArgumentsInHasLengthInRange } from './IncorrectArgumentsInHasLengthInRange.js';
export { default as IncorrectArgumentsInHasLengthInClosedRange } from './IncorrectArgumentsInHasLengthInClosedRange.js';
export { default as IncorrectArgumentsInIsInClosedRange } from './IncorrectArgumentsInIsInClosedRange.js';
export { default as IncorrectArgumentsInIsInRange } from './IncorrectArgumentsInIsInRange.js';
export { default as IncorrectFunctionArgumentInForAll } from './IncorrectFunctionArgumentInForAll.js';
export { default as IncorrectFunctionArgumentInForAny } from './IncorrectFunctionArgumentInForAny.js';
export { default as IncorrectTypeInStringContains } from './IncorrectTypeInStringContains.js'
