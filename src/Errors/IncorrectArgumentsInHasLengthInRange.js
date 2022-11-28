'use strict';
import * as texts from './texts.js';
const IncorrectArgumentsInHasLengthInRange = () => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectArgumentsInHasLengthInRange;
    throw error;
}
export default IncorrectArgumentsInHasLengthInRange;