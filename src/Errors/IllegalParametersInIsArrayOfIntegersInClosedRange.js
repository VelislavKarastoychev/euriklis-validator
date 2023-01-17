'use strict';
const IllegalParametersInIsArrayOfIntegersInClosedRange = () => {
    const error = new Error();
    error.name = '@euriklis/validator error message:';
    error.message = 'Illegal parameters in the is_array_of_integers_in_closed_range() method. Note that the parameters of this method have to be numbers with the first parameter to be less than the second.';
    throw error;
}
export default IllegalParametersInIsArrayOfIntegersInClosedRange;