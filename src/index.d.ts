export = adjuster
export as namespace adjuster

declare namespace adjuster
{
	/**
	 * adjust multiple variables (as object)
	 * @param data data to be adjusted
	 * @param constraints adjuster objects
	 * @param [onError] error handler
	 * @returns adjusted data
	 */
	function adjust(data: Input, constraints: Constraints, onError?: ErrorHandler): Object

	function boolean(): BooleanAdjuster
	function number(): NumberAdjuster
	function string(): StringAdjuster
	function numericString(): NumericStringAdjuster
	function ipv4(): IPv4Adjuster
	function ipv6(): IPv6Adjuster
	function email(): EmailAdjuster
	function array(): ArrayAdjuster
	function object(): ObjectAdjuster

	const CAUSE: ConstantsCause;
	const STRING: ConstantsStringOptions;
	const NUMERIC_STRING: ConstantsNumericStringOptions;
}

// interface definitions
interface AdjusterError extends Error
{
	name: string
	cause: string
	value: any
	keyStack: Key[]
}

interface AdjusterBase<T>
{
	/**
	 * do adjust
	 * @param value to be checked
	 * @param [onError=null] callback function on error
	 * @returns adjusted value
	 */
	adjust(value: Input, onError?: ErrorHandler<T>): T
}

interface BooleanAdjuster extends AdjusterBase<boolean>
{
	/**
	 * enable strict type check
	 * @returns chainable instance
	 */
	strict(): this

	/**
	 * accept all numbers as boolean
	 * @returns chainable instance
	 */
	acceptAllNumbers(): this

	/**
	 * set default value
	 * @param value default value
	 * @returns chainable instance
	 */
	default(value: boolean): this

	/**
	 * accept null
	 * @param [value=null] value on null
	 * @returns chainable instance
	 */
	acceptNull(value?: boolean | null): this

	/**
	 * accept empty string
	 * @param [value=null] value on empty
	 * @returns chainable instance
	 */
	acceptEmptyString(value?: boolean | null): this
}

interface NumberAdjuster extends AdjusterBase<number>
{
	/**
	 * enable strict type check
	 * @returns chainable instance
	 */
	strict(): this

	/**
	 * set default value
	 * @param value default value
	 * @returns chainable instance
	 */
	default(value: number): this

	/**
	 * accept null
	 * @param [value=null] value on null
	 * @returns chainable instance
	 */
	acceptNull(value?: number | null): this

	/**
	 * accept empty string
	 * @param [value=null] value on empty
	 * @returns chainable instance
	 */
	acceptEmptyString(value?: number | null): this

	/**
	 * accept all special formats; i.e., "1e+10", "0x100"
	 * @returns chainable instance
	 */
	acceptSpecialFormats(): this

	/**
	 * limit value to integer chain
	 * @param [adjust=false] adjust to integer value is not an integer; default is ERROR
	 * @returns chainable instance
	 */
	integer(adjust?: boolean): this

	/**
	 * accept only specified values
	 * @param values values to be accepted
	 * @returns chainable instance
	 */
	only(...values: number[]): this

	/**
	 * set min-value
	 * @param value min-value
	 * @param [adjust=false] adjust to min-value if value < min-value; default is ERROR
	 * @returns chainable instance
	 */
	minValue(value: number, adjust?: boolean): this

	/**
	 * set max-value
	 * @param value max-value
	 * @param [adjust=false] adjust to max-value if value > max-value; default is ERROR
	 * @returns chainable instance
	 */
	maxValue(value: number, adjust?: boolean): this
}

interface StringAdjuster extends AdjusterBase<string>
{
	/**
	 * enable strict type check
	 * @returns chainable instance
	 */
	strict(): this

	/**
	 * set default value
	 * @param value default value
	 * @returns chainable instance
	 */
	default(value: string): this

	/**
	 * accept null
	 * @param [value=null] value on null
	 * @returns chainable instance
	 */
	acceptNull(value?: string | null): this

