import { describe, expect, it } from 'vitest';
import yargs from 'yargs';
import { yargsForDistributeInWorkspaceOptions } from './distribute-file-in-workspace.function.yargs.js';

describe('yargsForDistributeInWorkspaceOptions', () => {
	it('should be able to extend an existing yargs object', async () => {
		const dependencyCriteria = ['foo', 'bar'];
		const yarguments = yargsForDistributeInWorkspaceOptions(
			yargs(['--dependencyCriteria', ...dependencyCriteria, '--lmao'])
		);
		const args = await yarguments.parseAsync();

		expect(args.dependencyCriteria).toEqual(dependencyCriteria);
	});
});
