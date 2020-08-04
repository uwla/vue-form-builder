import {isArray, isObject, isString} from '../helpers'

export default class RequestErrorHandler {
	/**
	 * Create a new RequestErrorHandler instance.
	 */
	constructor() {
		this._errors = {}
		this._errorMessage = ""
	}

	/**
	 * Clear errors for the given field
	 *
	 * @param {String} field
	 * @return {Object} this
	 */
	clearFieldErrors(field) {
		if (this.fieldHasError(field))
			delete this._errors[field]
		return this
	}

	/**
	 * Clear all errors
	 *
	 * @return {Object} this
	 */
	clearErrors() {
		this._errors = {}
		this._errorMessage = ""
		return this
	}

	/**
	 * Extract errors from http response
	 *
	 * @param {Object} response
	 * @return {Array} errors
	 */
	extractResponseErrors(response) {
		if (!  isObject(response.data))
			return

		let { data } = response
		let errors = {}

		if (isString(data.message))
			errors.message = data.message

		if (isObject(data.errors))
			errors.errors = data.errors

		return errors
	}

	/**
	 * Return whether a request field has error
	 *
	 * @return {Boolean}
	 */
	fieldHasError(field) {
		if (! isArray(this._errors[field]))
			return false
		return this._errors[field].length > 0
	}

	/**
	 * Get the first error for the given field
	 *
	 * @param {String} field
	 * @return {String|Null} fieldError
	 */
	getFieldError(field) {
		return this.getFieldErrors(field)[0] || null
	}

	/**
	 * Get all errors for the given field
	 *
	 * @return {Array} fieldErrors
	 */
	getFieldErrors(field) {
		return this._errors[field] || []
	}

	/**
	 * Get a copy of request errors
	 *
	 * @return {Array}
	 */
	getErrors() {
		return {...this._errors}
	}

	/**
	 * Get request errors as a flat array
	 *
	 * @return {Array}
	 */
	getErrorsAsArray() {
		return Object.values(this._errors).flat(Infinity)
	}

	/**
	 * Get the error message
	 *
	 * @return {Array}
	 */
	getErrorMessage() {
		return this._errorMessage
	}

	/**
	 * Handle a request failure
	 *
	 * @return {Object} this
	 */
	handleRequestFailure(error) {
		if (isObject(error.response)) {
			let errors = this.extractResponseErrors(error.response)
			this.setErrors(errors)
		}

		return this
	}

	/**
	 * Return whether the request has any errors
	 *
	 * @return {Boolean}
	 */
	hasError() {
		return Object.values(this._errors).length > 0
	}

	/**
	 * Push new errors
	 *
	 * @param {Object|String|Array} errors
	 * @return {Object} this
	 */
	pushErrors(errors) {
		if (isObject(errors)) {
			if (isString(errors.message))
				this._errorMessage += errors.message
			if (isObject(errors.errors))
				this._errors = {...this._errors, ...errors.errors}
		}

		return this
	}

	/**
	 * Set errors
	 *
	 * @param {Object|String} errors
	 * @return {Object} this
	 */
	setErrors(errors) {
		this.clearErrors().pushErrors(errors)
		return this
	}
}
