const Registry = require('npm-registry');
const npm = new Registry({ registry: 'https://registry.npmjs.org' });
const fs = require('fs');

const file = __dirname + '/index.md';

function getUserPackages(user) {
	return new Promise(function(resolve, reject) {
		npm.users.list(user, function(err, data) {
			return err ? reject(err) : resolve(data);
		});
	});
}

function getPackageInfo(pkg) {
	return new Promise(function(resolve, reject) {
		npm.packages.get(pkg.name, function(err, data) {
			return err ? reject(err) : resolve(data);
		});
	});
}

function getPackagesInfo(pkgs) {
	return Promise.all(pkgs.map(getPackageInfo));
}

function appendRow(stream, pkg) {
	pkg = pkg.pop();

	const repo = pkg.repository.url.split('/').slice(-2);
	const repoUser = repo[0];
	const repoName = repo[1];
	const npmName = pkg.name;
	const id = repo.join('/');

	stream.write(
		[
			`[${npmName}](https://github.com/${id})`,
			`[![version](https://img.shields.io/npm/v/${npmName}.svg?style=flat-square)](https://npmjs.org/package/${npmName})`,
			`[![downloads](https://img.shields.io/npm/dm/${npmName}.svg?style=flat-square)](https://npmjs.org/package/${npmName})`,
			`[![status](https://img.shields.io/travis/${id}.svg?style=flat-square)](https://travis-ci.org/${id})`,
			`[![coverage](https://img.shields.io/coveralls/${id}/master.svg?style=flat-square)](https://coveralls.io/r/${id})`,
			`[![climate](https://img.shields.io/codeclimate/github/${id}.svg?style=flat-square)](https://codeclimate.com/github/${id})`,
			`[![deps](https://img.shields.io/david/${id}.svg?style=flat-square)](https://david-dm.org/${id})`,
			`[![devDeps](https://img.shields.io/david/dev/${id}.svg?style=flat-square)](https://david-dm.org/${id})\n`
		].join(' | ')
	);
}

function buildTable(users) {
	let stream;

	// Delete
	fs.unlinkSync(file);

	// Create
	stream = fs.createWriteStream(file);
	stream.write('---\n---\n\n# Shannon Moeller’s Dashboard\n\n');

	// Write
	users.forEach(function(pkgs) {
		pkgs.forEach(appendRow.bind(null, stream));
	});
}

Promise.all([
	getUserPackages('shannonmoeller').then(getPackagesInfo),
	getUserPackages('toga').then(getPackagesInfo),
	getUserPackages('ygor').then(getPackagesInfo)
]).then(buildTable);
