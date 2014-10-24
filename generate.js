/* jshint node:true */
'use strict';

var fs = require('fs');

function generate(accounts) {
    var stream,
        file = __dirname + '/README.md';

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

generate([
    {
        user: 'shannonmoeller',
        repos: [
            { name: 'coat' },
            { name: 'connect-spawn' },
            { name: 'copier.js', npm: 'copier' },
            { name: 'doxit' },
            { name: 'func.js', npm: 'func' },
            { name: 'get-context' },
            { name: 'gimmie.js', npm: 'gimmie' },
            { name: 'grunt-force' },
            { name: 'grunt-hbt' },
            { name: 'gulp-hb' },
            { name: 'handlebars-layouts' },
            { name: 'hunk' },
            { name: 'mute' },
            { name: 'nopt-grunt' },
            { name: 'sire' },
            { name: 'workit' }
        ]
    },
    {
        user: 'militiajs',
        repos: [
            { name: 'mdom' },
            { name: 'mjax' },
            { name: 'mmvc' },
            { name: 'mtil' }
        ]
    },
    {
        user: 'togajs',
        repos: [
            { name: 'toga' },
            { name: 'toga-compiler-pulla' },
            { name: 'toga-compiler-pura' },
            { name: 'toga-formatter-markdown' },
            { name: 'toga-parser-js' },
            { name: 'tunic' }
        ]
    }
]);
