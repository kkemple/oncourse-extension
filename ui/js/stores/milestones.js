'use strict';

import UserStore from './user';
import ReposStore from './repos';
import IssuesStore from './issues';
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
import each from 'lodash.foreach';
import flatten from 'lodash.flatten';

const MilestonesStore = assign({}, storeMixin, {
	_changeEvent: actions.MILESTONES_STORE_UPDATED,

	_milestones: [],

	update () {
		const repos = ReposStore.getAll();
		const issues = IssuesStore.getAll();

		if (!repos.length) return;

		this._milestones = flatten(pluck(repos, 'milestones'));

		each(this._milestones, (m, index) => {
			this._milestones[index].issues = filter(issues, (i) => {
				return i.milestone &&
					i.milestone.id === this._milestones[index].id;
			});
		});

		this.emitChange();
	},

	getById (id) {
		return find(this._milestones, (i) => i.id === id);
	},

	getAll () {
		return this._milestones;
	}
});

MilestonesStore.dispatcherId = dispatcher.register((event) => {
	switch (event.type) {
		case actions.REPOS_STORE_UPDATED:
			if (UserStore.getToken()) MilestonesStore.update();
			break;
	}
});

export default MilestonesStore;

