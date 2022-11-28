'use strict';
import * as texts from './texts.js';
const error = (value) => {
    const error = new Error();
    error.name = texts.ErrorMessage;
    error.message = texts.IllegalTypeInForAny(value);
    throw error;
};
export default error;