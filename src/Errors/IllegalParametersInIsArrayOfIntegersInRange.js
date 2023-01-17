'use strict';
const IllegalParametersInIsArrayOfIntegersInRange = () => {
    const error = new Error();
    error.name = 'euriklis validator error message:';
    error.message = 'Illegal parameters in the is_array_of_integers_in_range() method. The parameters have to be integers and the first to be smaller than the second.';
    throw error;
}
export default IllegalParametersInIsArrayOfIntegersInRange;