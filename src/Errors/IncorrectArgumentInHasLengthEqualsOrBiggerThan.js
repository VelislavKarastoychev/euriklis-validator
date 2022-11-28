'use strict';
import * as texts from './texts.js';
const IncorrectArgumentInHasLengthEqualsOrBiggerThan = () => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectArgumentInHasLengthEqualsOrBiggerThan;
    throw error;
}
export default IncorrectArgumentInHasLengthEqualsOrBiggerThan;