'use strict';
import * as texts from './texts.js';
const IncorrectArgumentInHasLengthBiggerThan = () => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectArgumentInHasLengthBiggerThan;
    throw error;
}
export default IncorrectArgumentInHasLengthBiggerThan;