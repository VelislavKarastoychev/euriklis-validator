# Euriklis - validator package.

## About the package:

The ***euriklis - validator*** package is a javascript tool for analyzing, testing and validating of javascript types under some conditions. 
# Installation

To install the euriklis-validator package just run in the terminal the following command:

```sh
npm install @euriklis/validator --save
```
or the more strict mode:

```sh
npm install @euriklis/validator --save-exact
```

Those commands will add the package to your node_modules folder.
So to execute the methods that the validator library provides you have to declare:

```js
const validator = require('@euriklis/validator')
```

# Usage:

To use the validator or the message library you have to get it from the package:

```js
const validator = require ('@euriklis/validator')
const message = require('@euriklis/message')
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
All the methods of validator return a validator type. So the architecture of the library allows you to chain the its methods. The result or the answer of the comparison and the condition fulfilling is recorded into the "answer" property. For example:

```js
const validator = require('@euriklis/validator')
let a = 5, b = 12, c = [11, 13]
let result = new validator(a)
    .is_integer().and()
    .is_lesser_than(6).or().is_in_closed_range(5,6)
    .and().bind(
        new validator(b).is_integer().and()
            .is_bigger_than(10)
    ).and().bind(
        new validator(c).is_number_array()
            .and().not().for_any(number => {
                return number.is_float()
        })
    ).answer
console.log(result) // true
```

the validator class has the following important methods:
-method is_string():  
a method that checks if the value property of the current validator instance is string and sets the returned validator answer property to true or false respectively. For example:
```js
const validator = require('@euriklis/validator')
const message = require('@euriklis/message')
let name = 'This is a string message.'
let id = 1343242
let result = new validator(name).is_string()
    .on(true, () => new message().bold()
        .set_color_green()
        .append_check_mark().append_white_space()
        .set_color_cyan().append('The name is string.')
        .reset().log()
    ).on(false, () => new message().bold().set_color_red()
        .append_warning_sign().append_white_space()
        .set_color_cyan()
        .append('Error declaration of the name.')
        .reset().log()
    ).and().bind(
        new validator(id).not().is_string().and().is_number()
    ).on(true, () => {
        new message().bold().set_color_yellow()
        .append('The id is not string so this is fine...')
        .reset().log()
    }).on(false, () => new message().set_color_red()
        .append('Error:the id is string.').reset().log()
    )
// if we check the result, then the validator answer will be true
console.log(result.answer) // true
```
- method is_number():
checks if the value property of the current validator instance is number of not (integer and float). For example:

```js
let id = 1123
new validator(id).is_number().on(true, () => console.log('yes'))
    .on(false, () => console.log('Not')) // yes
```

- method is_array():
 checks if the value of the current validator instance is array.
- method is_object():  checks if the value property of the current validator instance is object or not.
- method is_function(): checks if the validator property of the current validator instance is a javascript function type or not.
- method is_date(): checks if the current validator instance is a date or not.
- method is_empty(): This method works when the type of the value property of the current validator instance is of null, array, string or object type and checks if these variables are empty of not.
- method is_integer(): this method checks if the value of the current validator instance is number that is integer or not.
- method is_float() : checks if the value of the current validator instance is a floating point number or not.
- method is_number_array() : check if all elements of an array type variable are numbers.
- method is_string_array(): checks if all items of an array type variable are of string type.
-method is_boolean(): a method that checks if the value property of the current validator instance is a boolean variable or not.
- method is_undefined() - checks if a variable  is undefined. If the value is equal to null the method returns false. To avoid this confusion you have to combine this expression with the is_same method, i.e.

```js
let a = null
new validator(a).is_undefined().or().is_same(null) 
```
- method is_same(parameter): checks if the value property of the current validator instance is equals to the type and value of the parameter argument of the method. Note that if the value of the parameter is object of array or  string, then the method will compare the values of every property or item and will return true if the value property of the current validator instance is equal to the parameter. For example:
```js
let a = 11, b = [1, 2, 3], c = 'same', 
    d = {is_same : 'is a validator method'}
let question = new validator(a).is_same(11).and()
    .bind(
        new validator(b).is_same([1, 2, 3])
    ).and().bind(
        new validator(c).is_same('same')
    ).and().bind(
        new validator(d)
            .is_same({is_same : 'is a validator method'})
    )
console.log(question.answer) // true
```
- method is_same_with_any(parameter_array): checks if the value property of the current validator instance contains some of the parameters that exists in the parameter array variable.
- method for_all (some_function): checks if every value of an array/object in the value property of the validator instance, fulfills the conditions of the function. The argument of the some_function is assumed to be a validator type.

```js
new validator(Array.form({length : 60}).map(Math.random))
    .for_all(rand_number => {
        return rand_number.not().is_same(0)
            .and().not().is_same(1)
    }) // probably true!
```

- method for_any(some_function): similar to the for_all() method but requites the some_function to be true at least for one element of the array or object value property of the current validator instance.
- method not(): an operational method that sets the not operand to true and negate the next active validator atomic sentence.
- method and(): an operational method that sets the and operand to true and makes conjunction with the next active validator atomic sentence.
method or(): an operational method that sets the the or operand to true and makes disjunction with the next active validator atomic sentence.
- method bind(other_validator): gets in the input argument of the method a validator atomic sentence and then execute the operations that are required.
- method is_equal_or_lesser_than(n): checks if the number in the value property of the current validator instance is equal or smaller to the number n in the argument of the method. Similar to this method is the method is the method is_lesser_than(n).
- is_equal_or_bigger_than(n): checks if the number in the value property of the current validator instance is greater of equal to the number n in the argument of the method. Similar to this method is the method is_bigger_than(n).
- method is_in_range(a, b): checks if the number in the value property of the current validator instance is in the open interval (a, b), where a and b are both numbers, a <= b and a and b are the arguments of the method. Similar to this method is the method is_in_closed_range(a, b), where the number type in the validator instance has to be in the closed interval [a, b].
- method has_length(n): checks is a string or array or object type in the value property of the current validator instance has length equal to n, where n is number and is the argument of the method.
- method copy() - this method returns a validator instance with the same value property but removes the answer property. Similar to this method is the method absolute_copy() that copies all the properties of the current validator instance. 
- method on (true/false, some_function): A method that returns validator type like the other methods, but executes a function according to the condition of truth. 
## Bugs and tips

Everyone that wants to inform me for some useful information and practices can sends me an email to exel_mmm@abv.bg or euriklis@hotmail.com. 

## License
MIT License
This package will be provided for free to every user that use it for personal and not commercial usage. The author of the package in not responsible for any errors in third party software products, libraries, packages and source codes. The author also is not responsible for some possible bugs that may exists in the library.
