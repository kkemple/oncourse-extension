'use strict';

import React from 'react';
import Card from './card';
import Loader from 'components/loader';
import map from 'lodash.map';

export default React.createClass({
	propTypes: {
		repos: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getDefaultProps () {
		return { repos: [] };
	},

	getInitialState () {
		return { repos: [] };
	},

	render () {
		const {repos} = this.props;

		return (
			<div className="oncourse-extension-control-panel-repos">
				{(repos.length) ? (
					map(repos, (repo, i) => {
						return (repo.issues.length) ?
							<Card key={i} repo={repo} /> : null;
					})
				) : (
					<Loader />
				)}
			</div>
		);
	}
});
