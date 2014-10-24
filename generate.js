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

fs.unlinkSync(file);

stream = fs.createWriteStream(file);

stream.write('# dashboard\n');

accounts.forEach(function (account) {
    var user = account.user;

    stream.write('\n' + user + ' | downloads | dependencies | devDependencies\n');
    stream.write('---|---|---|---\n');

    account.repos.forEach(function (repo) {
        var name = repo.name,
            npm = repo.npm || name,
            id = user + '/' + name,
            img = id.replace(/-/, '--'),
            ext = '.svg?style=flat-square';

        stream.write(
            '[' + name + '](http://github.com/' + id + ') ' +
            '| ![downloads](http://img.shields.io/npm/dm/' + npm + ext + ') ' +
            '| ![dependencies](http://img.shields.io/david/' + img + ext + ') ' +
            '| ![devDependencies](http://img.shields.io/david/dev/' + img + ext + ')\n'
        );
    });
});
