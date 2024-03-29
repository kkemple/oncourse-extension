'use strict';

import request from 'superagent';
import Promise from 'bluebird';

const commonHeaders = {
	'X-Requested-With': 'XMLHttpRequest',
	'Accept': 'application/vnd.github.moondragon+json'
};

export default {
	get (url, query = {}, headers = {}) {
		return new Promise((res, rej) => {
			request.get(url)
				.withCredentials()
				.set(commonHeaders)
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
				.set(commonHeaders)
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
				.set(commonHeaders)
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
				.set(commonHeaders)
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
				.set(commonHeaders)
				.set(headers)
				.query(query)
				.end((err, body) => {
					if (err) return rej(err);
					return res(body);
				});
		});
	}
};
