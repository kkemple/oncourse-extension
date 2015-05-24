'use strict';

import React from 'react';
import bind from 'lodash.bind';

export default React.createClass({
	getDefaultProps () {
		return {
			tabs: {},
			changeMethod: () => {}
		};
	},

	getInitialState () {
		return {
			tabs: this.props.tabs
		};
	},

	toggleActive (tab, e) {
		if (e) e.preventDefault();

		const {changeMethod} = this.props;
		changeMethod(tab);
	},

	render () {
		const {issues, milestones, repos} = this.state.tabs;

		return (
			<ul className="oncourse-extension-control-panel-content-tabs">
				{(issues) ? (
					<li
						className={issues.active ? 'active' : ''}
						onClick={bind(this.toggleActive, this, 'issues')}>

						{issues.label}
					</li>
				) : null}

				{(milestones) ? (
					<li
						className={milestones.active ? 'active' : ''}
						onClick={bind(this.toggleActive, this, 'milestones')}>

						{milestones.label}
					</li>
				) : null}

				{(repos) ? (
					<li
						className={repos.active ? 'active' : ''}
						onClick={bind(this.toggleActive, this, 'repos')}>

						{repos.label}
					</li>
				) : null}
			</ul>
		);
	}
});
