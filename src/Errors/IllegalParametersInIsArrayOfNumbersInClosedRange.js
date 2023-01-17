'use strict';
const IllegalParametersInIsArrayOfNumbersInClosedRange = () => {
    const error = new Error();
    error.name = '@euriklis/validator error message:';
    error.message = 'Illegal parameters in is_array_of_numbers_in_closed_range(a, b) method. Note that the parameters of the method have to be numbers and in addition the first has to be smaller than the second.';
    throw error;
}
export default IllegalParametersInIsArrayOfNumbersInClosedRange;