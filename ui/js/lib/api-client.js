'use strict';

import request from 'superagent';
import Promise from 'bluebird';

const cacheHeaders = {
	'X-Requested-With': 'XMLHttpRequest',
	'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1'
};

export default {
	get (url, query = {}, headers = {}) {
		return new Promise((res, rej) => {
			request.get(url)
				.withCredentials()
				.set(cacheHeaders)
				.set(headers)
				.query(query)
				.end((err, body) => {
					if (err) return rej(err);
					return res(body);
				});
		});
	},

	post (url, data = {}, query = {}, headers = {}) {
		return new Promise((res, rej) => {
			request.post(url)
				.withCredentials()
				.set(cacheHeaders)
				.set(headers)
				.query(query)
				.send(data)
				.end((err, body) => {
					if (err) return rej(err);
					return res(body);
				});
		});
	},

	put (url, data = {}, query = {}, headers = {}) {
		return new Promise((res, rej) => {
			request.put(url)
				.withCredentials()
				.set(cacheHeaders)
				.set(headers)
				.query(query)
				.send(data)
				.end((err, body) => {
					if (err) return rej(err);
					return res(body);
				});
		});
	},

	patch (url, data = {}, query = {}, headers = {}) {
		return new Promise((res, rej) => {
			request.patch(url)
				.withCredentials()
				.set(cacheHeaders)
				.set(headers)
				.query(query)
				.send(data)
				.end((err, body) => {
					if (err) return rej(err);
					return res(body);
				});
		});
	},

	delete (url, query = {}, headers = {}) {
		return new Promise((res, rej) => {
			request.delete(url)
				.withCredentials()
				.set(cacheHeaders)
				.set(headers)
				.query(query)
				.end((err, body) => {
					if (err) return rej(err);
					return res(body);
				});
		});
	}
};