	/**
	 * accept empty string
	 * @param [value=null] value on empty
	 * @returns chainable instance
	 */
	acceptEmptyString(value?: string | null): this

	/**
	 * remove whitespace from both ends
	 * @returns chainable instance
	 */
	trim(): this

	/**
	 * accept only specified values
	 * @param values values to be accepted
	 * @returns chainable instance
	 */
	only(...values: string[]): this

	/**
	 * set min-length
	 * @param length min-length; error if shorter
	 * @returns chainable instance
	 */
	minLength(length: number): this

	/**
	 * set max-length
	 * @param length max-length; error if longer
	 * @param [adjust=false] truncate if longer; default is ERROR
	 * @returns chainable instance
	 */
	maxLength(length: number, adjust?: boolean): this

	/**
	 * specify acceptable pattern by regular expression
	 * @param pattern acceptable pattern(regular expression)
	 * @returns chainable instance
	 */
	pattern(pattern: RegExp): this
}

interface NumericStringAdjuster extends AdjusterBase<string>
{
	/**
	 * set default value
	 * @param value default value
	 * @returns chainable instance
	 */
	default(value: string): this

	/**
	 * accept null
	 * @param [value=null] value on null
	 * @returns chainable instance
	 */
	acceptNull(value?: string | null): this

	/**
	 * accept empty string
	 * @param [value=null] value on empty
	 * @returns chainable instance
	 */
	acceptEmptyString(value?: string | null): this

	/**
	 * join array into string
	 * @returns chainable instance
	 */
	joinArray(): this

	/**
	 * ignore separator
	 * @param separator separator
	 * @returns chainable instance
	 */
	separatedBy(separator: Separator): this

	/**
	 * set min-length
	 * @param length min-length; error if shorter
	 * @returns chainable instance
	 */
	minLength(length: number): this

	/**
	 * set max-length
	 * @param length max-length; error if longer
	 * @param [adjust=false] truncate if longer; default is ERROR
	 * @returns chainable instance
	 */
	maxLength(length: number, adjust?: boolean): this

	/**
	 * validate by checksum
	 * @param algorithm checksum algorithm
	 * @returns chainable instance
	 */
	checksum(algorithm: string): this
}

interface IPv4Adjuster extends AdjusterBase<string>
{
	/**
	 * set default value
	 * @param value default value
	 * @returns chainable instance
	 */
	default(value: string): this

	/**
	 * accept null
	 * @param [value=null] value on null
	 * @returns chainable instance
	 */
	acceptNull(value?: string | null): this

	/**
	 * accept empty string
	 * @param [value=null] value on empty
	 * @returns chainable instance
	 */
	acceptEmptyString(value?: string | null): this

	/**
	 * remove whitespace from both ends
	 * @returns chainable instance
	 */
	trim(): this
}

interface IPv6Adjuster extends AdjusterBase<string>
{
	/**
	 * set default value
	 * @param value default value
	 * @returns chainable instance
	 */
	default(value: string): this

	/**
	 * accept null
	 * @param [value=null] value on null
	 * @returns chainable instance
	 */
	acceptNull(value?: string | null): this

	/**
	 * accept empty string
	 * @param [value=null] value on empty
	 * @returns chainable instance
	 */
	acceptEmptyString(value?: string | null): this

	/**
	 * remove whitespace from both ends
	 * @returns chainable instance
	 */
	trim(): this
}

interface EmailAdjuster extends AdjusterBase<string>
{
	/**
	 * set default value
	 * @param value default value
	 * @returns chainable instance
	 */
	default(value: string): this

	/**
	 * accept null
	 * @param [value=null] value on null
	 * @returns chainable instance
	 */
	acceptNull(value?: string | null): this

	/**
	 * accept empty string
	 * @param [value=null] value on empty
	 * @returns chainable instance
	 */
	acceptEmptyString(value?: string | null): this

	/**
	 * remove whitespace from both ends
	 * @returns chainable instance
	 */
	trim(): this

