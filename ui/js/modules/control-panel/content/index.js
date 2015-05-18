'use strict';

import React from 'react';
import Tabs from './tabs';
import IssuesList from 'modules/issues/list';
import IssuesStore from 'stores/issues';
import bind from 'lodash.bind';

export default React.createClass({
	getInitialState () {
		return {
			issues: IssuesStore.getAll()
		};
	},

	componentWillMount () {
		this.boundUpdate = bind(this.update, this);
	},

	componentDidMount () {
		IssuesStore.addChangeListener(this.boundUpdate);
	},

	componentWillUnmount () {
		IssuesStore.removeChangeListener(this.boundUpdate);
	},

	update () {
		this.setState({ issues: IssuesStore.getAll() });
	},

	render () {
		const {issues} = this.state;

		return (
			<section className="oncourse-extension-control-panel-content">
				<Tabs />
				<IssuesList issues={issues}/>
			</section>
		);
	}
});
