'use strict';
import * as texts from './texts.js';
const IncorrectArgumentsInIsInRange = () => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectArgumentsInIsInRange;
    throw error;
}
export default IncorrectArgumentsInIsInRange;