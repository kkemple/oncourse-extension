'use strict';

import Stories from './stories';
import $ from 'shims/$';
import Radio from 'shims/radio';
import View from 'common/view';
import template from '../../templates/content-tabs';

const ContentTabs = View.extend({
	template: template,
	className: 'oncourse-control-panel-content-tabs',
	tagName: 'section',
	regions: {
		'links': '@ui.$links',
		'contentArea': '@ui.$contentArea'
	},
	ui: {
		'$links': '[data-role="tab-links"]',
		'$contentArea': '[data-role="content-area"]'
	},
	events: {
		'click @ui.$links li': 'setActiveTab'
	},
	stateEvents: {
		'change:activeTab': 'showActiveTab'
	},
	initialize: function(opts) {
		// this.userPromise = accountChannel.request('data:user');
	},
	onAttach: function() {
		// this.userPromise
		// 	.then(() => {
				this.contentArea.show(new Stories());
			// });
	},
	setActiveTab: function(e) {
		this.ui.$links
			.find('.active')
			.removeClass('active');

		var activeTab = $(e.target)
			.addClass('active')
			.attr('data-tab');

		if (activeTab === 'stories')
			this.contentArea.show(new Stories());
		else
			this.contentArea.empty();
		//this.state.set('activeTab', activeTab);
	},
	showActiveTab: function() {
		this.contentArea.show();
	}
});

export default ContentTabs;
