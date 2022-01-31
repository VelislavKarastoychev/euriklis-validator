'use strict';
import {Printer as printer} from '../Printer/index.js';
import * as texts from './texts.js';
const error = () => {
    const error = new Error();
    error.name = printer.HeaderMessage(texts.ErrorMessage);
    error.message = printer.ErrorMessage(texts.IllegalUsageOfArgumentInIsArrayAndForEvery);
    throw error;
};
export default error; 