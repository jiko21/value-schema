import AdjusterBase from "../libs/AdjusterBase";

import Default from "../libs/decorators/default";
import AllowEmptyString from "../libs/decorators/allowEmptyString";
import Type from "../libs/decorators/string/type";
import MinLength from "../libs/decorators/string/minLength";
import MaxLength from "../libs/decorators/string/maxLength";
import SeparatedBy from "../libs/decorators/numericString/separatedBy";
import Pattern from "../libs/decorators/numericString/pattern";
import Checksum from "../libs/decorators/numericString/checksum";

/**
 * factory
 * @return {NumericStringAdjuster}
 */
export default () =>
{
	return new NumericStringAdjuster();
};

/**
 * adjuster for numeric string
 */
@Checksum
@MaxLength
@MinLength
@Pattern
@SeparatedBy
@Type
@AllowEmptyString
@Default
class NumericStringAdjuster extends AdjusterBase
{
	/**
	 * set default value
	 * @method
	 * @name NumericStringAdjuster#default
	 * @param {string} value default value
	 * @return {NumericStringAdjuster}
	 */

	/**
	 * allow empty string
	 * @method
	 * @name NumericStringAdjuster#allowEmptyString
	 * @param {?string} [value=null] value on empty
	 * @return {NumericStringAdjuster}
	 */

	/**
	 * ignore separator
	 * @method
	 * @name NumericStringAdjuster#separatedBy
	 * @param {string|String|RegExp} separator separator
	 * @return {NumericStringAdjuster}
	 */

	/**
	 * set min-length
	 * @method
	 * @name NumericStringAdjuster#minLength
	 * @param {int} value min-length; error if shorter
	 * @return {NumericStringAdjuster}
	 */

	/**
	 * set max-length
	 * @method
	 * @name NumericStringAdjuster#maxLength
	 * @param {int} length max-length; error if longer
	 * @param {boolean} [adjust=false] truncate if longer; default is ERROR
	 * @return {NumericStringAdjuster}
	 */

	/**
	 * validate by checksum
	 * @method
	 * @name NumericStringAdjuster#checksum
	 * @param {string} algorithm checksum algorithm
	 * @return {NumericStringAdjuster}
	 */

	/**
	 * do adjust
	 * @method
	 * @name NumericStringAdjuster#adjust
	 * @param {*} value value to be checked
	 * @param {?AdjusterBase.OnError} [onError=null] callback function on error
	 * @return {string} adjusted value
	 * @throws {AdjusterError}
	 */
}