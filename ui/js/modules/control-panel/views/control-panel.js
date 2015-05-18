'use strict';

import Header from '../views/header';
import ContentTabs from '../views/content-tabs';
import View from 'common/view';
import template from '../templates/control-panel';
import constants from 'config/constants/chrome-messages';

const animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

const ControlPanel = View.extend({
	_active: false,
	template: template,
	id: 'oncourse-control-panel',
	regions: {
		header: '[data-region="header"]',
		content: '[data-region="content"]'
	},
	initialize: function() {
		chrome.runtime.onMessage.addListener((message) => {
			if (message.type === constants.BROWSER_ACTION)
				if (!this._active) {
					this.$el
						.addClass('flipInY animated')
						.one(animationEndEvents, () => {
							this.$el
								.removeClass('flipInY animated')
								.addClass('active');
						});
					this._active = true;
				} else {
					this.$el.removeClass('active');
					this._active = false;
				}
		});
	},
	onAttach: function() {
		this.header.show(new Header());
		this.content.show(new ContentTabs());
	}
});

export default ControlPanel;
