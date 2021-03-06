import {Key, Values, isArray} from "../../libs/types";
import {BaseSchema} from "../../libs/BaseSchema";
import {ValueSchemaError} from "../../libs/ValueSchemaError";

type Each<T> = {
	schema: BaseSchema<T>;
	ignoresErrors: boolean;
}
type EachLike<T> = BaseSchema<T> | Each<T>;

export interface Options<T>
{
	each?: EachLike<T>;
}

/**
 * apply schema
 * @param values input/output values
 * @param options options
 * @param keyStack key stack for error handling
 * @returns applied value
 */
export function applyTo<T>(values: Values, options: Options<T>, keyStack: Key[]): values is Values<T[]>
{
	const each = normalizeOptions(options.each);
	if(each === undefined)
	{
		return false;
	}

	// istanbul ignore next
	if(!isArray(values.output))
	{
		return false;
	}

	const adjustedValues: (T | null)[] = [];
	for(let idx = 0; idx < values.output.length; idx++)
	{
		let ignored = false;
		const element = values.output[idx];

		// A trick in order to call _applyTo() private method from the outside (like "friend")
		const adjustedValue = each.schema["_applyTo"](element, (err) =>
		{
			if(each.ignoresErrors)
			{
				ignored = true;
				return null;
			}

			ValueSchemaError.raise(err.cause, values, err.keyStack);
		}, [...keyStack, idx]);

		if(ignored)
		{
			continue;
		}
		adjustedValues.push(adjustedValue);
	}

	// replace with adjusted values
	values.output = adjustedValues;
	return false;
}

/**
 * normalize options
 * @param each each
 * @returns normalized options
 */
function normalizeOptions<T>(each?: EachLike<T>): Each<T> | void
{
	if(each === undefined)
	{
		return;
	}
	if(each instanceof BaseSchema)
	{
		return {
			schema: each as BaseSchema<T>,
			ignoresErrors: false,
		};
	}
	return each;
}
