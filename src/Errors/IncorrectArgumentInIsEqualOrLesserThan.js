'use strict';
import * as texts from './texts.js';
const IncorrectArgumentInIsEqualOrLesserThan = () => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectArgumentInIsEqualOrLesserThan;
    throw error;
}
export default IncorrectArgumentInIsEqualOrLesserThan;