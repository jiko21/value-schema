import {Key, Values} from "../libs/types";
import {CAUSE, ValueSchemaError} from "../libs/ValueSchemaError";

export interface Options<T>
{
	ifUndefined?: T | null;
}

/**
 * apply schema
 * @param values input/output values
 * @param options options
 * @param keyStack key stack for error handling
 * @returns applied value
 */
export function applyTo<T>(values: Values, options: Options<T>, keyStack: Key[]): values is Values<T>
{
	if(values.output !== undefined)
	{
		return false;
	}

	if(options.ifUndefined !== undefined)
	{
		values.output = options.ifUndefined;
		return true;
	}

	ValueSchemaError.raise(CAUSE.UNDEFINED, values, keyStack);
}
