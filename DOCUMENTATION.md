# Documentation of ***@euriklis/validator***

The validator library contains a lot of methods, which tests the javascript types under some conditions. The getters also return validator instances.

1. The <em>validator</em> ***constructor***.
To create a new validator instance you have to write:
```js
const condition = new validator(parameter);
```
The constructor contains four properties:
- the <em>value</em> property or the parameter value.
- the <em> answer </em> property which is the result of the testing execution (If no tests are made the answer will be null).
- the <em> required </em> property which is set to false initially and is not used widely in the library after the version 2.x.x.
- the <em>description</em> property. This property is not used in the library, but if the user wishes to store some data which may be useful, then it may store it in this property.
For example:
```js
const condition = new validator({a: 1, b: 2, c: 3});
condition.description = 'This is an object with integer number values.'
console.log(condition);
```
output:
```js
validator {
  value: { a: 1, b: 2, c: 3 },
  answer: null,
  required: false,
  description: 'This is an object with integer number values.'
}
```
2. <em>show_warnings</em> - getter/setter method which is responsible for the warnings management. If is set to true, then the methods which have problems will print messages for the nature of the problem. By default this property is set to false (the instance does not shows warning messages).
The method is available from version 3.x.x
For example:
```js
const condition = new validator('this is not number');
condition.show_warnings = true;
condition.isPositive; //or condition.is_positive()
```
output: 
```sh
=>
Euriklis validator library warning message:
Incorrect value property of the current validator instance. Note that if the value is not number, the is_positive() / isPositive method is not usable. The method returns false, but the result may be incorrect.
```
3. <em>copy()</em> - copies the value of the current validator instance without the answer of the executed test conditions.

Example: 
```js
const a = new validator(123)
    .isInteger.And.is_bigger_than(100);// value --> 123, answer --> true
const b = a.copy(); // value --> 123, answer --> null
```
4. <em>absolute_copy()</em> - copies the value of the current validator instance with all the properties.
The method is also available as getter in the form <em>absoluteCopy</em>

Example: 
```js
const a = new validator(123)
    .isInteger.And.is_bigger_than(100);// value --> 123, answer --> true, ...
const b = a.absolute_copy(); // value --> 123, answer --> true, ...
// b = a.absoluteCopy;
```
5. <em>is_undefined()</em> or as getter <em>isUndefined</em> - sets the answer to true if the value property is undefined.
6. <em> is_boolean() </em> or as getter <em>isBoolean</em> - sets the answer to true if the value property is of boolean type.

Example:
```js
const suiJuris = a => a >= 18;
new validator(suiJuris(23)).isBoolean
    .on(true, (age) => console.log(`The age is correctly declared.`))
// new validator(age).is_boolean() is also available 
```
7. <em>is_string()</em> or as getter <em> isString </em> - sets answer to true if the value property is string.
8.  <em>is_number()</em> or as getter <em> isNumber </em> - sets answer to true if the value property is number.
9.  <em>is_integer()</em> or as getter <em> isInteger </em> - sets answer to true if the value property is integer number.
10.  <em>is_positive_integer()</em> or as getter <em> isPositiveInteger </em> - sets answer to true if the value property is positive integer.
11.  <em>is_negative_integer()</em> or as getter <em> isNegativeInteger </em> - sets answer to true if the value property is negative integer number.
12.  <em>is_float()</em> or as getter <em> isFloat </em> - sets answer to true if the value property is float number. Note that if is integer the method returns false.
13.  <em>is_negative()</em> or as getter <em> isNegative </em> - sets answer to true if the value property is negative number (float or integer).
14.  <em>is_positive()</em> or as getter <em> isPositive </em> - sets answer to true if the value property is positive number (float or integer).
15.  <em>is_bigger_than(number)</em> - sets answer to true if the value property is number bigger than the argument of the method.
16. <em> is_lesser_than(number) </em> - sets the answer to true if the value property is number lesser than the argument of the method.

