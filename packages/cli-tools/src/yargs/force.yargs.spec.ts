import { describe, expect, it } from 'vitest';
import yargs from 'yargs';
import { yargsForForceOption } from './force.yargs.js';

describe('yargsForForceOption', () => {
	it('should parse', async () => {
		const force = true;
		const yarguments = yargsForForceOption(yargs(['--force', `${force}`]));
		const args = await yarguments.parseAsync();

		expect(args.force).toEqual(force);
	});
});
