'use strict';

var stream,
    fs = require('fs'),
    file = __dirname + '/README.md',
    accounts = [
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
    ];

// Delete
fs.unlinkSync(file);

// Create
stream = fs.createWriteStream(file);
stream.write('# dashboard\n');

// Generate
accounts.forEach(function (account) {
    var user = account.user;

    stream.write('\n' + user + ' | version | downloads | dependencies | devDependencies\n');
    stream.write('---|---|---|---|---\n');

    account.repos.forEach(function (repo) {
        var name = repo.name,
            npm = repo.npm || name,
            id = user + '/' + name,
            img = id.replace(/-/, '--');

        stream.write(
            '[' + name + '](http://github.com/' + id + ') ' +
            '| ![version](http://img.shields.io/npm/v/' + npm + '.svg?style=flat-square) ' +
            '| ![downloads](http://img.shields.io/npm/dm/' + npm + '.svg?style=flat-square) ' +
            '| ![dependencies](http://david-dm.org/' + img + '.svg?style=flat-square) ' +
            '| ![devDependencies](http://david-dm.org/' + img + '/dev-status.svg?style=flat-square)\n'
        );
    });
});
