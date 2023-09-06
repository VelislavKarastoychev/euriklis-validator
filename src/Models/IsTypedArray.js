"use strict";
/**
 * Implementation of the isTypedArray method. To detect when an array is typed array, we first test if the "value" parameter is an object type (because all Arrays are objects) and then we use the fact that all the typed arrays share the three common properties "buffer", "byteLength" and "byteOffset" as it is shown in the ES6 documentation (https://tc39.es/ecma262/#sec-typedarray-objects)
 * The tests of the two properties (buffer and byteOffset) are esential for the function because the ArrayBuffer instance shares the byteLength property with the typed arrays.
 * @param {Int8Array | Int16Array | Uint8Array | Uint16Array | Int32Array | Uint8Array | Float32Array | Float64Array | Uint8ClampedArray} value
 * @returns { boolean } if the counstructor of the "value" is some of the TypedArray categories, then returns true, otherwise returns false.
 */
export const IsTypedArray = (value) =>
  value instanceof Object
    ? "buffer" in value && "byteLength" in value && "byteOffset" in value
    : false;
