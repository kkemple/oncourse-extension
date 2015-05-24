'use strict';

import React from 'react';
import Tabs from './tabs';
import IssuesList from 'modules/issues/list';
import ReposList from 'modules/repos/list';
import MilestonesList from 'modules/milestones/list';
import IssuesStore from 'stores/issues';
import ReposStore from 'stores/repos';
import MilestonesStore from 'stores/milestones';
import bind from 'lodash.bind';
import each from 'lodash.foreach';

export default React.createClass({
	getInitialState () {
		return {
			tabs: {
				issues: { value: 'issues', label: 'Issues', active: true },
				milestones: { value: 'milestones', label: 'Milestones', active: false },
				repos: { value: 'repos', label: 'Repos', active: false }
			},
			milestones: MilestonesStore.getAll(),
			issues: IssuesStore.getAll(),
			repos: ReposStore.getAll()
		};
	},

	componentWillMount () {
		this.boundUpdate = bind(this.update, this);
	},

	componentDidMount () {
		IssuesStore.addChangeListener(this.boundUpdate);
		MilestonesStore.addChangeListener(this.boundUpdate);
		ReposStore.addChangeListener(this.boundUpdate);
	},

	componentWillUnmount () {
		IssuesStore.removeChangeListener(this.boundUpdate);
		MilestonesStore.removeChangeListener(this.boundUpdate);
		ReposStore.removeChangeListener(this.boundUpdate);
	},

	update () {
		this.setState({
			milestones: MilestonesStore.getAll(),
			issues: IssuesStore.getAll(),
			repos: ReposStore.getAll()
		});
	},

	onTabChange (tab) {
		let {tabs} = this.state;

		if (tabs[tab].active) return;

		tabs = each(tabs, (t) => { t.active = false; });
		tabs[tab].active = true;
		this.setState({tabs});
	},

	render () {
		const {issues, milestones, repos, tabs} = this.state;

		return (
			<section className="oncourse-extension-control-panel-content">
				<Tabs tabs={tabs} changeMethod={bind(this.onTabChange, this)} />

				{(tabs.issues.active) ? (
					<IssuesList issues={issues}/>
				) : null}

				{(tabs.milestones.active) ? (
					<MilestonesList milestones={milestones}/>
				) : null}

				{(tabs.repos.active) ? (
					<ReposList repos={repos}/>
				) : null}
			</section>
		);
	}
});
