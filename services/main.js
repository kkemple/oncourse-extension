'use strict';

import api from 'superagent';

const clientId = '83728d7dbfd4bfe953b5';
const getAccessTokenUrl = function(code) {
	return 'http://oncourse-extension-gatekeeper.herokuapp.com/authenticate/' + code;
};
const codeRegex = /\?code=(.*)/;

chrome.browserAction.onClicked.addListener((tab) => {

	chrome.tabs.sendMessage(tab.id, { type: 'BROWSER_ACTION' });
});

chrome.runtime.onMessage.addListener((request, sender, callback) => {
	if (!request.type) return;

	switch (request.type) {
		case 'REQUEST_USER_INFORMATION':
			chrome.storage.sync.get('githubApiToken', (response) => {
				callback(response);

				chrome.tabs.sendMessage(sender.tab.id, {
					type: 'USER_INFORMATION_UPDATED',
					data: {
						token: response.githubApiToken
					}
				});
			});
			break;
		case 'START_AUTH_FLOW':
			chrome.identity.launchWebAuthFlow({
				interactive: true,
				url: `https://github.com/login/oauth/authorize?
					client_id=${clientId}&scope=repo`
			}, (responseUrl) => {
				const code = responseUrl.match(codeRegex)[1];

				api.get(getAccessTokenUrl(code))
					.end((err, res) => {
						chrome.storage.sync.set({
							githubApiToken: res.body.token
						}, (response) => {
							chrome.tabs.sendMessage(sender.tab.id, {
								type: 'USER_INFORMATION_UPDATED',
								data: {
									token: res.body.token
								}
							});
						});
					});
			});
			break;
		case 'OPEN_NEW_TAB':
			chrome.tabs.create({url: request.url});
			break;
	}
});