	/**
	 * specify acceptable pattern by regular expression
	 * @param pattern acceptable pattern(regular expression)
	 * @returns chainable instance
	 */
	pattern(pattern: RegExp): this
}

interface ArrayAdjuster extends AdjusterBase<any[]>
{

	/**
	 * set default value; enable to omit
	 * @param value default value
	 * @returns chainable instance
	 */
	default(value: any[]): this

	/**
	 * accept null
	 * @param [value=null] value on null
	 * @returns chainable instance
	 */
	acceptNull(value?: any[] | null): this

	/**
	 * accept empty string
	 * @param [value=null] value on empty
	 * @returns chainable instance
	 */
	acceptEmptyString(value?: any[] | null): this

	/**
	 * accept string and set separator
	 * @param separator separator
	 * @returns chainable instance
	 */
	separatedBy(separator: Separator): this

	/**
	 * convert to array, if not
	 * @returns chainable instance
	 */
	toArray(): this

	/**
	 * set min-length of array elements
	 * @param length min-length; error if shorter
	 * @returns chainable instance
	 */
	minLength(length: number): this

	/**
	 * set max-length of array elements
	 * @param length max-length
	 * @param [adjust=false] truncate if longer; default is ERROR
	 * @returns chainable instance
	 */
	maxLength(length: number, adjust?: boolean): this

	/**
	 * apply constraints for each elements
	 * @param adjusterInstance adjuster to apply
	 * @param [ignoreEachErrors=false] ignore errors of each elements
	 * @returns chainable instance
	 */
	each(adjusterInstance: AdjusterBase<any>, ignoreEachErrors?: boolean): this
}

interface ObjectAdjuster extends AdjusterBase<Object>
{
	/**
	 * set default value; enable to omit
	 * @param value default value
	 * @returns chainable instance
	 */
	default(value: Object): this

	/**
	 * accept null
	 * @param [value=null] value on null
	 * @returns chainable instance
	 */
	acceptNull(value?: Object | null): this

	/**
	 * accept empty string
	 * @param [value=null] value on empty
	 * @returns chainable instance
	 */
	acceptEmptyString(value?: Object | null): this

	/**
	 * apply constraints
	 * @param constraints constraints to apply
	 * @returns chainable instance
	 */
	constraints(constraints: Constraints): this
}

// type definitions
type Input = null | boolean | number | string | any[] | Object
type Constraints = { [name: string]: AdjusterBase<any> }
type ErrorHandler<T = any> = (err: AdjusterError | null) => T | void
type Key = string | number
type Separator = RegExp | string

type ConstantsCause = {
	TYPE: string,
	REQUIRED: string,
	NULL: string,
	EMPTY: string,
	ONLY: string,

	MIN_VALUE: string,
	MAX_VALUE: string,

	MIN_LENGTH: string,
	MAX_LENGTH: string,
	PATTERN: string,

	CHECKSUM: string,

	ARRAY: string,
}
type ConstantsStringOptions = {
	PATTERN: {
		EMAIL: RegExp,
		IPV4: RegExp,
		IPV6: RegExp,
		URI: RegExp,
	},
}
type ConstantsNumericStringOptions = {
	CHECKSUM_ALGORITHM: {
		LUHN: string,
		CREDIT_CARD: string,

		MODULUS10_WEIGHT3_1: string,
		ISBN13: string,
		EAN: string,
		JAN: string,
	},
}

// internal types
type DecoratorValues = {
	original: Input,
	adjusted: Input,
}
type DecoratorInfo<T = any> = {
	key: Symbol,
	init: DecoratorInit
	adjust?: DecoratorAdjust<T>,
}
type DecoratorInit = (params: Object) => void
type DecoratorFeature = (params: Object, ...args: any[]) => void
type DecoratorAdjust<T = any> = (params: Object, value: DecoratorValues, onError?: ErrorHandler<T>) => boolean

type Class = Function
type ClassDecorator = (TargetClass: Class) => Class
