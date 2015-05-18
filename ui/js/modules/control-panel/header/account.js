'use strict';

import React from 'react';

export default React.createClass({
	render () {
		return (
			<div className="oncourse-extension-control-panel-account">
				<div className="oncourse-extension-control-panel-branding">
					<h1>on course</h1>
				</div>
				<div className="oncourse-extension-control-panel-actions">
					<span className="oncourse-extension-control-panel-action">
						<i className="oc-icon-info-outline"></i>
					</span>
					<span className="oncourse-extension-control-panel-action">
						<i className="oc-icon-settings"></i>
					</span>
					<span className="oncourse-extension-control-panel-action">
						<i className="oc-icon-account-circle"></i>
					</span>
				</div>
			</div>
		);
	}
});
