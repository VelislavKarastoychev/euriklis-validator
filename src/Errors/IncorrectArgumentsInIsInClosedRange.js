'use strict'
import * as texts from './texts.js';
const IncorrectArgumentsInIsInClosedRange = () => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectArgumentsInIsInClosedRange;
    throw error;
}
export default IncorrectArgumentsInIsInClosedRange;