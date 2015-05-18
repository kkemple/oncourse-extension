'use strict';

import UserStore from './user';
import ReposStore from './repos';
import dispatcher from 'lib/dispatcher';
import actions from 'lib/actions';
import apiClient from 'lib/api-client';
import storeMixin from 'lib/store-mixin';
import assign from 'lodash.assign';
import filter from 'lodash.filter';
import throttle from 'lodash.throttle';
import find from 'lodash.find';
import bind from 'lodash.bind';
import pluck from 'lodash.pluck';
import flatten from 'lodash.flatten';

const issuesUrl = 'https://api.github.com/user/issues';
let authHeader = { 'Authorization': `token ${UserStore.getToken()}` };

const throttledGet = throttle(apiClient.get, 300);

let search;

const IssuesStore = assign({}, storeMixin, {
	_changeEvent: actions.ISSUES_STORE_UPDATED,

	_issues: [],

	update () {
		const repos = ReposStore.getAll();

		if (!repos.length) return;

		this._issues = flatten(pluck(repos, 'issues'));
		this.emitChange();
	},

	getById (id) {
		return find(this._issues, (i) => i.id === id);
	},

	getAll () {
		return this._issues;
	}
});

IssuesStore.dispatcherId = dispatcher.register((event) => {
	switch (event.type) {
		case actions.REPOS_STORE_UPDATED:
			if (UserStore.getToken()) IssuesStore.update();
			break;
	}
});

export default IssuesStore;

