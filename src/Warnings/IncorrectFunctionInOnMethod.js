'use strict';
import message from '@euriklis/message';
import { Printer as printer } from '../Printer/index.js';
import * as texts from './texts.js';
const warning = () => {
    return new message().append(printer.HeaderMessage(texts.WarningMessage))
        .append(printer.ErrorMessage(texts.IncorrectFunctionInOnMethod))
        .reset().log();
};
export default warning;