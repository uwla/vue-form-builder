import { deepCopy, deleteNullProps, isArray, isObject, isString } from '../helpers'
import Requester from './Requester'

class Form extends Requester {
	/**
	 * Create a new form instance.
	 *
	 * @param {Object} options
	 * @return {void}
	 */
	constructor(options = {}) {
		super()

		/**
		 * The property underscore will store all
		 * configuration and data of this Form,
		 * such as fields, default values. This
		 * will avoid conflict because some of the
		 * configuration properties may have the same
		 * name as the form fields.
		 *
		 * @var {Object}
		 */
		this._ = {}

		/**
		 * Assign the data and the configuration for
		 * this instance.
		*/
		Object.assign(this._, options)

		/**
		 * First, we set the default values to the
		 * fields of this instance, so we can
		 * make use of Vue reactivity.
		 */
		this.setDefaultFieldValues()

		/**
		 * Next, we fill this model with the original
		 * data. This simply copies all fillable
		 * fields in originalData to this instance.
		 */
		this.fill(this._originalData)
	}

	//
	// ─── METHODS ────────────────────────────────────────────────────────────────────
	//

	/**
	 * Executes callback after a request
	 *
	 * @return {void}
	 */
	afterRequest() {
		this.clearSecretes()
	}

	/**
	 * Clear each secrete field
	 *
	 * @return {Object} this
	 */
	clearSecretes() {
		for (let secrete of this._secretes) {
			if (! this.hasOwnProperty(secrete))
				continue
			if (isString(this[secrete]))
				this[secrete] = ""
			else if (isArray(this[secrete]))
				this[secrete] = []
			else if (isObject(this[secrete]))
				this[secrete] = {}
			else
				this[secrete] = null
		}

		return this
	}

	/**
	 * Fill fields that are mass assignable
	 *
	 * @param {Object} data
	 * @return {Object} this
	 */
	fill(data) {
		for (let field in data) {
			if (this._fillable.includes(field))
				this[field] = deepCopy(data[field])
		}

		return this
	}

	/**
	 * Reset the form fields.
	 *
	 * @return {Object} this
	 */
	reset() {
		this._fields.forEach(field => {
			if (this._originalData[field] !== undefined)
				this[field] = deepCopy(this._originalData[field])
			else if (this._defaults[field] !== undefined)
				this[field] = this._defaults[field]
			else
				this[field] = ""
		})
		return this
	}

	/**
	 * Set this fields to the default
	 *
	 * @return {Object} this
	 */
	setDefaultFieldValues() {
		for (let field in this._defaults)
			this[field] = this._defaults[field]

		return this
	}

	/**
	 * Set this original data
	 *
	 * @return {Object} this
	 */
	setOriginalData(data) {
		this._.originalData = deepCopy(data)
		this.fill(data)
		return this;
	}

	/**
	 * Sync original data
	 *
	 * @return {Object} this
	 */
	sync() {
		this._fields.forEach(field => {
			if (! this._secretes.includes(field))
				this._originalData[field] = this[field]
		})

		return this
	}

	//
	// ─── GETTERS ────────────────────────────────────────────────────────────────────
	//

	/**
	 * The form fields
	 *
	 * @return {Array}
	 */
	get _fields() {
		return this._.fields
	}

	/**
	 * Get the data that should be sent in the request
	 *
	 * @return {Object}
	 */
	get _data() {
		let {_fields, _omitNull, _omitted} = this
		let data = {}

		_fields.filter(field => ! _omitted.includes(field))
					.forEach(field => data[field] = this[field])

		if (_omitNull)
			deleteNullProps(data)

		return data
	}

	/**
	 * The default values of the fields.
	 *
	 * @return {Array}
	 */
	get _defaults() {
		return this._.defaults ||
			this._fields.reduce((defaults, field) => ({...defaults, [field]: ""}), {})
	}

	/**
	 * The fields that are mass assignable.
	 *
	 * @return {Array}
	 */
	get _fillable() {
		return this._.fillable || this._fields
	}

	/**
	 * The fields that should never be sent with the request
	 *
	 * @return {Array}
	 */
	get _omitted() {
		return this._.omitted || []
	}

	/**
	 * Whether to omit null fields with the request
	 *
	 * @return {Boolean}
	 */
	get _omitNull() {
		return this._.hasOwnProperty('omitNull') ? this._.omitNull : true
	}

	/**
	 * The model's original data
	 *
	 * @return {Object}
	 */
	get _originalData() {
		return this._.originalData || {}
	}

	/**
	 * The fields that should be cleared after each request
	 *
	 * @return {Array}
	 */
	get _secretes() {
		return this._.secretes || ["password", "password_confirmation"]
	}
}

/**
 * Attach https methods to the Form class, making it
 * more convenient to send requests. For example,
 * instead of caliing form.sendRequest("post", url),
 * we can call form.post(url)
 *
 * Since these methods use the same parameters, it is
 * convenient to add them dynamically instead of repeating
 * the code several times.
 */

let methods = ["delete", "get", "patch", "post", "put"]

methods.forEach(method => {
	Form.prototype[method] = function (url, config) {
		let data = this._data;
		return this.sendRequest(method, url, data, config)
	}
})

export default Form;
