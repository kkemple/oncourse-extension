'use strict';

import app from './app';
import dispatcher from './lib/dispatcher';
import actions from './lib/actions';

let active = false;

// when user clicks browser action button,
// update display of oncourse blanket div (covers whole screen)
chrome.runtime.onMessage.addListener((message) => {
	switch (message.type) {
		case actions.BROWSER_ACTION:
			active = !active;

			const action = (active) ?
				actions.SHOW_ONCOURSE_COMPONENT :
				actions.HIDE_ONCOURSE_COMPONENT;

			dispatcher.dispatch({
				type: action,
				component: 'controlPanel'
			});
			break;
		case actions.USER_INFORMATION_UPDATED:
			dispatcher.dispatch({
				type: actions.USER_INFORMATION_UPDATED,
				data: message.data
			});
			break;
	}
});

app.init();
