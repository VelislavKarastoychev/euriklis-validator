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
export const IncorrectArgumentInIsLesserThan = () => executeError(texts.IncorrectArgumentInIsLesserThanTxt);
export const IncorrectArgumentInStringContainsExpression = () => executeError(texts.IncorrectArgumentInStringContainsExpressionTxt);
export const IncorrectArgumentsInHasLengthInClosedRange = () => executeError(texts.IncorrectArgumentsInHasLengthInClosedRangeTxt);
export const IncorrectArgumentsInHasLengthInRange = () => executeError(texts.IncorrectArgumentsInHasLengthInRangeTxt);
export const IncorrectArgumentInInterface2 = () => executeError(texts.IncorrectArgumentInInterface2Txt);
export const IncorrectArgumentsInIsInClosedRange = () => executeError(texts.IncorrectArgumentsInIsInClosedRangeTxt);
export const IncorrectArgumentsInIsInRange = () => executeError(texts.IncorrectArgumentsInIsInRangeTxt);
export { default as IncorrectFunctionArgumentInForAll } from './IncorrectFunctionArgumentInForAll.js';
export { default as IncorrectFunctionArgumentInForAny } from './IncorrectFunctionArgumentInForAny.js';
export { default as IncorrectTypeInStringContains } from './IncorrectTypeInStringContains.js'
