'use strict';
import * as texts from './texts.js';
const IncorrectArgumentInIsLesserThan = () => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectArgumentInIsLesserThan;
    throw error;
}
export default IncorrectArgumentInIsLesserThan;