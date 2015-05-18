'use strict';

import React from 'react';
import Header from './header';
import Content from './content';
import LogIn from 'modules/auth/login'
import AppStore from 'stores/app';
import bind from 'lodash.bind';

export default React.createClass({
	getInitialState () {
		return {
			active: false
		};
	},

	getDefaultProps () {
		return {
			isLoggedIn: false
		};
	},

	componentWillMount () {
		this.boundUpdateState = bind(this.updateState, this);
	},

	componentDidMount () {
		AppStore.addChangeListener(this.boundUpdateState);
	},

	componentWillUnmount () {
		AppStore.removeChangeListener(this.boundUpdateState);
	},

	updateState () {
		const {controlPanel} = AppStore.getComponentState();
		this.setState({ active: controlPanel.active });
	},

	render () {
		const {active} = this.state;
		const {isLoggedIn} = this.props;

		return (isLoggedIn) ? (
			<div className={'oncourse-extension-control-panel ' + (active ? 'active' : '')}>
				<Header />
				<Content />
			</div>
		) : (
			<div className={'oncourse-extension-control-panel ' + (active ? 'active' : '')}>
				<LogIn />
			</div>
		);
	}
});
