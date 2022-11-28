'use strict';
import * as texts from './texts.js';
const IncorrectArgumentInHasLengthEqualsOrLesserThan = () =>  {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectArgumentInHasLengthEqualsOrLesserThan;
    throw error;
}
export default IncorrectArgumentInHasLengthEqualsOrLesserThan;