export default fit;

import fitToObject from "./fitToObject";
import BaseSchema from "./BaseSchema";

/**
 * fit data to schema
 * @param {Input} data data to be fitted
 * @param {SchemaObject} schemaObject schema objects
 * @param {ErrorHandler} [onError] error handler
 * @returns {Object<string, *>} fitted data
 */
function fit(data, schemaObject, onError = BaseSchema.onErrorDefault)
{
	return fitToObject(data, schemaObject, onError, []);
}
