import { writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import fetch from 'npm-registry-fetch';

const { pathname } = new URL(import.meta.url);
const filename = join(dirname(pathname), 'index.md');

const packages = await fetch.json('/-/user/shannonmoeller/package');
const packageNames = Object.keys(packages).sort();
let contents = '---\n---\n\n# Shannon Moeller’s Dashboard\n\n';

for (const packageName of packageNames) {
	console.log(packageName);

	const meta = await fetch.json(`/${packageName}`);
	const matches = meta.repository?.url?.match(/github.com\/(.*?)(.git)?$/);
	const [, id] = matches || [];

	contents +=
		`[${packageName}](https://github.com/${id}) | ` +
		`[![version](https://img.shields.io/npm/v/${packageName}.svg?style=flat-square)](https://npmjs.org/package/${packageName}) | ` +
		`[![downloads](https://img.shields.io/npm/dm/${packageName}.svg?style=flat-square)](https://npmjs.org/package/${packageName}) | ` +
		`[![deps](https://img.shields.io/david/${id}.svg?style=flat-square)](https://david-dm.org/${id}) | ` +
		`[![devDeps](https://img.shields.io/david/dev/${id}.svg?style=flat-square)](https://david-dm.org/${id})\n`;
}

await writeFile(filename, contents);
