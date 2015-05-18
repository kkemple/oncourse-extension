'use strict';

import React from 'react';
import ControlPanel from 'modules/control-panel';
import Comments from 'modules/comments';
import IssueEdit from 'modules/issues/edit';
import AppStore from 'stores/app';
import UserStore from 'stores/user';
import bind from 'lodash.bind';

export default React.createClass({
	getInitialState () {
		return {
			active: false,
			loggedIn: UserStore.isLoggedIn()
		};
	},

	componentWillMount () {
		this.boundUpdateState = bind(this.updateState, this);
	},

	componentDidMount () {
		AppStore.addChangeListener(this.boundUpdateState);
		UserStore.addChangeListener(this.boundUpdateState);
	},

	componentWillUnmount () {
		AppStore.removeChangeListener(this.boundUpdateState);
		UserStore.removeChangeListener(this.boundUpdateState);
	},

	updateState () {
		this.setState({
			active: AppStore.hasActiveComponent(),
			loggedIn: UserStore.isLoggedIn()
		});
	},

	render () {
		const {active, loggedIn} = this.state;

		return (
			<div className={'oncourse-extension-wrapper ' + (active ? 'active' : '')}>
				<ControlPanel isLoggedIn={loggedIn} />
				<IssueEdit />
				<Comments />
			</div>
		);
	}
});
