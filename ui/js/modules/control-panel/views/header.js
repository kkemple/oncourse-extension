'use strict';

import View from 'common/view';
import Radio from 'shims/radio';
import Account from '../views/account';
import Search from '../views/search';
import template from '../templates/header';

const Header = View.extend({
	template: template,
	className: 'oncourse-control-panel-header-inner',
	tagName: 'header',
	regions: {
		'account': '[data-region="account"]',
		'search': '[data-region="search"]',
		'contentTabs': '[data-region="content-tabs"]'
	},
	ui: {
		'$addTask': '[data-action="add-task"]'
	},
	events: {
		'click @ui.$addTask': 'fireAddTaskCommand'
	},
	fireAddTaskCommand: function() {},
	onAttach: function() {
		this.account.show(new Account());
		this.search.show(new Search());
	}
});

export default Header;
