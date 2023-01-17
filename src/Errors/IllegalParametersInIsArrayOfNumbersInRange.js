'use strict';
const IllegalParametersInIsArrayOfNumbersInRange = () => {
    const error = new Error();
    error.name = 'euriklis/validator error message:';
    error.message = 'Illegal parameters in the is_array_of_numbers_in_range() method. Note that these parameters have to be numbers and in addition the first parameter has to be less than the second.';
    throw error;
}
export default IllegalParametersInIsArrayOfNumbersInRange;