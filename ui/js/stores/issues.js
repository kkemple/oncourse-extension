'use strict';

import UserStore from './user';
import dispatcher from 'lib/dispatcher';
import actions from 'lib/actions';
import apiClient from 'lib/api-client';
import storeMixin from 'lib/store-mixin';
import assign from 'lodash.assign';
import filter from 'lodash.filter';
import throttle from 'lodash.throttle';
import find from 'lodash.find';
import bind from 'lodash.bind';

const issuesUrl = 'https://api.github.com/user/issues';
let authHeader = {'Authorization': `token ${UserStore.getToken()}`};

const throttledGet = throttle(apiClient.get, 300);

let search;

const IssuesStore = assign({}, storeMixin, {
	_changeEvent: actions.ISSUES_STORE_UPDATED,

	_issues: [],

	fetch () {
		if (!UserStore.getToken()) return;

		throttledGet(issuesUrl, {}, authHeader)
			.then((response) => {
				if (response.error) {
					console.warn(response.error);
					return;
				}

				this._issues = filter(response.body, (i) => {
					if (i.pull_request) return false;

					return true;
				});
				this.emitChange();
			});
	},

	getById (id) {
		return find(this._issues, (i) => i.id === id);
	},

	getAll () {
		return this._issues;
	},

	poll () {
		this.pollId = window.setInterval(bind(this.fetch, this), 1000 * 60 * 3);
	},

	stopPolling () {
		if (this.pollId)
			window.clearInterval(this.pollId);
	}
});

IssuesStore.dispatcherId = dispatcher.register((event) => {
	switch (event.type) {
		case actions.USER_INFORMATION_UPDATED:
			dispatcher.waitFor([UserStore.dispatcherId]);

			if (UserStore.getToken()) {
				authHeader = {'Authorization': `token ${UserStore.getToken()}`};
				IssuesStore.fetch();
				IssuesStore.poll();
			}
			break;
	}
});

export default IssuesStore;

