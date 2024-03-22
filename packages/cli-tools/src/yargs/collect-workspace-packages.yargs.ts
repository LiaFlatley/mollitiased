import type { LoggerOption } from '@alexaegis/logging';
import type { CollectWorkspacePackagesOptions } from '@alexaegis/workspace-tools';
import type { Argv } from 'yargs';
import { yargsForCwdOption } from './cwd.yargs.js';
import { yargsForDryOption } from './dry.yargs.js';
import { yargsForForceOption } from './force.yargs.js';

export const yargsForCollectWorkspacePackagesOptions = <T>(
	yargs: Argv<T>
): Argv<T & Omit<CollectWorkspacePackagesOptions, keyof LoggerOption>> => {
	return yargsForDryOption(yargsForForceOption(yargsForCwdOption(yargs)))
		.option('skipWorkspaceRoot', {
			boolean: true,
			default: false,
			description: "Don't distribute to the root of the workspace",
		})
		.option('onlyWorkspaceRoot', {
			boolean: true,
			default: false,
			description:
				'Only distribute to the root of the workspace. (Skip all workspace packages)',
		})
		.option('dependencyCriteria', {
			default: [],
			coerce: (v) => v as string[],
			type: 'array',
			description:
				'Only distribute to workspace packages that have this dependency listed ' +
				'in their package.json file. Empty means no filtering is applied.',
		});
};
