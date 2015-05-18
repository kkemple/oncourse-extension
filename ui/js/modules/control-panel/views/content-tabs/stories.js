'use strict';

import $ from 'shims/$';
import View from 'common/view';
import template from '../../templates/content-tabs/stories';

var storyData = [
	{
		id: 1,
		title: 'Test Story 1',
		status: 'Open',
		priority: 'critical',
		color: '',
		points: 2,
		watchers: [],
		sprint: {
			id: 1,
			title: 'Alfar',
			startDate: window.Date.now(),
			endDate: window.Date.now()
		},
		attributes: {
			product: 'Test Product',
			service: 'Some Service',
			team: 'Blue Team',
			type: 'Bug'
		}
	}
];

const Stories = View.extend({
	template: template,
	tagName: 'section',
	className: 'oncourse-control-panel-stories',
	events: {
		'click .expand-story-card-meta button': 'toggleStoryMeta'
	},
	toggleStoryMeta: function(e) {
		e.preventDefault();

		var $target = $(e.target);

		$target
			.toggleClass('oc-icon-keyboard-arrow-up oc-icon-keyboard-arrow-down')
			.parents('.expand-story-card-meta')
				.first()
				.siblings('.card-meta-sections')
					.first()
					.toggleClass('expanded')
					.end();
	}
});

export default Stories;