Example:
```js
const number = new validator(3.14);
number.is_bigger_than(3).And.is_lesser_than(4)
    .on(true, (pi) => console.log(`3 < ${pi.value} < 4`));
```
17. <em>is_in_range(number, number)</em> - sets the answer to true if the value is a number in the open range (a, b). If a >= b or a or b is not number the method throws error.

Example:
```js
new validator(12).is_in_range(0, 1)
    .on(false, (number) => console.log(`the ${number.value} is not in range (0, 1).`))
```
18. <em>is_in_closed_range(number, number)</em> - sets the answer to true if the value is a number in the closed interval [a, b], where a and b are the first argument and the second argument of the method. If the first argument is not smaller than the second argument or some of those is not number an error will be thrown.
19. <em>is_equal_or_bigger_than(number)</em> - sets the answer to true if the current value property is number which is equal or bigger than the argument of the method. If the argument of the method is not number, then an error message will be thrown.

Example:
```js
const condition = new validator(1234).is_equal_or_bigger_than(100)
    .on(true, (n) => console.log(`the ${n.value} is at least equal or bigger than 100.`));
```
20. <em>is_equal_or_lesser_than(number)</em> - inverse equivalent to the previous method. If the argument is not number, then an error message will be thrown.
21. <em>is_array()</em> or as getter method <em>isArray</em> - sets the answer property to true if the current value property is of Array type. Note that the object type is also of Array instance, but if the value property is of Object type, then the method will return as result false.

Example:
```js
const arr = [1, 2, 3, 'a', 'b', 'c'];
const obj = {1: 1, 2: 2, 3: 3, a: 'a', b: 'b', c: 'c'};
new validator(arr).isArray.on(true, arr => console.log('the arr is an array!'))
new validator(obj).isArray.on(false, obj => console.log('the obj variable is not array!'))
```
22. <em>is_string_array()</em> or as getter method <em>isStringArray</em> - sets the answer to true if the value property of the current validator instance is string array.
23. <em>is_number_array()</em> or as getter <em>isNumberArray</em> - checks if the value property of the current validator instance is array which elements are numbers.
24. <em>is_integer_array()</em> or as getter method <em>isIntegerArray</em> - checks if the value property of the current validator instance is array of integers and sets answer property appropriately. The method is available from versions 3.x.x
25. <em>is_object_array()</em> or as getter method <em>isObjectArray</em> - checks if the value property is array of object - type elements and sets the answer property appropriately. The method is available for versions 3.x.x
26. is_array_with_elements_that_satisfy({condition: string}) - if the value property is array checks if every element satisfies the functional condition and if the condition return true for each element of the array sets the answer property to true. In all the other cases sets the answer to false. This method is deprecated and if the user wants to make condition testing of an array he may use the method is_array_and_for_every() or is_array_and_for_any() methods.

Example: 
```js
const arr = [1, 2, 3, 'a', 'b', 'c'];
new validator(arr)
    .is_array_with_elements_that_satisfy({conditions: 'is_integer().or().is_string()'})
    .on(true, () => console.log('This array contains only integers or strings.'));
```
This method is deprecated and if you want to use it only the pure validator methods are available. Our goal was to create a database and for that reason the management of the data was needed to be controlled from the validator library via strings. However now the for_all(), for_any() and is_array_and_for_every() or is_array_and_for_any() are available methods which allow you to test the structure of an array or list.
27. <em>is_object()</em> or as getter <em> isObject</em> - tests if the value is an object and sets the answer to true or false respectively.
28. <em> is_empty()</em> or as getter <em>isEmpty</em> - if the value property of the current validator instance is empty string or empty array or object without keys or undefined or null type, then sets the answer to true.

Example:
```js
const arr = [];
const a = [1];
new validator(arr).isEmpty
    .And.bind(
        new validator(a[1]).isEmpty
    ).on(true, (empty) => console.log(`the current property ${empty.value} is empty type for the validator.`))
```
Note that this method can be used only when the type of the variable is string, array or object. For different types the method THROWS error message for incorrect type of the validator.
29. <em> for_all(function(validator, index))</em> - this method works only on arrays or object types and gets two parameters - the first one is assumed to be the current item and the second the index of the element. The current item is transformed to validator type.

