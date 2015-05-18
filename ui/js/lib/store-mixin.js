'use strict';

import assign from 'lodash.assign';
import {EventEmitter} from 'events';
import dispatcher from './dispatcher';

export default assign({}, EventEmitter.prototype, {
	emitChange () {
		this.emit(this._changeEvent);

		return this;
	},

	addChangeListener (callback) {
		this.on(this._changeEvent, callback);
		return this;
	},

	removeChangeListener (callback) {
		this.removeListener(this._changeEvent, callback);
		return this;
	}
});
