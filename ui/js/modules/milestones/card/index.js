'use strict';

import React from 'react';
import moment from 'moment';
import map from 'lodash.map';
import actions from 'lib/actions';
import Card from 'modules/issues/inline-card';


export default React.createClass({
	getDefaultProps () {
		return { milestone: {} };
	},

	componentWillReceiveProps (newProps) {
		const {milestone} = newProps;
		this.setState({milestone});
	},

	openMilestoneInGithub (e) {
		e.preventDefault();
		const {milestone} = this.props;

		chrome.runtime.sendMessage({
			type: actions.OPEN_NEW_TAB,
			url: milestone.html_url
		});
	},

	render () {
		const {milestone} = this.props;

		return (milestone.state === "open") ? (
			<div className="oncourse-card oncourse-extension-control-panel-milestone-card">
				<h3
					className="oncourse-extension-control-panel-milestone-card-title"
					onClick={this.openMilestoneInGithub}>

					{milestone.title}
				</h3>

				<div className="oncourse-extension-milestone-quick-view-groupings">
					<span className="oncourse-extension-control-panel-milestone-card-desc">
						{milestone.description}
					</span>

					<span className="oncourse-extension-milestone-quick-view-grouping-item">
						Repo:
						<span>
							<a href={milestone.repository.html_url} target="_blank">
								{milestone.repository.full_name}
							</a>
						</span>
					</span>

					<span className="oncourse-extension-milestone-quick-view-grouping-item">
						Issues:
						<span>
							{milestone.open_issues}
						</span>
					</span>

					{(milestone.due_on) ? (
					<span className="oncourse-extension-milestone-quick-view-grouping-item">
						Due On:
						<span>
							{moment(milestone.due_on).format('MMMM Do YYYY')}
						</span>
					</span>
					) : null}
				</div>

				<div className="oncourse-extension-milestone-issues-list">
						{map(milestone.issues, (issue, i) => <Card key={i} issue={issue} />)}
					</div>
			</div>
		) : null;
	}
});
