'use strict';

import React from 'react';
import actions from 'lib/actions';

export default React.createClass({
	attemptAuth () {
		chrome.runtime.sendMessage({ type: actions.START_AUTH_FLOW });
	},

	render () {
		return (
			<div className="oncourse-extension-login">
				<h1>Let's get you back on course!</h1>
				<button className="" onClick={this.attemptAuth}>
					<span><i className="oc-icon-octoface"></i></span> Log In
				</button>
			</div>
		);
	}
});
