'use strict';
import * as texts from './texts.js';
const error = () => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IncorrectTypeInStringContains;
};
export default error;