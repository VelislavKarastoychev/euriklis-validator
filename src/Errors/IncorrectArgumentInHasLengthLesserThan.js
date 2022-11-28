'use strict';
import * as texts from './texts.js'; 
const IncorrectArgumentInHasLengthLesserThan = () => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectArgumentInHasLengthLesserThan;
    throw error;
}
export default IncorrectArgumentInHasLengthLesserThan; 