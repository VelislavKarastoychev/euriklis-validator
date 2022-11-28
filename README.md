# Euriklis - validator package.

## About the package:

The ***euriklis - validator*** (***@euriklis/validator***) package is a javascript tool for conditional analyzing, testing and validating of javascript types. 
# Installation

To install the euriklis-validator package just run the following command in the terminal:

```sh
npm install @euriklis/validator@latest --save
```
or the more strict mode:

```sh
npm install @euriklis/validator --save-exact
```
(Under the save-exact mode the user will load a particular version).

These commands will add the package to your node_modules folder.
So to execute the methods that the validator library provides, you have to declare:

```js
import validator from '@euriklis/validator';
```
in eslint convention or with the require statement in nodejs environment:
```js
const validator = require('@euriklis/validator');
```
# Usage:
The library @euriklis/validator is created for conditional testing and allows to the user to creates compositions of checking criteria and to obtain the logical result of these tests. If for example we have an user, a registration protocol and database, the validator may test if the registration criteria are fulfilled:
```js
const user = {
    username: 'Harris',
    password: 'k12d87dc3A!43d',
    email: 'example@mail.com',
    age: 22 
}
const users = DB.getUsers();
const has_payment = true;
new validator(user).interface2({
    username: usr => usr.isString.And.has_length_equals_or_bigger_than(6),
    password: psw => psw.isString.And.has_length_bigger_than(6),
    email: mail => mail.isString.And.bind(new validator(is_valid_email(mail.value)).is_same(true)),
    age: age => age.is_equal_or_bigger_than(18)
}).And.bind(
    new validator(user.Not.is_same_with_any(users))
).And.bind(new validator(has_payment))
    .on(true, () => makeRegistration(user))
    .on(false, () => requireInfo(users, user, has_payment));
```

From version 2.0.0 we add getter methods for the methods which does not require arguments (except the copy method). If you want to use the methods 
```js 
and() not() is_array() is_number() is_string() is_object() is_undefined() is_empty() etc...
```
you can use them in the mode postulated from version 1.x.x. But the same methods may be used without the parenthesis. The operands and, or and not have to be written with capital first letter. For the other methods the camel case is used, i.e. isArray, isEmpty, isObject etc.
For example:
```js
import validator from '@euriklis/validator';
const array = [1, 2, 3, 4, 5, 8, 12];
new validator(array)
    .isIntegerArray
    .Or.isStringArray
    .on(true, () => console.log('the array contains only integers or strings.'))
```
is equivalent to the old documentation
```js
import validator from '@euriklis/validator';
const array = [1, 2, 3, 4, 5, 8, 12];
new validator(array)
    .is_integer_array()
    .or().is_string_array()
    .on(true, () => console.log('the array contains only integers or strings.'))
```
The user may choose which of both paradigms to use.

From version 3.0.0 the library was rewritten in such a way that private methods was inserted for the operands, the not property and the set_answer function and the @euriklis/message was not used in the package. Also new methods was inserted like is_integer_array()/isIntegerArray, is_object_array() / isObjectArray, has_length_bigger/lesser_than(), has_length_equals_or_bigger/lesser_than(),has_length_in_range() , has_length_in_closed_range(), is_positive_integer() / isPositiveInteger, is_negative_integer() /isNegativeInteger,is_positive() / isPositive and is_negative() / isNegative and many others.

Note that the private methods require the versions of nodejs >= 12.0.0 , Chrome >= 74 and Firefox >= 90 (See more for the usage of the [private methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) in javascript) 
# Methods:

## validator methods:
All methods of the validator return a validator type. So the architecture of the library allows you to chain its methods. The result of the comparison (the answer) and the condition fulfillment is recorded into the "answer" property. For example:

```js
import validator from '@euriklis/validator';
let a = 5, b = 12, c = [11, 13];
let result = new validator(a)
    .isInteger
    .And.is_lesser_than(6).Or.is_in_closed_range(5,6)
    .And.bind(
        new validator(b).isInteger.And
            .is_bigger_than(10)
    ).And.bind(
        new validator(c).isNumberArray
            .And.Not.for_any(number => {
                return number.is_float()
        })
    ).answer;
console.log(result); // true
```
You can see the [documentation](./DOCUMENTATION.md) of the library methods.
## Bugs and tips

Everyone who wants to inform me about useful things and practices can sends me an email to exel_mmm@abv.bg or euriklis@hotmail.com. 

## Tests

To run the tests type in the terminal:
```sh
npx @euriklis/tests-for-validator
```
## License
MIT License.
This package will be provided for free to any user that use it for personal and non commercial usage. The author of the package is not liable for any errors in third party software, libraries, packages and source code used at these libraries. The author also may not responsible for some possible bugs that may exists in the library.
