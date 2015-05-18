'use strict';

import React from 'react';
import Account from './account';
import Search from './search';
import dispatcher from 'lib/dispatcher';
import actions from 'lib/actions';

export default React.createClass({
	createNewIssueInOncourse () {
		dispatcher.dispatch({
			type: actions.SHOW_ONCOURSE_COMPONENT,
			component: 'issueDetail',
			issueId: 0
		});
	},

	render () {
		return (
			<section className="oncourse-extension-control-panel-header">
				<div className="oncourse-extension-control-panel-header-inner">
					<Account />
					<Search />
					<div
						className="oncourse-btn add-task-btn"
						onClick={this.createNewIssueInOncourse}>

						<span><i className="oc-icon-add"></i></span>
					</div>
				</div>
			</section>
		);
	}
});
