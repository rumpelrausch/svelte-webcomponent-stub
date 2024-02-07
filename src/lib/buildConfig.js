import { readFileSync, writeFileSync } from "fs";
export const packageConf = JSON.parse(readFileSync('package.json', {encoding: 'utf8'}));

writeFileSync(
	'./src/lib/runTimeConfig.js',
	`
export const packageName = '${packageConf.name}';
	`
);
