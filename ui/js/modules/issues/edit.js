'use strict';

import React from 'react';
import dispatcher from 'lib/dispatcher';
import actions from 'lib/actions';
import apiClient from 'lib/api-client';
import AppStore from 'stores/app';
import UserStore from 'stores/user';
import IssuesStore from 'stores/issues';
import ReposStore from 'stores/repos';
import MilestonesStore from 'stores/milestones';
import bind from 'lodash.bind';
import map from 'lodash.map';
import each from 'lodash.foreach';
import pluck from 'lodash.pluck';
import remove from 'lodash.remove';
import assign from 'lodash.assign';
import find from 'lodash.find';
import indexOf from 'lodash.indexof';

let cache = {};

export default React.createClass({
	getInitialState () {
		const {issueDetail} = AppStore.getComponentState();

		return {
			tabs: [
				{active: true, icon: 'oc-icon-description'},
				{active: false, icon: 'oc-icon-local-offer'},
				{active: false, icon: 'oc-icon-timer-auto'}
			],
			active: issueDetail.active,
			issue: { body: '', title: '' },
			repoLabels: [],
			currentLabels: [],
			assignees: [],
			assignee: UserStore.getProfile(),
			repo: '',
			milestone: 'None'
		};
	},

	componentWillMount () {
		this.boundUpdate = bind(this.update, this);
	},

	componentDidMount () {
		AppStore.addChangeListener(this.boundUpdate);
	},

	componentWillUnmount () {
		AppStore.removeChangeListener(this.boundUpdate);
	},

	update () {
		const {issueDetail} = AppStore.getComponentState();
		this.setState(this.getInitialState());
		let issue = {};

		if (!issueDetail.active) {
			this.setState({active: issueDetail.active});
			return;
		}

		if (issueDetail.issueId > 0) issue = IssuesStore.getById(issueDetail.issueId);

		if (issue.repository)
			this.setLabelsAndAssignees(issue.repository.url);
		else this.setLabelsAndAssignees(ReposStore.getAll()[0].url);

		this.setState({
			active: issueDetail.active,
			issue: issue,
			milestone: (issue.milestone) ? issue.milestone.title : 'None',
			currentLabels: (issue.labels) ? pluck(issue.labels, 'name') : []
		});

		this.toggleTab(0);
	},

	setLabelsAndAssignees (url) {
		let {repoLabels, assignees} = this.state;
		const headers = {'Authorization': `token ${UserStore.getToken()}`};

		apiClient
			.get(url + '/labels', {}, headers)
			.then((response) => {
				if (response.error) console.warn(response.error);
				repoLabels = response.body;

				return apiClient
					.get(url + '/assignees', {}, headers);
			})
			.then((response) => {
				if (response.error) console.warn(response.error);
				assignees = response.body;

				this.setState({
					repoLabels: repoLabels,
					assignees: assignees,
					assignee: UserStore.getProfile()
				});
			});
	},

	close (e) {
		if (e) e.preventDefault();

		dispatcher.dispatch({
			type: actions.HIDE_ONCOURSE_COMPONENT,
			component: 'issueDetail'
		});

		this.setState(this.getInitialState());
	},

	toggleTab (index) {
		let {tabs} = this.state;

		if (tabs[index].active) return;

		each(tabs, (t) => { t.active = false; });
		tabs[index].active = true;

		this.setState({tabs});
	},

	updateIssueTitle (e) {
		e.preventDefault();
		let {issue} = this.state;

		issue.title = e.target.value;

		this.setState({issue});
	},

	updateIssueBody (e) {
		e.preventDefault();
		let {issue} = this.state;

		issue.body = e.target.value;

		this.setState({issue});
	},

	updateIssueRepo (e) {
		const repos = ReposStore.getAll();
		const repo = find(repos, {full_name: e.target.value});
		this.setLabelsAndAssignees(repo.url);
		this.setState({repo: e.target.value});
	},

	updateIssueMilestone (e) {
		this.setState({milestone: e.target.value});
	},

	toggleLabelSelection (rl, e) {
		let {currentLabels} = this.state;

		if (!e.target.checked)
			remove(currentLabels, (name) => name === rl.name);
		else currentLabels.push(rl.name);

		this.setState({currentLabels});
	},

	setAssigneeSelection (a, e) {
		let assignee = a;
		this.setState({assignee});
	},

	updateIssue (e) {
		const headers = {'Authorization': `token ${UserStore.getToken()}`};
		let {currentLabels, issue, assignee, repo, milestone} = this.state;

		let method, url;

		if (issue.id) {
			method = 'patch';
			url = issue.url;

			if (milestone === 'None') milestone = null;
			else {
				let milestones = ReposStore.getById(issue.repository.id).milestones;
				milestone = find(milestones, (m) => m.title === milestone).number;
			}
		} else {
			method = 'post';
			url = 'https://api.github.com/repos/' + repo + '/issues';
		}

		const data = {
			title: issue.title,
			body: issue.body,
			state: issue.state,
			labels: currentLabels,
			assignee: assignee.login,
			milestone: milestone
		};

		apiClient[method](url, data, {}, headers)
			.then((response) => {
				if (response.error) console.warn(response.error);

				this.setState(this.getInitialState());
				this.close();
				window.setTimeout(() => { ReposStore.fetch(); }, 500);
			});
	},

	render () {
		const repos = ReposStore.getAll();
		const {
			active,
			issue,
			tabs,
			repoLabels,
			currentLabels,
			assignees,
			assignee,
			repo,
			milestone
		} = this.state;

		let id;

		if (issue.id)
			id = issue.repository.id;
		else if (repos.length)
			id = (repo !== '') ?
				find(repos, (r) => r.full_name === repo).id :
				repos[0].id;

		let milestones = (id) ? ReposStore.getById(id).milestones : [];

		return (active) ? (
			<div className="oncourse-extension-issues-edit-view">
				<ul className="oncourse-extension-issues-edit-tab-nav">
					{map(tabs, (t, i) => {
						return (
							<li
								key={i}
								className={t.active ? 'active' : ''}
								onClick={bind(this.toggleTab, this, i)}>

								<span>
									<i className={t.icon}></i>
								</span>
							</li>
						);
					})}
				</ul>
				<div className="oncourse-extension-issues-edit-content-wrapper">
					<div className="oncourse-extension-issues-edit-tab-content">
						<div style={(tabs[0].active) ? {} : {display: 'none'}}>
							{(!issue.id) ? (
								<div>
									<label>Repo</label>
									<select
										value={repo}
										onChange={this.updateIssueRepo}>

										{map(repos, (r) => {
											return <option key={r.id} value={r.full_name}>{r.full_name}</option>;
										})}
									</select>
								</div>
							) : null}
							<div>
								<label>Milestone</label>
								<select
									value={milestone}
									onChange={this.updateIssueMilestone}>

									<option value="None">None</option>
									{map(milestones, (m) => {
										return <option key={m.id} value={m.title}>{m.title}</option>;
									})}
								</select>
							</div>
							<div>
								<label>Title</label>
								<input
									type="text"
									value={issue.title}
									onChange={this.updateIssueTitle} />
							</div>
							<div>
								<label>Description</label>
								<textarea
									type="text"
									placeholder="What's the issue..."
									value={(issue.body) ? issue.body : ''}
									onChange={this.updateIssueBody}>
								</textarea>
							</div>
						</div>

						<div style={(tabs[1].active) ? {} : {display: 'none'}}>
							<div>
								<label>Labels</label>
								<ul>
									{map(repoLabels, (rl) => {
										return (
											<li key={rl.name}>
												<input
													type="checkbox"
													checked={(indexOf(currentLabels, rl.name) > -1) ? true : false}
													onChange={bind(this.toggleLabelSelection, this, rl)} />

												<span
													className="oncourse-extension-edit-issue-label-color"
													style={{'backgroundColor': '#' + rl.color}}>
												</span>
												{rl.name}
											</li>
										);
									})}
								</ul>
							</div>
						</div>

						<div style={(tabs[2].active) ? {} : {display: 'none'}}>
							<div>
								<label>Assign</label>
								<ul>
									{map(assignees, (a) => {
										return (
											<li key={a.login}>
												<input
													type="radio"
													name="assignee"
													checked={(a.login === assignee.login) ? true : false}
													onChange={bind(this.setAssigneeSelection, this, a)} />

												<img
													src={a.avatar_url}
													className="oncourse-extension-edit-issue-assignee-avatar"/>
												{a.login}
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
					<div className="oncourse-extension-issues-edit-actions">
						<button onClick={this.close}>Cancel</button>
						<button onClick={this.updateIssue}>Save</button>
					</div>
				</div>
			</div>
		) : null;
	}
});
