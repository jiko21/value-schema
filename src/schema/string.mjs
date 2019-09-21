import BaseSchema from "../libs/BaseSchema";

import Default from "../decorators/default";
import AcceptNull from "../decorators/acceptNull";
import AcceptEmptyString from "../decorators/acceptEmptyString";
import Only from "../decorators/only";
import Convert from "../decorators/convert";
import Type from "../decorators/string/type";
import Trim from "../decorators/string/trim";
import MinLength from "../decorators/string/minLength";
import MaxLength from "../decorators/string/maxLength";
import Pattern from "../decorators/string/pattern";

/**
 * factory
 * @returns {StringSchema} schema instance
 */
export default () =>
{
	return new StringSchema();
};

/**
 * for string
 */
@Convert
@Pattern
@MaxLength
@MinLength
@AcceptEmptyString
@Only
@Trim
@Type
@AcceptNull
@Default
class StringSchema extends BaseSchema
{
}