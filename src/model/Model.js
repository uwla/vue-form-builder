import { deepCopy, deleteNullProps, isArray, isObject, isString } from '../helpers'
import RequestErrorHandler from './RequestErrorHandler'
import axios from 'axios'

export default class Model extends RequestErrorHandler {
	/**
	 * Create a new form instance.
	 *
	 * @param {Object} options
	 * @returns {void}
	 */
	constructor(originalData = {}) {
		super()

		/**
		 * The original data of the model
		 *
		 * @var {Object}
		 */
		this._originalData = deepCopy(originalData)

		/**
		 * Whether the request has finished
		 *
		 * @var {Boolean}
		 */
		this._isBusy = false

		/**
		 * Whether the request has succeed
		 *
		 * @var {Boolean}
		 */
		this._successful = false


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
		this.fill(this.originalData())
	}

	//
	// ─── SYNC ───────────────────────────────────────────────────────────────────────
	//

	/**
	 * Clear each secrete field
	 *
	 * @returns {Object} this
	 */
	clearSecretes() {
		for (let secrete of this.secretes()) {
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
	 * Fill attributes that are mass assignable
	 *
	 * @param {Object} data
	 * @returns {Object} this
	 */
	fill(data) {
		for (let attr in data) {
			if (this.fillable().includes(attr))
				this[attr] = deepCopy(data[attr])
		}

		return this
	}

	/**
	 * Get the values of this model's attributes
	 *
	 * @return {Object}
	 */
	getValues(... attributes) {
		if (attributes.length === 0)
			attributes = this.attributes()

		const values = {}

		for (let attr of attributes)
			values[attr] = this[attr]

		return values;
	}

	/**
	 * Reset the form fields.
	 *
	 * @returns {Object} this
	 */
	reset() {
		const originalData = this.originalData()
		const defaults = this.defaults()
		const attributes = this.attributes()

		attributes.forEach(attr => {
			if (originalData[attr] !== undefined)
				this[attr] = deepCopy(originalData[attr])
			else if (defaults[attr] !== undefined)
				this[attr] = defaults[attr]
			else
				this[attr] = ""
		})

		return this
	}

	/**
	 * Set this fields to the default
	 *
	 * @returns {Object} this
	 */
	setDefaultFieldValues() {
		const defaults = this.defaults();

		for (let field in defaults)
			this[field] = defaults[field]

		return this
	}

	/**
	 * Set this original data
	 *
	 * @returns {Object} this
	 */
	setOriginalData(data) {
		this._originalData = deepCopy(data)
		this.fill(data)
		return this
	}

	/**
	 * Sync original data
	 *
	 * @returns {Object} this
	 */
	sync() {
		this.fields().forEach(field => {
			if (! this.secretes().includes(field))
				this.originalData()[field] = this[field]
		})

		return this
	}

	//
	// ─── REQUESTS ───────────────────────────────────────────────────────────────────
	//

	/**
	 * Executes callback after a request
	 *
	 * @returns {void}
	 */
	afterRequest() {
		this.clearSecretes()
	}

	/**
	 * Executes callback after a successful request
	 *
	 * @returns {void}
	 */
	afterSuccessfulRequest(response) {
		this._successful = true
	}

	/**
	 * Executes callback after a successful request
	 *
	 * @returns {void}
	 */
	afterFailedRequest(error) {
		this._successful = false
		this.handleRequestFailure(error)
	}

	/**
	 * Get the api client responsible for sending the request
	 *
	 * @returns {void}
	 */
	apiClient() {
		return window.axios || axios
	}

	/**
	 * Executes callback before sending the request
	 */
	beforeSendRequest() {
		// intended to be overridden
	}

	/**
	 * Finish the request
	 *
	 * @returns {void}
	 */
	finishRequest() {
		this.afterRequest()
		this._isBusy = false
	}

	/**
	 * Start the request
	 *
	 * @returns {void}
	 */
	startRequest() {
		this.clearErrors()
		this._isBusy = true
	}

	//
	// ─── ASYNC ──────────────────────────────────────────────────────────────────────
	//

	/**
	 * Send an ajax request
	 *
	 * @param {String} method
	 * @param {String} url
	 * @param {Object} data
	 * @param {Object} config
	 * @returns {Promise}
	 */
	sendRequest({ method, url, data = {}, config = {} }) {
		// don't send request if
		// other request is pending
		if (this._isBusy)
			return

		this.startRequest()
		this.beforeSendRequest()

		return new Promise((resolve, reject) => {
			this.apiClient()
				.request({ url, method, data, ... config })
				.then(response => {
					this.afterSuccessfulRequest(response)
					resolve(response)
				}).catch(error => {
					this.afterFailedRequest(error)
					reject(error)
				}).finally(() => {
					this.finishRequest()
				})
		})
	}

	/**
	 * Send a post request
	 *
	 * @param {String} url
	 * @param {Object} config
	 * @returns {Promise}
	 */
	async post(url, config = {}) {
		return await this.sendRequest({
			method: 'post',
			url,
			data: this.data(),
			config,
		})
	}

	/**
	 * Send a put request
	 *
	 * @param {String} url
	 * @param {Object} config
	 * @returns {Promise}
	 */
	async put(url, config = {}) {
		return await this.sendRequest({
			method: 'put',
			url,
			data: this.data(),
			config,
		})
	}

	/**
	 * Send a patch request
	 *
	 * @param {String} url
	 * @param {Object} config
	 * @returns {Promise}
	 */
	async patch(url, config = {}) {
		return await this.sendRequest({
			method: 'patch',
			url,
			data: this.data(),
			config,
		})
	}

	/**
	 * Create this resource
	 *
	 * @return {Promise}
	 */
	async create() {
		return await this.sendRequest({
			method: 'post',
			data: this.data(),
			url: this.apiEndpoints('create'),
		})
	}

	/**
	 * Destroy this resource
	 *
	 * @return {Promise}
	 */
	async destroy() {
		return await this.sendRequest({
			method: 'delete',
			url: this.apiEndpoints('delete'),
		})
	}

	/**
	 * Fetch this resource
	 *
	 * @return {Promise}
	 */
	async fetch() {
		return await this.sendRequest({
			method: 'get',
			url: this.apiEndpoints('view'),
		})
	}

	/**
	 * Updates this resource in storage
	 *
	 * @return {Promise}
	 */
	async update() {
		return await this.sendRequest({
			method: 'put',
			url: this.apiEndpoints('update'),
			data: this.data(),
		})
	}
	//
	// ─── CONFIG ────────────────────────────────────────────────────────────────────
	//

	/**
	 * The attributes
	 *
	 * @returns {Array}
	 */
	attributes() {
		// this is intended to be overridden
	}

	/**
	 * The api endpoints for this resource
	 *
	 * @param {String} action
	 * @returns {String}
	 */
	apiEndpoints(action) {
		// this is intended to be overridden
	}

	/**
	 * How the fields should be rendered
	 *
	 * @returns {Array}
	 */
	fields() {
		// this is intended to be overridden
	}

	/**
	 * Get the data that should be sent in the request
	 *
	 * @returns {Object}
	 */
	data() {
		const data = {}

		this.fields()
			.filter(field => ! this.omitted().includes(field))
			.forEach(field => data[field] = this[field])

		if (this.omitNull())
			deleteNullProps(data)

		return data
	}

	/**
	 * The default values of the fields.
	 *
	 * @returns {Array}
	 */
	defaults() {
		const defaults = {};

		this.fields().forEach(field => defaults[field] = "");

		return defaults;
	}

	/**
	 * The attributes that are mass assignable.
	 *
	 * @returns {Array}
	 */
	fillable() {
		return this.attributes()
	}

	/**
	 * The fields that should never be sent with the request
	 *
	 * @returns {Array}
	 */
	omitted() {
		return []
	}

	/**
	 * Whether to omit null fields with the request
	 *
	 * @returns {Boolean}
	 */
	omitNull() {
		return true
	}

	/**
	 * The model's original data
	 *
	 * @returns {Object}
	 */
	originalData() {
		return this._originalData
	}

	/**
	 * The fields that should be cleared after each request
	 *
	 * @returns {Array}
	 */
	secretes() {
		return ["password", "password_confirmation"]
	}
}
