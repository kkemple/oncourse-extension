'use strict';

import React from 'react';
import Actions from './card/actions';
import QuickLabels from './card/quick-labels';

export default React.createClass({
	getDefaultProps () {
		return { issue: {} };
	},

	getInitialState () {
		return { issue: this.props.issue };
	},

	componentWillReceiveProps (newProps) {
		const {issue} = newProps;
		this.setState({issue});
	},

	issueUpdated (issue) {
		this.setState({ issue: issue });
	},

	render () {
		const {issue} = this.state;

		return (issue.state === "open") ? (
			<li className="oncourse-extension-issue-inline-card">
				<div className="oncourse-extension-issue-inline-card-title">
					{issue.title}
				</div>
				<div className="oncourse-extension-issue-inline-card-actions">
					<Actions issue={issue} changeMethod={this.issueUpdated} />
				</div>
				<QuickLabels issue={issue} />
			</li>
		) : null;
	}
});
