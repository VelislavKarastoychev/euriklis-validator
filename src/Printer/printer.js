'use strict';
import message from '@euriklis/message';
class Printer {
    static ErrorMessage(text, color = 'cyan') {
        return new message().set_color_red()
            .append_warning_sign()
            .append_white_space()
            .reset().setColor(color)
            .append(text).reset().text;
    }
    static HeaderMessage(text, color = 'yellow') {
        return new message().setColor(color)
            .underline().bold().italic().append(text)
            .append('\n').reset().text;
    }
    static InfoMessage(text, color = 'blue') {
        return new message().setColor(color)
            .append(text).reset().text;
    }    
}
export default Printer;