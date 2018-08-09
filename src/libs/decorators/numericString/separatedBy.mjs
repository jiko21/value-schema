import AdjusterBase from "../../AdjusterBase";

export default AdjusterBase.decoratorBuilder(_adjust)
	.init(_init)
	.features({
		separatedBy: _featureSeparatedBy,
	})
	.build();

/**
 * init
 * @param {Object} params parameters
 * @return {void}
 */
function _init(params)
{
	params.flag = false;
}

/**
 * ignore separator
 * @param {Object} params parameters
 * @param {string|String|RegExp} separator separator
 * @return {void}
 */
function _featureSeparatedBy(params, separator)
{
	params.flag = true;
	params.separator = separator;
}

/**
 * adjust
 * @param {Object} params parameters
 * @param {AdjusterBase.VALUES} values original / adjusted values
 * @return {boolean} end adjustment
 * @throws {AdjusterError}
 */
function _adjust(params, values)
{
	if(!params.flag)
	{
		return false;
	}

	values.adjusted = values.adjusted.split(params.separator).join("");
	return false;
}