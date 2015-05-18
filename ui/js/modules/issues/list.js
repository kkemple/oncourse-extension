'use strict';

import React from 'react';
import Card from './card';
import map from 'lodash.map';

export default React.createClass({
	propTypes: {
		issues: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getDefaultProps () {
		return {
			issues: []
		};
	},

	componentWillReceiveProps (newProps) {
		this.setState({ issues: newProps.issues });
	},

	render () {
		return (
			<div className="oncourse-extension-control-panel-issues">
				{map(this.props.issues, (issue, i) => <Card key={i} issue={issue} />)}
			</div>
		);
	}
});
