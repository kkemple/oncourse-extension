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
					<a href={issue.milestone.html_url} target="_blank">
						{issue.milestone.title}
					</a>
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
							<a href={issue.repository.html_url} target="_blank">
								{issue.repository.full_name}
							</a>
						</span>
					</span>
					{milestone}
				</div>
			</div>
		);
	}
});
