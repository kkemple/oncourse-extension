'use strict';

import React from 'react';
import map from 'lodash.map';

export default React.createClass({
	getDefaultProps () {
		return {
			issue: {}
		};
	},

	componentWillReceiveProps (newProps) {
		this.setState({ issue: newProps.issue });
	},

	render () {
		const {issue} = this.props;

		return (
			<ul className="oncourse-extension-quick-view-labels">
				{map(issue.labels, (l) => {
					return (
						<span
							key={l.name}
							style={{backgroundColor: '#' + l.color}}
							title={l.name}>
						</span>
					);
				})}
			</ul>
		);
	}
});
