'use strict';

import storeMixin from 'lib/store-mixin';
import actions from 'lib/actions';
import dispatcher from 'lib/dispatcher';
import apiClient from 'lib/api-client';
import assign from 'lodash.assign';

const url = 'https://api.github.com/user';

const UserStore = assign({}, storeMixin, {
	_changeEvent: actions.USER_STORE_UPDATED,

	refresh (data) {
		this.apiToken = data.token;
		this.fetch();
	},

	fetch () {
		if (!this.apiToken) return;

		apiClient
			.get(url, {}, {'Authorization': `token ${this.apiToken}`})
			.then((response) => {
				if (response.error) {
					console.warn(response.error);
					if (response.status === 401) this.apiToken = undefined;
					this.emitChange();
					return;
				}

				this.profile = response.body;
				this.emitChange();
			});
	},

	isLoggedIn () {
		return !!this.apiToken;
	},

	getToken () {
		return this.apiToken;
	},

	getProfile () {
		return this.profile;
	}
});

UserStore.dispatcherId = dispatcher.register((event) => {
	switch (event.type) {
		case actions.USER_INFORMATION_UPDATED:
			UserStore.refresh(event.data);
			break;
	}
});

export default UserStore;