Example:
```js
const arr = [1, 2, 3, 4, { a: 5, }, { a: 6 }];
new validator(arr).for_all(element => element
    .isNumber
    .And
    .is_lesser_than(10)
    .Or
    .interface2({ a: value => value.is_lesser_than(10) }))
    .on(true, () => console.log('Correct!'))
    .on(false, () => console.log('Error!!!'))
    // Correct!
```
30. <em> for_any(function(elementAsValidator, index))</em> - this method works only on array or object types value properties of the validator. If the value is not array or object the method sets the answer to false. If the value is array then checks if some element of the array/object satisfies the callback function. As in the for_all() method the element is transformed to validator from the method. If the callback is not a function, then an error message will be thrown. 

Example:
```js
const arr = [1, 3, {letter: 'B'},'word'];
new validator(arr)
    .for_any(element => element.is_same('word'))
    .on(true, () => console.log('the array contains the expression "word".'));
```
31. <em> interface2({key: function(valueAsValidator)}) </em> - this method is the second version of the method interface, which is deprecated. The method requires the value property to be an object. If the value is not object, then sets the answer property to false. The method gets an object with keys which have to be equal to the value keys of the value. The values of the object have to be functions and the arguments are assumed to be of validator type.

Example:
```js
const user = {
    name: 'John',
    family: 'Doe',
    age: 23,
    address: 'Wall Street 22',
}
new validator(user).interface2({
    name: n => n.isString.And.has_length_bigger_than(0),
    family: f => f.isString.And.has_length_bigger_than(0),
    age: age => age.isPositiveInteger,
    address: address => address.isString.And.has_length_bigger_than(1)
}).on(true, () => console.log('valid user declaration ...'))
.on(false, () => console.log('Something went wrong'));
```
32. has_length(number) - tests if the current value is string or array or object with length which is equals to the argument of the method and set the answer property correspondingly.

Example:
```js
new validator('abc').has_length(3)
    .And.bind(
        new validator([1, 2, 3]).has_length(3)
     )
     .And.bind(
        new validator({a: 1, b: 2, c: 3}).has_length(3)
     ).on(true, () => console.log('the string, the array and the object has length equals to 3'))
```
33. has_length_bigger_than(number) - tests if the current value property is a string or an array or an object with length, which is equals to the argument of the method and sets the answer property correspondingly.

Example:
```js
new validator('abc').has_length_bigger_than(2)
    .And.bind(
        new validator([1, 2, 3, 4]).has_length_bigger_than(1)
    ).And.bind(
        new validator({a: 1, b: 2, c: 3}).has_length_bigger_than(2)
    ).on(true, () => console.log('Correct!!!'))
```
34. has_length_equals_or_bigger_than(number) - tests if the value prperty of the current validator instance is a string or an array or an object which length is equals or bigger than the argument of the method and sets the answer property correspondingly.

Example:
```js
new validator('validator').has_length_equals_or_bigger_than(6)
    .on(true, (instance) => console.log(`The word ${instance.value} has length bigger or equals to 6.`));
```
35. has_length_lesser_than(number) - tests if the value property of the current validator instance is an array or a string or an object which length is lesser than the argument of the method and sets the answer property correspondingly.
36. has_length_equals_or_lesser_than(number) - tests if the value property of the current validator instance is an array or a string or an object with length which is equals or lesser than the argument of the method and sets the answer property correspondingly.
37. has_length_in_range(number, number) - tests if the value property of the current validator instance is an array or an object or a string with length in the open range (a, b), where the a and b are the arguments of the method.

Example:
```js
const word = 'validator';
new validator(word).has_length_in_range(6, 10)
    .on(true, (w) => console.log(`The ${w.value} has length form 6 to 10.`))
```
38. has_length_in_closed_range(number, number) - tests if the value property of the curren validator instance is a string or an array or an object in the closed range [a, b], where the a and the b are the arguments of the method. 
39. is_this_string_contains_expression_k_times({expression: string, count: integer}) - tests if the value property of the current validator instance is string, tests if the string contains the expression value k times , where the k is the value of the count property of the object argument of the method. This method accept also a string argument. If the argument of the method is a string, then the k is assumed to be equals to 1.

