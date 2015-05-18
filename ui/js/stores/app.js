'use strict';

import storeMixin from 'lib/store-mixin';
import dispatcher from 'lib/dispatcher';
import actions from 'lib/actions';
import assign from 'lodash.assign';
import filter from 'lodash.filter';
import each from 'lodash.foreach';

const AppStore = assign({}, storeMixin, {
	_changeEvent: actions.APP_STORE_UPDATED,

	components: {
		controlPanel: {
			active: false
		},
		board: {
			active: false
		},
		issueDetail: {
			active: false,
			issueId: 0
		},
		commentsList: {
			active: false,
			issueId: 0
		}
	},

	updateComponentState (component, active, id) {
		each(this.components, (val, key) => {
			if (key !== 'controlPanel') val.active = false;
		});

		this.components[component].active = active;
		if (id) this.components[component].issueId = id;

		this.emitChange();
	},

	getComponentState () {
		return this.components;
	},

	hasActiveComponent () {
		return (filter(this.components, (c) => c.active).length) ? true : false;
	}
});

AppStore.dispatcherId = dispatcher.register((action) => {
	switch (action.type) {
		case actions.SHOW_ONCOURSE_COMPONENT:
			AppStore.updateComponentState(action.component, true, action.issueId);
			break;
		case actions.HIDE_ONCOURSE_COMPONENT:
			AppStore.updateComponentState(action.component, false);
			break;
	}
});

export default AppStore;
