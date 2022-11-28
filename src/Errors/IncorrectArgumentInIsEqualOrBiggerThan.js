'use strict';
import * as texts from './texts.js';
const IncorrectArgumentInIsEqualOrBiggerThan = () => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectArgumentInIsEqualOrBiggerThan;
    throw error;
}
export default IncorrectArgumentInIsEqualOrBiggerThan;