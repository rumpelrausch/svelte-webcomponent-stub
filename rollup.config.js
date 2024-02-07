import { spawn } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy';
import { packageConf } from './src/lib/buildConfig.js';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: false,
		format: 'iife',
		name: `${packageConf.name.replace(/-/g,'_')}`,
		file: `public/build/${packageConf.name}.js`
	},
	plugins: [
		commonjs(),

		copy({
			targets: [
				{
					src: 'public/picnic.min.css',
					dest: 'public/build'
				}
			]
		}),

		svelte({
			include: "src/components/public/*.svelte",
			emitCss: false,
			compilerOptions: {
				customElement: true,
				// enable run-time checks when not in production
				dev: !production
			}
		}),

		svelte({
			include: "src/components/private/*.svelte",
			emitCss: false,
			compilerOptions: {
				customElement: false,
				// enable run-time checks when not in production
				dev: !production
			}
		}),

		resolve({
			browser: true,
			dedupe: ['svelte'],
			exportConditions: ['svelte']
		}),

		!production && serve(),

		!production && livereload('public'),

		production && terser({
			ecma: 2015,
			safari10: true
		})
	],
	watch: {
		clearScreen: false
	}
};
