import { writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import fetch from 'npm-registry-fetch';

const { pathname } = new URL(import.meta.url);
const filename = join(dirname(pathname), 'index.md');

const packages = await fetch.json('/-/user/shannonmoeller/package');
const packageNames = Object.keys(packages).sort();
let contents = '---\n---\n\n# Shannon Moeller’s Dashboard\n\n';

for (const packageName of packageNames) {
	contents +=
		`[${packageName}](https://npm.im/${packageName}) | ` +
		`[![version](https://img.shields.io/npm/v/${packageName}.svg?style=flat-square)](https://npmjs.org/package/${packageName}) | ` +
		`[![downloads](https://img.shields.io/npm/dm/${packageName}.svg?style=flat-square)](https://npmjs.org/package/${packageName})\n`;
}

await writeFile(filename, contents);
