import RequestErrorHandler from './RequestErrorHandler'
import axios from 'axios'

class Requester extends RequestErrorHandler {
	/**
	 * Create a new Requester instance.
	 */
	constructor() {
		super();

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
	}

	// Some of the following methods are intended to be override

	/**
	 * Executes callback after the request
	 */
	afterRequest() { }

	/**
	 * Executes callback after a successful request
	 */
	afterSuccessfulRequest(response) {
		this._successful = true
	}

	/**
	 * Executes callback after a successful request
	 */
	afterFailedRequest(error) {
		this._successful = false
		this.handleRequestFailure(error)
	}

	/**
	 * Executes callback before sending the request
	 */
	beforeSendRequest() { }

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
	 * Get the api client responsible for sending the request
	 *
	 * @returns {void}
	 */
	getApiClient() {
		return window.axios || axios;
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

	/**
	 * Send an ajax request
	 *
	 * @param {String} method
	 * @param {String} url
	 * @param {Object} data
	 * @param {Object} config
	 * @returns {Promise} response
	 */
	sendRequest(method, url, data = {}, config = {}) {
		// don't send request if
		// other request is pending
		if (this._isBusy)
			return

		this.startRequest()
		this.beforeSendRequest()

		const apiClient = this.getApiClient();

		return new Promise((resolve, reject) => {
			apiClient
				.request({url, method, data, ...config})
				.then(response => {
					this.afterSuccessfulRequest(response)
					resolve(response)
				}).catch(error => {
					this.afterFailedRequest(error)
					reject(error)
				}).finally(() => this.finishRequest())
		})
	}
}

export default Requester;
