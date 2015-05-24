'use strict';

import React from 'react';
import Card from './card';
import Loader from 'components/loader';
import map from 'lodash.map';

export default React.createClass({
	propTypes: {
		issues: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getDefaultProps () {
		return { issues: [] };
	},

	componentWillReceiveProps (newProps) {
		const {issues} = newProps;
		this.setState({issues});
	},

	render () {
		const {issues} = this.props;

		return (
			<div className="oncourse-extension-control-panel-issues">
				{(issues.length) ? (
					map(issues, (issue, i) => <Card key={i} issue={issue} />)
				) : (
					<Loader />
				)}
			</div>
		);
	}
});
