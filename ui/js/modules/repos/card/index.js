'use strict';

import React from 'react';
import moment from 'moment';
import map from 'lodash.map';
import actions from 'lib/actions';
import Card from 'modules/issues/inline-card';


export default React.createClass({
	getDefaultProps () {
		return { repo: {} };
	},

	componentWillReceiveProps (newProps) {
		const {repo} = newProps;
		this.setState({repo});
	},

	openrepoInGithub (e) {
		e.preventDefault();
		const {repo} = this.props;

		chrome.runtime.sendMessage({
			type: actions.OPEN_NEW_TAB,
			url: repo.html_url
		});
	},

	render () {
		const {repo} = this.props;

		return (
			<div className="oncourse-card oncourse-extension-control-panel-repo-card">
				<h3
					className="oncourse-extension-control-panel-repo-card-title"
					onClick={this.openrepoInGithub}>

					{repo.full_name}
				</h3>

				<div className="oncourse-extension-repo-quick-view-groupings">
					<span className="oncourse-extension-repo-quick-view-grouping-item">
						Issues:
						<span>{repo.open_issues}</span>
					</span>

					{(repo.milestones && repo.milestones.length) ? (
						<span className="oncourse-extension-repo-quick-view-grouping-item">
							Milestones:
							<span>{repo.milestones.length}</span>
						</span>
					) : null}

					<span className="oncourse-extension-repo-quick-view-grouping-item">
						Watchers:
						<span>{repo.watchers_count}</span>
					</span>

					<span className="oncourse-extension-repo-quick-view-grouping-item">
						Star Gazers:
						<span>{repo.stargazers_count}</span>
					</span>

					<span className="oncourse-extension-repo-quick-view-grouping-item">
						Forks:
						<span>{repo.forks_count}</span>
					</span>
					{/*
					<span className="oncourse-extension-repo-quick-view-grouping-item">
						SSH:
						<span>{repo.ssh_url}</span>
					</span>
					*/}
				</div>

				<ul className="oncourse-extension-repo-issues-list">
					{map(repo.issues, (issue, i) => <Card key={i} issue={issue} />)}
				</ul>
			</div>
		);
	}
});
