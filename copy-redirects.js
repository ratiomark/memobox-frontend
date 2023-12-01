/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');

const source = './_redirects';
const destination = './dist/_redirects';

fs.copy(source, destination, function (err) {
	if (err) {
		console.error('An error occurred while copying _redirects file', err);
		return;
	}
	console.log('_redirects file was copied to build folder');
});	