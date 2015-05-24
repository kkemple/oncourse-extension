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
import map from 'lodash.map';
import each from 'lodash.foreach';

const reposUrl = 'https://api.github.com/user/repos';
let authHeader = { 'Authorization': `token ${UserStore.getToken()}` };

const throttledGet = throttle(apiClient.get, 300);

let search;

const ReposStore = assign({}, storeMixin, {
	_changeEvent: actions.REPOS_STORE_UPDATED,

	_repos: [],

	fetch () {
		if (!UserStore.getToken()) return;

		const profile = UserStore.getProfile();

		if (!profile) {
			window.setTimeout(() => { this.fetch(); }, 300);
			return;
		}

		throttledGet(reposUrl, {'per_page': 100}, authHeader)
			.then((response) => {
				if (response.error) {
					console.warn(response.error);
					return;
				}

				this._repos = response.body;

				const milestonesPromises = map(this._repos, (r) => {
					return apiClient
						.get(r.url + '/milestones', {}, authHeader);
				});

				const issuesPromises = map(this._repos, (r) => {
					return apiClient
						.get(r.url + '/issues', {assignee: profile.login}, authHeader);
				});

				Promise.all(issuesPromises)
					.then((results) => {
						each(results, (result, i) => {
							if (result.error) {
								console.warn(result.error);
								this._repos[i].issues = [];
								return;
							}

							this._repos[i].issues = map(result.body, (r) => {
								r.repository = {
									'id': this._repos[i].id,
									'url': this._repos[i].url,
									'html_url': this._repos[i].html_url,
									'full_name': this._repos[i].full_name
								};

								return r;
							});
						});

						Promise.all(milestonesPromises)
							.then((results) => {
								each(results, (result, i) => {
									if (result.error) {
										console.warn(result.error);
										this._repos[i].milestones = [];
										return;
									}

									this._repos[i].milestones = map(result.body, (m) => {
										m.repository = this._repos[i];
										return m;
									});
								});

								dispatcher.dispatch({ type: actions.REPOS_STORE_UPDATED });
								this.emitChange();
							});
					});
			});
	},

	getById (id) {
		return find(this._repos, (i) => i.id === id);
	},

	getAll () {
		return this._repos;
	},

	poll () {
		this.pollId = window.setInterval(bind(this.fetch, this), 1000 * 60 * 3);
	},

	stopPolling () {
		if (this.pollId)
			window.clearInterval(this.pollId);
	}
});

ReposStore.dispatcherId = dispatcher.register((event) => {
	switch (event.type) {
		case actions.USER_INFORMATION_UPDATED:
			dispatcher.waitFor([UserStore.dispatcherId]);

			if (UserStore.getToken()) {
				authHeader = {'Authorization': `token ${UserStore.getToken()}`};
				ReposStore.fetch();
				ReposStore.stopPolling();
				ReposStore.poll();
			}
			break;
	}
});

export default ReposStore;
