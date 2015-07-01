'use strict';

import React from 'react';
import Card from './card';
import Loader from 'components/loader';
import map from 'lodash.map';

export default React.createClass({
	propTypes: {
		milestones: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getDefaultProps () {
		return { milestones: [] };
	},

	getInitialState () {
		return { milestones: [] };
	},

	componentWillReceiveProps (newProps) {
		const {milestones} = newProps;
		this.setState({milestones});
	},

	render () {
		const {milestones} = this.props;

		return (
			<div className="oncourse-extension-control-panel-milestones">
				{(milestones.length) ? (
					map(milestones, (milestone, i) => {
						return (milestone.issues.length) ?
							<Card key={i} milestone={milestone} /> : null;
					})
				) : (
					<Loader />
				)}
			</div>
		);
	}
});
