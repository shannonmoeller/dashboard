/* jshint node:true */
'use strict';

var fs = require('fs'),
	repos = require('./repos'),
	file = __dirname + '/README.md';

function generate(accounts) {
	var stream;

	// Delete
	fs.unlinkSync(file);

	// Create
	stream = fs.createWriteStream(file);
	stream.write('# dashboard\n');

	// Generate
	accounts.forEach(function (account) {
		var user = account.user;

		// Header
		stream.write('\n' + user + ' | version | downloads | status | coverage | dependencies | devDependencies\n');
		stream.write('---|---|---|---|---|---|---\n');

		// Rows
		account.repos.forEach(function (repo) {
			var name = repo.name,
				npm = repo.npm || name,
				id = user + '/' + name;

			stream.write(
				'[' + name + '](http://github.com/' + id + ') ' +
				'| [![version](http://img.shields.io/npm/v/' + npm + '.svg?style=flat-square)](http://npmjs.org/' + npm + ') ' +
				'| [![downloads](http://img.shields.io/npm/dm/' + npm + '.svg?style=flat-square)](http://npmjs.org/' + npm + ') ' +
				'| [![status](http://img.shields.io/travis/' + id + '.svg?style=flat-square)](https://travis-ci.org/' + id + ')' +
				'| [![coverage](http://img.shields.io/coveralls/' + id + '/master.svg?style=flat-square)](https://coveralls.io/r/' + id + ')' +
				'| [![dependencies](http://david-dm.org/' + id + '.svg?style=flat-square)](http://david-dm.org/' + id + ') ' +
				'| [![devDependencies](http://david-dm.org/' + id + '/dev-status.svg?style=flat-square)](http://david-dm.org/' + id + ')\n'
			);
		});
	});
}

generate(repos);
