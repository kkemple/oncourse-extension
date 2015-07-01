'use strict';

import React from 'react';
import QuickView from './quick-view';
import InfoList from './info-list';
import Actions from './actions';
import QuickLabels from './quick-labels';

export default React.createClass({
	getInitialState () {
		return {
			expanded: !!this.props.expanded,
			issue: this.props.issue
		};
	},

	getDefaultProps () {
		return {
			issue: {},
			expanded: false
		};
	},

	componentWillReceiveProps (newProps) {
		const {issue} = newProps;
		this.setState({issue});
	},

	toggleExpanded (e) {
		e.preventDefault();

		const {expanded} = this.state;
		this.setState({ expanded: !expanded });
	},

	issueUpdated (issue) {
		this.setState({ issue: issue });
	},

	render () {
		const {expanded, issue} = this.state;
		const arrowDirection = (expanded) ? 'up' : 'down';

		return (issue.state === 'open') ? (
			<div className="oncourse-card oncourse-extension-control-panel-issue-card">
				<div className="oncourse-extension-control-panel-issue-info">
					<h3>{issue.title}</h3>
					<div className="oncourse-extension-expand-issue-card">
						<button className="oncourse-btn" onClick={this.toggleExpanded}>
							<span>
								<i className={'oc-icon-keyboard-arrow-' + arrowDirection}></i>
							</span>
						</button>
					</div>
					<QuickView issue={issue} />
					<InfoList expanded={expanded} issue={issue} />
				</div>
				<QuickLabels issue={issue} />
				<Actions issue={issue} changeMethod={this.issueUpdated} />
			</div>
		) : null;
	}
});
