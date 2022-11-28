'use strict';
import * as texts from './texts.js';
const IncorrectArgumentInIsBiggerThan = () => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectArgumentInIsBiggerThan;
    throw error;
}
export default IncorrectArgumentInIsBiggerThan;