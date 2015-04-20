/* jshint node:true */
/* global Promise:true */
'use strict';

var Registry = require('npm-registry'),
	npm = new Registry(),
	fs = require('fs'),
	file = __dirname + '/index.md';

function getUserPackages(user) {
	return new Promise(function (resolve, reject) {
		npm.users.list(user, function (err, data) {
			return err ? reject(err) : resolve(data);
		});
	});
}

function getPackageInfo(pkg) {
	return new Promise(function (resolve, reject) {
		npm.packages.get(pkg.name, function (err, data) {
			return err ? reject(err) : resolve(data);
		});
	});
}

function getPackagesInfo(pkgs) {
	return Promise.all(pkgs.map(getPackageInfo));
}

function appendRow(stream, pkg) {
	pkg = pkg.pop();

	var repo = pkg.repository.url.split('/').slice(-2),
		repoUser = repo[0],
		repoName = repo[1],
		npmName = pkg.name,
		id = repo.join('/');

	stream.write(
		'[' + npmName                                                                                          + ' ](https://github.com/'             + id      + ') | ' +
		'[![version  ](https://img.shields.io/npm/v/'              + npmName + '.svg?style=flat-square'        + ')](https://npmjs.org/package/'      + npmName + ') | ' +
		'[![downloads](https://img.shields.io/npm/dm/'             + npmName + '.svg?style=flat-square'        + ')](https://npmjs.org/package/'      + npmName + ') | ' +
		'[![status   ](https://img.shields.io/travis/'             + id      + '.svg?style=flat-square'        + ')](https://travis-ci.org/'          + id      + ') | ' +
		'[![coverage ](https://img.shields.io/coveralls/'          + id      + '/master.svg?style=flat-square' + ')](https://coveralls.io/r/'         + id      + ') | ' +
		'[![climate  ](https://img.shields.io/codeclimate/github/' + id      + '.svg?style=flat-square'        + ')](https://codeclimate.com/github/' + id      + ') | ' +
		'[![deps     ](https://img.shields.io/david/'              + id      + '.svg?style=flat-square'        + ')](https://david-dm.org/'           + id      + ') | ' +
		'[![devDeps  ](https://img.shields.io/david/dev/'          + id      + '.svg?style=flat-square'        + ')](https://david-dm.org/'           + id      + ')\n'
	);
}

function buildTable(pkgs) {
	var stream;

	// Delete
	fs.unlinkSync(file);

	// Create
	stream = fs.createWriteStream(file);
	stream.write('---\n---\n\n# Shannon Moeller’s Dashboard\n\n');

	// Write
	pkgs.forEach(appendRow.bind(null, stream));
}

getUserPackages('shannonmoeller').then(getPackagesInfo).then(buildTable);