Example:
```js
// a citations of Donald Trump:
const sentence = 'So we really need jobs now. We have to take jobs away from other countries because other countries are taking our jobs. There is practically not a country that does business with the United States that isn''t making - let\'s call it a very big profit. I mean China is going to make $300 billion on us at least this year.' +
'I saw a report yesterday. There\'s so much oil, all over the world, they don''t know where to dump it. And Saudi Arabia says, \'Oh, there\'s too much oil.\' They - they came back yesterday. Did you see the report? They want to reduce oil production. Do you think they\'re our friends? They\'re not our friends.'
new validator(sentence)
    .is_this_string_contains_expression_k_times({expression: 'I', count: 2})
    .on(true, () => console.log('Donald Trump is egocentric!'))
```
40. is_function() or as getter method isFunction - tests if the value property of the current validator instance is a function and sets the answer property correspondingly.

Example:
```js
new validator(Math.random)
.isFunction.on(true, () => console.log('the Math.random is a function...'))
```
41. contains(array | string | number | object). 

This method tests if the value of the current validator instance is array and if each of its elements may be identified with any of the elements of the argument of the method.

Example:
```js
const users = [
    { 
        name: 'John',
        age: 39,
        profession: 'worker',
    },
    { 
        name: 'Caroline',
        age: 19,
        profession: 'student',
    },
    { 
        name: 'Peter',
        age: 22,
        profession: 'student',
    },
    { 
        name: 'Jackson',
        age: 50,
        profession: 'doctor',
    },
    { 
        name: 'Nelly',
        age: 29,
        profession: 'doctor',
    },    
];
const professions = users.map(el => el.profession);
new validator(professions).contains(['worker', 'student', 'professor', 'doctor'])
    .on(true, () => console.log('Correct!!!'));
```
42. is_same(any) - tests if the value of the current validator property is equals (identical) to the argument of the method and sets the answer property correspondingly.

Example:
```js
new validator(Math.random() < 1).is_same(true)
    .on(true, () => console.log('the random function of js is normalized.'))
```
43. </em>is_same_with_any(Array(...elements))</em> - tests if the value property of the current validator instance is equals to any of the elements of the argument of the method.

Example:
```js
const users = [
    { 
        name: 'John',
        age: 39,
        profession: 'worker',
    },
    { 
        name: 'Caroline',
        age: 19,
        profession: 'student',
    },
    { 
        name: 'Peter',
        age: 22,
        profession: 'student',
    },
    { 
        name: 'Jackson',
        age: 50,
        profession: 'doctor',
    },
    { 
        name: 'Nelly',
        age: 29,
        profession: 'doctor',
    },    
];
const user = { 
        name: 'Jackson',
        age: 50,
        profession: 'doctor',
    };
new validator(user).is_same_with_any(users)
    .on(true, () => console.log('the user exists'))
```
44. <em>is_array_and_for_every(function(itemAsValidator, index))</em> - tests if the value property of the current validator instance is array and if for each element is valid a function condition. The first argument of the callback function is assumed to be of validator type and represent the item of the array and the second is assumed to be the index of the method. 

Example:
```js
const random_array = Array.from({ length: 100}).map(Math.random);
new validator(random_array).is_array_and_for_every(item => item.isFloat.And.is_in_range(0, 1))
    .on(true, () => console.log('The random array is normalized'));
```
45. <em>is_array_and_for_any(itemAsValidator, index)</em> - the method is similar to the previous with the distinction that the method tests if the value property is array and if for some of the elements of this array is completed a function condition. The function argument of the method is similar to the previous.
46. <em>on(boolean, function(validatorInstance))</em> - this method executes a callback function depending on the answer property value. The first argument of the method is of boolean type and represents the required value of the answer and the second argument is a callback function with argument the current validator instance.

