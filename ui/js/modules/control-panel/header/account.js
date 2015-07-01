'use strict';

import React from 'react';
import dispatcher from 'lib/dispatcher';
import actions from 'lib/actions';

export default React.createClass({
	logout () {
		dispatcher.dispatch({
			type: actions.USER_LOGGED_OUT
		});
	},

	render () {
		return (
			<div className="oncourse-extension-control-panel-account">
				<div className="oncourse-extension-control-panel-branding">
					<h1>On Course</h1>
				</div>
				<div className="oncourse-extension-control-panel-actions">
					<span
						className="oncourse-extension-control-panel-action"
						onClick={this.logout}>
						<i className="oc-icon-exit-to-app"></i>
					</span>
				</div>
			</div>
		);
	}
});
