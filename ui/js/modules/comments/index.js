'use strict';

import React from 'react';
import AppStore from 'stores/app';
import UserStore from 'stores/user';
import IssuesStore from 'stores/issues';
import apiClient from 'lib/api-client';
import dispatcher from 'lib/dispatcher';
import actions from 'lib/actions';
import bind from 'lodash.bind';
import map from 'lodash.map';

export default React.createClass({
	getInitialState () {
		return {
			active: false,
			comments: [],
			currentComment: '',
			issue: {}
		};
	},

	componentWillMount () {
		this.boundUpdate = bind(this.update, this);
	},

	componentDidMount () {
		AppStore.addChangeListener(this.boundUpdate);
	},

	componentWillUnmount () {
		AppStore.removeChangeListener(this.boundUpdate);
	},

	update () {
		const {commentsList} = AppStore.getComponentState();
		let {comments} = this.state;
		let issue;

		if (commentsList.active)
			issue = IssuesStore.getById(commentsList.issueId);
		else {
			this.setState({active: commentsList.active});
			return;
		}

		const headers = {'Authorization': `token ${UserStore.getToken()}`};

		apiClient
			.get(issue.url + '/comments', {}, headers)
			.then((response) => {
				if (response.error) console.warn(response.error);

				comments = response.body;
				this.setState({
					comments: comments,
					active: commentsList.active,
					issue: issue
				});
			});
	},

	updateCurrentComment (e) {
		e.preventDefault();
		this.setState({currentComment: e.target.value});
	},

	addComment (closeIssue, e) {
		e.preventDefault();

		if (e.keyCode && e.keyCode !== 13) return;

		let {currentComment, issue, comments} = this.state;
		const headers = {'Authorization': `token ${UserStore.getToken()}`};

		if (currentComment.trim() === '') return;

		apiClient
			.post(issue.url + '/comments', {body: currentComment}, {}, headers)
			.then((response) => {
				if (response.error) console.warn(response.error);

				comments.push(response.body);
				this.setState({
					comments: comments,
					currentComment: ''
				});

				if (closeIssue)
					apiClient
						.patch(issue.url, {state: 'closed'}, {}, headers)
						.then((response) => {
							if (response.error) console.warn(response.error);

							this.close();
							IssuesStore.fetch();
						});
			});
	},

	close (e) {
		if (e) e.preventDefault();

		dispatcher.dispatch({
			type: actions.HIDE_ONCOURSE_COMPONENT,
			component: 'commentsList'
		});
	},

	render () {
		const {comments, active, currentComment} = this.state;

		return (active) ? (
			<div className="oncourse-extension-comments-view">
				<span
					onClick={this.close}
					className="oncourse-extension-comments-view-close">

					<i className="oc-icon-close"></i>
				</span>
				{(comments.length) ? (
					<ul>
						{map(comments, (c, i) => {
							return (
								<li key={i}>
									<img src={c.user.avatar_url} />
									<span className="oncourse-extension-comments-view-comment-body">
										{c.body}

										<span className="oncourse-extension-comments-view-comment-author">
											{c.user.login}
										</span>
									</span>
								</li>
							);
						})}
					</ul>
				) : (
					<h2>Get the conversation started!</h2>
				)}
				<div className="oncourse-extension-comments-view-comment">
					<textarea
						value={currentComment}
						onChange={this.updateCurrentComment}>
					</textarea>
					<div className="oncourse-extension-comments-view-actions">
						<button onClick={bind(this.addComment, this, false)}>Comment</button>
						<button onClick={bind(this.addComment, this, true)}>Comment and Close</button>
					</div>
				</div>
			</div>
		) : null;
	}
});
