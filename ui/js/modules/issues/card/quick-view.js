'use strict';

import React from 'react';

export default React.createClass({
	getDefaultProps () {
		return {
			issue: {}
		};
	},

	componentWillReceiveProps (newProps) {
		this.setState({ issue: newProps.issue });
	},

	render () {
		const {issue} = this.props;
		let milestone;

		if (issue.milestone)
			milestone = <span className="oncourse-extension-issue-quick-view-grouping-item">
				Milestone:
				<span>
					{issue.milestone.title}
				</span>
			</span>;
		else
			milestone = null;

		return (
			<div className="oncourse-extension-issue-quick-view">
				<div className="oncourse-extension-issue-quick-view-groupings">
					<span className="oncourse-extension-issue-quick-view-grouping-item">
						Repo:
						<span>
							{issue.repository.full_name}
						</span>
					</span>
					{milestone}
				</div>
			</div>
		);
	}
});
