/* jshint node:true */
/* global Promise:true */
'use strict';

var Registry = require('npm-registry'),
	npm = new Registry(),
	fs = require('fs'),
	file = __dirname + '/index.md';

function getUserPackages(name) {
	return new Promise(function (resolve, reject) {
		npm.users.list(name, function (err, modules) {
			if (err) reject(err);
			else resolve(modules);
		});
	});
}

function getPackageInfo(pkg) {
	return new Promise(function (resolve, reject) {
		npm.packages.get(pkg.name, function (err, info) {
			if (err) reject(err);
			else resolve(info);
		});
	});
}

function append(stream, pkg) {
	pkg = pkg.pop();

	var repo = pkg.repository.url.split('/').slice(-2),
		repoUser = repo[0],
		repoName = repo[1],
		npmName = pkg.name,
		id = repo.join('/');

	stream.write(
		'[' + npmName + '](http://github.com/' + id + ') ' +
		'| [![version](http://img.shields.io/npm/v/' + npmName + '.svg?style=flat-square)](http://npmjs.org/' + npmName + ') ' +
		'| [![downloads](http://img.shields.io/npm/dm/' + npmName + '.svg?style=flat-square)](http://npmjs.org/' + npmName + ') ' +
		'| [![status](http://img.shields.io/travis/' + id + '.svg?style=flat-square)](https://travis-ci.org/' + id + ')' +
		'| [![coverage](http://img.shields.io/coveralls/' + id + '/master.svg?style=flat-square)](https://coveralls.io/r/' + id + ')' +
		'| [![dependencies](http://david-dm.org/' + id + '.svg?style=flat-square)](http://david-dm.org/' + id + ') ' +
		'| [![devDependencies](http://david-dm.org/' + id + '/dev-status.svg?style=flat-square)](http://david-dm.org/' + id + ')\n'
	);
}

Promise
	.resolve('shannonmoeller')
	.then(function (name) {
		return getUserPackages(name);
	})
	.then(function (pkgs) {
		return Promise.all(pkgs.map(getPackageInfo));
	})
	.then(function (pkgs) {
		var stream;

		// Delete
		fs.unlinkSync(file);

		// Create
		stream = fs.createWriteStream(file);
		stream.write('---\n---\n\n# dashboard\n\n');

		// Header
		stream.write('repo | version | downloads | status | coverage | dependencies | devDependencies\n');
		stream.write('-----|---------|-----------|--------|----------|--------------|----------------\n');

		// Modules
		return pkgs.map(append.bind(null, stream));
	});
