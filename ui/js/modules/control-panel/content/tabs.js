'use strict';

import React from 'react';
import map from 'lodash.map';
import bind from 'lodash.bind';
import each from 'lodash.foreach';
import filter from 'lodash.filter';

export default React.createClass({
	getInitialState () {
		return {
			tabs: [
				{ value: 'issues', label: 'Issues', active: true },
				{ value: 'milestones', label: 'Milestones', active: false },
				{ value: 'repos', label: 'Repos', active: false }
			]
		};
	},

	toggleActive (index, e) {
		let {tabs} = this.state;

		if (tabs[index].active) return;

		tabs = each(tabs, (t) => { t.active = false; });
		tabs[index].active = true;
		this.setState({tabs});
	},

	render () {
		const {tabs} = this.state;

		return (
			<ul className="oncourse-extension-control-panel-content-tabs">
				{map(tabs, (t, i) => {
					return (
						<li
							key={i}
							className={t.active ? 'active' : ''}
							onClick={bind(this.toggleActive, this, i)}>

							{t.label}
						</li>
					);
				})}
			</ul>
		);
	}
});