Example:
```js
new validator(5)
    .isInteger
    .on(true, (n) => console.log(`${n.value + 5} is also integer.`))
    .on(false, () => console.log('Something went wrong...'));
```
47. <em>bind(validatorInstanceWithSetAnswer)</em> - this method allows to be created chains of different validator instances. The method gets a validator instance. Note that if the validator argument of the bind method does not have answer property, then the final answer of the chain will be null.

Example:
```js
new validator(5).isInteger
    .And.bind(
        new validator([5, 4, 3, 2, 1, 0]).isIntegerArray
    ).on(true, () => console.log('Correct...'));
new validator(5).isInteger
    .And.bind(
        new validator(4)
    ).on(true, () => console.log('It does not work, because the argument of the bind has not question.'))
    .on(false, () => console.log('Also does not work, because the answer of the chain is null.'))
```
48. <em>is_date(Date)</em> - checks if the argument of the method is of Date instance.
49. Operators <em>or()/Or</em>, <em>and()/And</em> and <em>not()/Not</em> - allows logical chaining of the different methods of the validator library.
50. <em>is_integer_like()</em> or as getter <em>isIntegerLike</em> - tests if the value property is positive integer or string which may be converted to integer.

Example: 
```js
new validator('-31415926536').isIntegerLike
    .on(true, () => console.log('This string can be converted to integer'));
```
51. <em>is_number_like</em> or as getter <em>isNumberLike</em> - tests if the value property is number or is a string which may be converted to number.

Example:
```js
new validator('3.1415926536').isNumberLike
    .on(true, () => console.log('This is the pi number but like a string.'));
```
52. <em>is_positive_number_like()</em> or as getter isPositiveNumberLike - tests if the value property is a number or a string which may be converted to a number and if this number will be positive.
53. <em>is_negative_number_like()</em> or as getter <em>isNegativeNumberLike</em> - tests if the value property is a negative number or a string which may be converted to negative number.
54. <em>is_positive_integer_like()</em> or as getter <em>isPositiveIntegerLike</em> - tests if the value property is a positive integer or a string which may be converted to a positive integer.
55. <em>is_negative_integer_like()</em> or as getter <em>isNegativeIntegerLike</em> - tests if the value property is a negative integer or a string which may be converted to a negative integer.
56. <em>is_array_of_positive_integers()</em> or as getter <em>isArrayOfPositiveIntegers</em> - tests if the value property is an array each element of which is positive integer.

Example:
```js
const arr = Array.from({ length: 100 }).map(el => (Math.random() * 20) >> 0);
new validator(arr).isArrayOfPositiveIntegers
    .on(true, () => console.log('Correct'))
```
57. <em>is_array_of_negative_integers()</em> or as getter <em>isArrayOfNegativeIntegers</em> - tests if the value property is an array, each element of which is negative integer.

Example:
```js
const arr = Array.from({ length: 100 }).map(el => -(Math.random() * 20) >> 0 || -100);
new validator(arr).isArrayOfNegativeIntegers
    .on(true, () => console.log('Correct'))
    .on(false, () => console.log('Something went wrong!'))
```
58. <em>is_array_of_positive_numbers()</em> or as getter <em>isArrayOfPositiveNumbers</em> - tests if the value property is an array of positive numbers.

Example:
```js
new validator(Array.from({length: 100}).map(Math.random))
    .isArrayOfPositiveNumbers
    .on(true, () => console.log('Correct!'));
```
59. <em>is_array_of_negative_numbers()</em> or as getter <em>isArrayOfNegativeNumbers</em> - tests if the value property is an array each element of which is negative number.

Example:
```js
const arr = Array.from({ length: 100 }).map(el => {
    el = -(Math.random() * 20);
    el = Math.abs(el) > 10 ? el + '': el;
    return el;
});
new validator(arr).Not.isArrayOfNegativeNumbers
    .on(true, () => console.log('Correct'))
    .on(false, () => console.log('Something went wrong!'))
```
