'use strict';

import React from 'react';
import dispatcher from 'lib/dispatcher';
import actions from 'lib/actions';
import bind from 'lodash.bind';
import map from 'lodash.map';

export default React.createClass({
	getDefaultProps () {
		return {
			expanded: false,
			issue: {}
		};
	},

	componentWillReceiveProps (newProps) {
		this.setState({ issue: newProps.issue });
	},

	updateFilter(label) {
		dispatcher.dispatch({
			type: actions.UPDATE_FILTER,
			data: 'label:' + label.name
		});
	},

	render () {
		const {expanded, issue} = this.props;
		const classes = 'oncourse-extension-issue-info-sections' +
			((expanded) ? ' expanded' : '');

		return (
			<div className={classes}>
				<div className="oncourse-extension-issue-info-section">
					<div className="oncourse-extension-issue-info-action">
						<span><i className="oc-icon-insert-drive-file"></i></span>
					</div>
					<div className="oncourse-extension-issue-info-content">
						<div>
							<h4>Description</h4>
							<span>
								{issue.body}
							</span>
						</div>
					</div>
				</div>
				<div className="oncourse-extension-issue-info-section">
					<div className="oncourse-extension-issue-info-action">
						<span><i className="oc-icon-person"></i></span>
					</div>
					<div className="oncourse-extension-issue-info-content">
						<div>
							<h4>Owner</h4>
							<span>{(issue.assignee) ? issue.assignee.login : ''}</span>
						</div>
					</div>
				</div>
				<div className="oncourse-extension-issue-info-section">
					<div className="oncourse-extension-issue-info-action">
						<span><i className="oc-icon-assignment-turned-in"></i></span>
					</div>
					<div className="oncourse-extension-issue-info-content">
						<div>
							<h4>Status</h4>
							<span>{issue.state}</span>
						</div>
					</div>
				</div>
				<div className="oncourse-extension-issue-info-section">
					<div className="oncourse-extension-issue-info-action">
						<span><i className="oc-icon-local-offer"></i></span>
					</div>
					<div className="oncourse-extension-issue-info-content labels">
						<div>
							<h4>Labels</h4>
							{map(issue.labels, (l) => {
								return <span
									key={l.name}
									onClick={bind(this.updateFilter, this, l)}>
									{l.name}
								</span>;
							})}
						</div>
					</div>
				</div>
				<div className="oncourse-extension-issue-info-section">
					<div className="oncourse-extension-issue-info-action">
						<span><i className="oc-icon-comment"></i></span>
					</div>
					<div className="oncourse-extension-issue-info-content">
						<div>
							<h4>Comments</h4>
							<span>{issue.comments}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
