'use strict';

import React from 'react';

export default React.createClass({
	render () {
		return (
			<div className="oncourse-extension-control-panel-search">
				<button
					data-action="search-app"
					className="oncourse-btn oncourse-control-panel-search-btn">

					<i className="oc-icon-search"></i>
				</button>

				<input
					type="text"
					placeholder="Search Issues..."
					data-role="search-criteria" />
			</div>
		);
	}
});
