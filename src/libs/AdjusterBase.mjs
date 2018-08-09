/**
 * get class decorators
 * @function
 * @param {function} TargetCass a target class
 * @return {AdjusterBase.DECORATOR[]}
 */
const getDecorators = (() =>
{
	/** @type {Map<function, AdjusterBase.DECORATOR[]>} */
	const decoratorsMap = new Map();

	return (TargetClass) =>
	{
		if(!decoratorsMap.has(TargetClass))
		{
			decoratorsMap.set(TargetClass, []);
		}
		return decoratorsMap.get(TargetClass);
	};
})();

/**
 * Decorator Builder
 */
class DecoratorBuilder
{
	/**
	 * constructor
	 * @param {AdjusterBase.Adjust} adjust adjuster function
	 */
	constructor(adjust)
	{
		this._adjust = adjust;
		this._init = null;
		this._features = null;
	}

	/**
	 * add init function
	 * @param {AdjusterBase.Init} init initializer
	 * @return {DecoratorBuilder} builder object (to be chained)
	 */
	init(init)
	{
		this._init = init;
		return this;
	}

	/**
	 * add feature functions
	 * @param {Object<string, AdjusterBase.Feature>} features feature functions
	 * @return {DecoratorBuilder} builder object (to be chained)
	 */
	features(features)
	{
		this._features = features;
		return this;
	}

	/**
	 * build decorator
	 * @return {AdjusterBase.ClassDecorator} decorator function
	 */
	build()
	{
		return (TargetClass) =>
		{
			const key = Symbol("");
			const init = this._init;
			const features = this._features;
			const adjust = this._adjust;

			const decorators = getDecorators(TargetClass);
			decorators.push({
				key: key,
				adjust: adjust,
				init: init,
			});

			// register feature functions
			if(features !== null)
			{
				for(const name of Object.keys(features))
				{
					TargetClass.prototype[name] = function(...args)
					{
						const params = this._params.get(key);
						features[name](params, ...args);
						return this;
					};
				}
			}

			return TargetClass;
		};
	}
}

/**
 * Adjuster Base Class
 */
export default class AdjusterBase
{
	/**
	 * returns DecoratorBuilder
	 * @param {function} adjust adjuster function
	 * @return {DecoratorBuilder} builder object (to be chained)
	 */
	static decoratorBuilder(adjust)
	{
		return new DecoratorBuilder(adjust);
	}

	/**
	 * constructor
	 */
	constructor()
	{
		/** @type {Map<Symbol, Object>} */
		this._params = new Map();

		const decorators = getDecorators(this.constructor);
		for(const decorator of decorators)
		{
			this._params.set(decorator.key, {});
			if(decorator.init !== null)
			{
				const params = this._params.get(decorator.key);
				decorator.init(params);
			}
		}
	}

	/**
	 * do adjust
	 * @param {*} value value to be checked
	 * @param {AdjusterBase.OnError} [onError] callback function on error
	 * @return {*} adjusted value
	 */
	adjust(value, onError = AdjusterBase.onErrorDefault)
	{
		const values = {
			original: value,
			adjusted: value,
		};

		try
		{
			const decorators = getDecorators(this.constructor);
			for(const decorator of decorators)
			{
				const params = this._params.get(decorator.key);
				if(decorator.adjust(params, values))
				{
					return values.adjusted;
				}
			}

			return values.adjusted;
		}
		catch(err)
		{
			return onError(err);
		}
	}

	/**
	 * default error handler
	 * @param {AdjusterError} err error object
	 * @return {void}
	 */
	static onErrorDefault(err)
	{
		throw err;
	}
}

/**
 * @typedef {Object} AdjusterBase.DECORATOR
 * @property {Symbol} key
 * @property {AdjusterBase.Adjust} adjust
 * @property {?AdjusterBase.Init} init
 */

/**
 * @typedef {Object} AdjusterBase.VALUES
 * @property {*} original
 * @property {*} adjusted
 */
/**
 * type of callback function on error
 * @callback AdjusterBase.OnError
 * @param {AdjusterError} err
 * @return {*}
 */

/**
 * init function
 * @callback AdjusterBase.Init
 * @param {Object} params parameters
 */
/**
 * feature function
 * @callback AdjusterBase.Feature
 * @param {Object} params parameters
 * @param {...*} args arguments
 */
/**
 * adjuster
 * @callback AdjusterBase.Adjust
 * @param {Object} params parameters
 * @param {AdjusterBase.VALUES} values original / adjusted values
 * @return {boolean} end adjustment
 * @throws {AdjusterError}
 */
/**
 * class decorator
 * @callback AdjusterBase.ClassDecorator
 * @param {class} TargetClass
 * @return {class}
 */