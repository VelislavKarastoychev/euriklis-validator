'use strict';
import * as texts from './texts.js';
const IncorrectArgumentsInHasLengthInClosedRange = () => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectArgumentsInHasLengthInClosedRange;
    throw error;
}
export default IncorrectArgumentsInHasLengthInClosedRange;