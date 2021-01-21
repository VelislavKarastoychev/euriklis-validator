# Euriklis - validator package.

## About the package:

The ***euriklis - validator*** package is a javascript tool for analyzing, testing and validating of javascript types under some conditions. 
# Installation

To install the euriklis-validator package just run in the terminal the following command.

```sh
npm install euriklis-validator --save --save-exact
```

This command will add the package to your node_modules folder.

# Usage:

To use the validator or the message library you have to get it from the package:

```js
const {validator, message} = require ('euriklis-validator')
let text = 'Test string'
new validator(text).is_string().on(true, () => {
    console.log('Yes, the text is string')
    let contain = new validator(text).contains('string')
        .on(true, () => {
            new message().bold().italic().underline()
                .set_color_yellow()
                .append('Euriklis information message:\n')
                .reset().set_color_green()
                .append_check_mark()
                .set_color_cyan()
                .append_white_space()
                .append('The string that is inserted like ')
                .append('argument in the validator instance ')
                .append('contains the substring "string".')
                .reset().log()
        })
})
```

# Methods:

## validator methods:
All the methods of validator except the ***on()*** method returns a validator type. The answer of the comparison and the condition fulfilling is recorded in the property answer.
the validator class has the following methods:
1. is_string() - a method that checks if the value property of the current validator instance is string and sets the returned validator answer property to true or false respectively.
2. is_number() - checks if the value property of the current validator instance is number of not (integer and float).
3. is_array() - checks if the value of the current validator instance is array.
4. is_object() - checks if the value property of the current validator instance is object or not.
5. is_function() - checks if the validator property of the current validator instance is a javascript function type or not.
6. is_date() - checks if the current validator instance is a date or not.
7. is_empty() - a method that works when the type of the value property of the current validator instance is of null, array, string or object type and checks if these variables are empty of not.
8. is_integer() - this method checks if the value of the current validator instance is number that is integer or not.
9. is_float() - checks if the value of the current validator instance is a floating point number or not.
10. is_number_array()
11. is_string_array()
12. is_boolean() - a method that checks if the value property of the current validator instance is a boolean variable or not.
13. is_undefined() - checks if a variable is null or undefined.
14. is_same(parameter) - checks if the value property of the current validator instance is equals to the type and value of the parameter argument of the method.
15. is_same_with_any(parameter_array) - checks if the value property of the current validator instance contains some of the parameters that exists in the parameter array variable.
16. for_all (some_function) - checks if every value of an array/object in the value property of the validator instance, fulfills the conditions of the function. The argument of the some_function is assumed to be a validator type.
17. for_some(some_function) - similar to the for_all() method but requites the some_function to be true at least for one element of the array or object value property of the current validator instance.
18. not() - an operational method that sets the not operand to true and negate the next active validator atomic sentence.
19. and() - an operational method that sets the and operand to true and makes conjunction with the next active validator atomic sentence.
20. or() - an operational method that sets the the or operand to true and makes disjunction with the next active validator atomic sentence.
21. bind(other_validator) - gets in the input argument of the method a validator atomic sentence and then execute the operations that are required.
22. is_equal_or_lesser_than(n) - checks if the number in the value property of the current validator instance is equal or smaller to the number n in the argument of the method. Similar to this method is the method is the method is_lesser_than(n).
23. is_equal_or_bigger_than(n) - checks if the number in the value property of the current validator instance is greater of equal to the number n in the argument of the method. Similar to this method is the method is_bigger(n).
24. is_in_range(a, b) - checks if the number in the value property of the current validator instance is in the open interval (a, b), where a and b are both numbers, a <= b and a and b are the arguments of the method. Similar to this method is the method is_in_closed_range(a, b), where the number type in the validator instance has to be in the closed interval [a, b].
25. has_length(n) - checks is a string or array or object type in the value property of the current validator instance has length equal to n, where n is number and is the argument of the method.
26. copy() - this method returns a validator instance with the same value property but removes the answer property. Similar to this method is the method absolute_copy() that copies all the properties of the current validator instance. 

## Bugs and tips

Everyone that wants to inform me for some useful information and practices can sends me an email to exel_mmm@abv.bg or euriklis@hotmail.com. 

## License
MIT License
This package will be provided for free to every user that use it for personal and not commercial usage. The author of the package in not responsible for any errors in third party software products, libraries, packages and source codes. The author also is not responsible for some possible bugs that may exists in the library.
