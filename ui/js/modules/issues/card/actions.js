'use strict';

import React from 'react';
import dispatcher from 'lib/dispatcher';
import actions from 'lib/actions';
import apiClient from 'lib/api-client';
import UserStore from 'stores/user';
import ReposStore from 'stores/repos';
import assign from 'lodash.assign';

export default React.createClass({
	getDefaultProps () {
		return {
			issue: {},
			changeMethod: () => {}
		};
	},

	getInitialState () {
		return {
			issue: this.props.issue
		};
	},

	componentWillReceiveProps (newProps) {
		this.setState({ issue: newProps.issue });
	},

	openIssueInGithub (e) {
		const {issue} = this.state;

		chrome.runtime.sendMessage({
			type: actions.OPEN_NEW_TAB,
			url: issue.html_url
		});
	},

	openIssueInOncourse () {
		const {issue} = this.state;

		dispatcher.dispatch({
			type: actions.SHOW_ONCOURSE_COMPONENT,
			component: 'issueDetail',
			issueId: issue.id
		});
	},

	openCommentsInOncourse () {
		const {issue} = this.state;

		dispatcher.dispatch({
			type: actions.SHOW_ONCOURSE_COMPONENT,
			component: 'commentsList',
			issueId: issue.id
		});
	},

	closeIssue () {
		const {issue} = this.state;
		const {changeMethod} = this.props;
		const data = {state: 'closed'};
		const headers = {'Authorization': `token ${UserStore.getToken()}`};

		apiClient
			.patch(issue.url, data, {}, headers)
			.then((response) => {
				changeMethod(assign({}, issue, response.body));
				ReposStore.fetch();
			});
	},

	render () {
		const {issue} = this.state;

		return (
			<div className="oncourse-extension-control-panel-issue-actions">
				<button
					onClick={this.openIssueInGithub}
					title="Open In Github">
					<span>
						<i className="oc-icon-octoface"></i>
					</span>
				</button>
				<button
					onClick={this.openCommentsInOncourse}
					title="Comment">
					<span>
						<i className="oc-icon-comment"></i>
					</span>
				</button>
				<button
					onClick={this.openIssueInOncourse}
					title="Edit">
					<span>
						<i className="oc-icon-edit"></i>
					</span>
				</button>
				<button
					title="Close"
					onClick={this.closeIssue}>

					<span><i className="oc-icon-close"></i></span>
				</button>
			</div>
		);
	}
});
