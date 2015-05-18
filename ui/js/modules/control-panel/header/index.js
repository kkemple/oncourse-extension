'use strict';

import React from 'react';
import Account from './account';
import Search from './search';

export default React.createClass({
	addTask (e) {

	},

	render () {
		return (
			<section className="oncourse-extension-control-panel-header">
				<div className="oncourse-extension-control-panel-header-inner">
					<Account />
					<Search />
					<div className="oncourse-btn add-task-btn" onClick={this.addTask}>
						<span><i className="oc-icon-add"></i></span>
					</div>
				</div>
			</section>
		);
	}
});
