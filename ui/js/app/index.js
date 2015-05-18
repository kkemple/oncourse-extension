'use strict';

import React from 'react';
import OnCourse from 'oncourse';
import UserStore from 'stores/user';
import AppStore from 'stores/app';
import IssueStore from 'stores/issues';
import app from 'ampersand-app';
import actions from 'lib/actions';
import dispatcher from 'lib/dispatcher';

app.extend({
	init () {
		chrome.runtime.sendMessage({ type: actions.REQUEST_USER_INFORMATION });

		// get the user information
		this.user = UserStore;

		this.appContainer = document.createElement('div');
		this.appContainer.id = 'oncourse-extension';
		document.body.appendChild(this.appContainer);

		React.render(<OnCourse />, this.appContainer);
	}
});


export default app;
